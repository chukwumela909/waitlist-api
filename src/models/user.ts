import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  role?: string;
  joinedAt: Date;
  confirmed: boolean;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    required: false,
    trim: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

export const User = mongoose.model<IUser>('User', userSchema);