// src/validations/userValidation.ts
import Joi from 'joi';
import { NIGERIA_STATES } from '../utils/nigeriaLocations';

const PRIMARY_SKILLS = [
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
];

const YEARS_OF_EXPERIENCE = [
  'Less than 1 year',
  '1–3 years',
  '4–7 years',
  '8+ years'
];

export const waitlistValidation = Joi.object({
  // Contact Information
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Full name is required',
      'string.min': 'Full name must be at least 2 characters',
      'any.required': 'Full name is required'
    }),
  
  email: Joi.string()
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
  
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^(\+?234|0)[789]\d{9}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please provide a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)',
      'any.required': 'Phone number is required'
    }),
  
  // Service Information
  primarySkill: Joi.string()
    .valid(...PRIMARY_SKILLS)
    .required()
    .messages({
      'any.only': 'Please select a valid primary skill',
      'any.required': 'Primary skill is required'
    }),
  
  otherService: Joi.string()
    .trim()
    .max(200)
    .when('primarySkill', {
      is: 'Other',
      then: Joi.required().messages({
        'string.empty': 'Please specify your service when selecting "Other"',
        'any.required': 'Please specify your service when selecting "Other"'
      }),
      otherwise: Joi.optional()
    }),
  
  // Location
  city: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'City is required',
      'string.min': 'City name must be at least 2 characters',
      'any.required': 'City is required'
    }),
  
  state: Joi.string()
    .valid(...NIGERIA_STATES)
    .required()
    .messages({
      'any.only': 'Please select a valid Nigerian state',
      'any.required': 'State is required'
    }),
  
  // Experience & Portfolio
  yearsOfExperience: Joi.string()
    .valid(...YEARS_OF_EXPERIENCE)
    .required()
    .messages({
      'any.only': 'Please select a valid experience range',
      'any.required': 'Years of experience is required'
    }),
  
  portfolioLink: Joi.string()
    .uri()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.uri': 'Please provide a valid URL for your portfolio'
    }),
  
  // Preferences
  notifyEarlyAccess: Joi.boolean()
    .optional()
    .default(true),
  
  agreedToTerms: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      'any.only': 'You must agree to the terms and privacy policy',
      'any.required': 'You must agree to the terms and privacy policy'
    })
});

// Legacy validation for simple email-only (if needed for backward compatibility)
export const emailValidation = Joi.object({
  email: Joi.string().email().required()
});