// src/controllers/waitlistController.ts
import { Request, Response } from 'express';
import { User, IUser } from '../models/user';
import { emailService } from '../services/emailService';

export class WaitlistController {
  async joinWaitlist(req: Request, res: Response): Promise<void> {
    try {
      // Log incoming request for debugging
      console.log('📥 Received request body:', JSON.stringify(req.body, null, 2));
      
      const { email, fullName, phoneNumber, primarySkill, otherService, city, state, 
              yearsOfExperience, portfolioLink, notifyEarlyAccess, agreedToTerms } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          success: false,
          error: 'This email is already on our waitlist'
        });
        return;
      }

      // Create new user with all fields
      const user = new User({ 
        fullName,
        email,
        phoneNumber,
        primarySkill,
        otherService,
        city,
        state,
        yearsOfExperience,
        portfolioLink,
        notifyEarlyAccess,
        agreedToTerms
      });
      
      await user.save();

      // Send personalized confirmation email asynchronously (non-blocking)
      // Don't wait for email to send before responding
      emailService.sendConfirmationEmail(email, fullName, primarySkill)
        .then(async () => {
          // Update user as confirmed after email is sent
          user.confirmed = true;
          await user.save();
          console.log(`✅ Confirmation email sent to ${email}`);
        })
        .catch((emailError) => {
          console.error('❌ Email sending failed:', emailError);
          // User is still saved even if email fails
        });

      // Respond immediately without waiting for email
      res.status(201).json({
        success: true,
        message: 'Successfully joined the waitlist! Check your email for confirmation.'
      });

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
      const [
        totalUsers, 
        confirmedUsers,
        bySkill,
        byState,
        byExperience
      ] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ confirmed: true }),
        
        // Group by primary skill
        User.aggregate([
          {
            $group: {
              _id: '$primarySkill',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ]),
        
        // Group by state
        User.aggregate([
          {
            $group: {
              _id: '$state',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ]),
        
        // Group by years of experience
        User.aggregate([
          {
            $group: {
              _id: '$yearsOfExperience',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ])
      ]);

      // Format the aggregated data
      const skillBreakdown = bySkill.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>);

      const stateBreakdown = byState.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>);

      const experienceBreakdown = byExperience.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>);

      res.json({
        success: true,
        stats: {
          total: totalUsers,
          confirmed: confirmedUsers,
          unconfirmed: totalUsers - confirmedUsers,
          bySkill: skillBreakdown,
          byState: stateBreakdown,
          byExperience: experienceBreakdown
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
