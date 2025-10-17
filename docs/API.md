# Waitlist API (Frontend Integration Guide)

Minimal documentation focused on what the frontend needs to call and handle.

Base URL: `http://localhost:<PORT>` (example: `http://localhost:8000`)

All responses are JSON.

## Core Endpoints

### 1. Join Waitlist
POST `/api/waitlist`

Request body:
```
{ 
  "email": "user@example.com",
  "role": "developer" // optional
}
```

**Fields:**
- `email` (required): Valid email address
- `role` (optional): User's role/position (e.g., "developer", "designer", "student")

Possible responses:
- 201 (success, email sent)
```
{ "success": true, "message": "Successfully joined the waitlist! Check your email for confirmation." }
```
- 201 (success, email queued/failed silently)
```
{ "success": true, "message": "Successfully joined the waitlist! (Email confirmation may be delayed)" }
```
- 400 (invalid email)
```
{ "success": false, "error": "Please provide a valid email address" }
```
- 409 (already on waitlist)
```
{ "success": false, "error": "This email is already on our waitlist" }
```
- 500 (unexpected server error)
```
{ "success": false, "error": "Something went wrong. Please try again later." }
```

Frontend handling tips:
- Treat both 201 variants as success; show the message verbatim.
- For 400/409 display the `error` field to the user.
- Retry logic should NOT auto-resubmit on 409.

### 2. Waitlist Stats (Optional display / admin UI)
GET `/api/waitlist/stats`

Success 200:
```
{ "success": true, "stats": { "total": 123, "confirmed": 120, "unconfirmed": 3 } }
```
Failure 500:
```
{ "success": false, "error": "Unable to fetch stats" }
```

You can safely poll this (e.g. every 30–60s) if displaying live counters.

### 3. Basic Availability Checks (Optional)
GET `/` → `{"status":"success","message":"Api is live"}`

GET `/health` → includes health metadata (you can ignore extra fields if not needed).

## Error Shapes Summary

You will encounter only two top-level formats in current public endpoints:
```
// Successful operation
{ "success": true, ... }

// Handled failure (validation / duplicate / stats fetch failure / generic join failure)
{ "success": false, "error": "Human readable message" }
```

Other internal error formats (`{ status: "error" | "fail", ... }`) are not expected from the exposed endpoints unless something unexpected bubbles up. If they appear, treat as generic failure.

## Minimal Client Pseudocode

```ts
async function joinWaitlist(email: string, role?: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
      signal: controller.signal,
    });
    let data = {};
    try { data = await res.json(); } catch (_) { /* ignore parse */ }
    if (res.ok && data.success) {
      return { ok: true, message: data.message || 'Successfully joined.' };
    }
    // Handle known error shapes including rate limit
    const msg = data.error || data.message || 'Something went wrong. Please try again later.';
    return { ok: false, status: res.status, message: msg };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { ok: false, status: 0, message: 'Request timed out. Check your connection and try again.' };
    }
    return { ok: false, status: 0, message: 'Network error. Please check connection.' };
  } finally {
    clearTimeout(timeout);
  }
}
```

## Rate Limiting (Heads-Up)

If the user performs excessive requests they may receive:
Status: 429
```
{ "status": "error", "message": "Too many requests, please try again later." }
```
Frontend: show a polite cooldown message; optional: back off for the remainder of the window.

## cURL Examples

```
curl -X POST "http://localhost:3000/api/waitlist" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","role":"developer"}'

curl http://localhost:3000/api/waitlist/stats
```

## Glossary
- confirmed: user successfully saved + confirmation email attempt done (flag true when email send succeeded).
- unconfirmed: user saved but confirmation email not yet (or failed) — still valid.

---
Doc version: 2.0.0 (frontend-focused)
Last updated: 2025-08-26
