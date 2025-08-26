// src/controllers/waitlistController.ts
import { Request, Response } from 'express';
import { User, IUser } from '../models/user';
import { emailService } from '../services/emailService';
import { emailValidation } from '../validation/emailValidation';

export class WaitlistController {
  async joinWaitlist(req: Request, res: Response): Promise<void> {
    try {
      // Validate email
      const { error, value } = emailValidation.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          error: 'Please provide a valid email address'
        });
        return;
      }

      const { email } = value;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          success: false,
          error: 'This email is already on our waitlist'
        });
        return;
      }

      // Create new user
      const user = new User({ email });
      await user.save();

      // Send confirmation email
      try {
        await emailService.sendConfirmationEmail(email);
        
        // Update user as confirmed
        user.confirmed = true;
        await user.save();

        res.status(201).json({
          success: true,
          message: 'Successfully joined the waitlist! Check your email for confirmation.'
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // User is still saved even if email fails
        res.status(201).json({
          success: true,
          message: 'Successfully joined the waitlist! (Email confirmation may be delayed)'
        });
      }

    } catch (error) {
      console.error('Waitlist signup error:', error);
      res.status(500).json({
        success: false,
        error: 'Something went wrong. Please try again later.'
      });
    }
  }

  async getWaitlistStats(req: Request, res: Response): Promise<void> {
    try {
    const [totalUsers, confirmedUsers, users] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ confirmed: true }),
      User.find().select('-__v')
    ]);

    res.json({
      success: true,
      stats: {
        total: totalUsers,
        confirmed: confirmedUsers,
        unconfirmed: totalUsers - confirmedUsers,
        users
      }
    });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Unable to fetch stats'
      });
    }
  }
}