import { body, validationResult } from 'express-validator';
import { TRIP_TYPES } from '../models/Enquiry.js';

// Indian mobile numbers, with optional +91 / 0 prefix and spaces or dashes.
const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

export const enquiryRules = [
  body('name').isString().trim().isLength({ min: 2, max: 80 }).withMessage('Enter your full name.').escape(),
  body('phone').isString().trim().matches(PHONE_RE).withMessage('Enter a valid 10-digit phone number.'),
  body('pickup').isString().trim().isLength({ min: 2, max: 120 }).withMessage('Enter a pickup location.').escape(),
  body('destination').isString().trim().isLength({ min: 2, max: 120 }).withMessage('Enter a destination.').escape(),
  body('travelDate')
    .isISO8601().withMessage('Choose a valid travel date.')
    .custom((v) => {
      const d = new Date(v);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (d < today) throw new Error('Travel date cannot be in the past.');
      return true;
    }),
  body('passengers').isInt({ min: 1, max: 60 }).withMessage('Passengers must be between 1 and 60.').toInt(),
  body('vehicle').optional({ values: 'falsy' }).isString().trim().isLength({ max: 60 }).escape(),
  body('tripType').isIn(TRIP_TYPES).withMessage('Choose a trip type.'),
  body('message').optional({ values: 'falsy' }).isString().trim().isLength({ max: 1000 }).withMessage('Message is too long.').escape()
];

export function handleValidation(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = {};
  result.array().forEach((e) => { if (!errors[e.path]) errors[e.path] = e.msg; });
  return res.status(422).json({ success: false, message: 'Please correct the highlighted fields.', errors });
}
