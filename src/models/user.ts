import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  // Contact Information
  fullName: string;
  email: string;
  phoneNumber: string;
  
  // Service Information
  primarySkill: string;
  otherService?: string;
  
  // Location
  city: string;
  state: string;
  
  // Experience & Portfolio
  yearsOfExperience: string;
  portfolioLink?: string;
  
  // Preferences
  notifyEarlyAccess: boolean;
  agreedToTerms: boolean;
  
  // System Fields
  joinedAt: Date;
  confirmed: boolean;
}

const userSchema = new Schema<IUser>({
  // Contact Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  
  // Service Information
  primarySkill: {
    type: String,
    required: [true, 'Primary skill is required'],
    enum: [
      'Carpentry / Joinery',
      'Plumbing',
      'Electrical',
      'Painting & Decorating',
      'Cleaning / Housekeeping',
      'Graphic Design',
      'Web Development',
      'Digital Marketing',
      'Content Writing / Copywriting',
      'Virtual Assistant',
      'Other'
    ]
  },
  otherService: {
    type: String,
    trim: true,
    required: function(this: IUser) {
      return this.primarySkill === 'Other';
    }
  },
  
  // Location
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  
  // Experience & Portfolio
  yearsOfExperience: {
    type: String,
    required: [true, 'Years of experience is required'],
    enum: [
      'Less than 1 year',
      '1–3 years',
      '4–7 years',
      '8+ years'
    ]
  },
  portfolioLink: {
    type: String,
    trim: true
  },
  
  // Preferences
  notifyEarlyAccess: {
    type: Boolean,
    default: true
  },
  agreedToTerms: {
    type: Boolean,
    required: [true, 'You must agree to terms and privacy policy'],
    validate: {
      validator: function(v: boolean) {
        return v === true;
      },
      message: 'You must agree to terms and privacy policy'
    }
  },
  
  // System Fields
  joinedAt: {
    type: Date,
    default: Date.now
  },
  confirmed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ state: 1, city: 1 });
userSchema.index({ primarySkill: 1 });
userSchema.index({ yearsOfExperience: 1 });

export const User = mongoose.model<IUser>('User', userSchema);