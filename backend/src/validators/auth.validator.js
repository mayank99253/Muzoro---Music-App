import { body} from 'express-validator';

export const signupValidator = [
    // 1. Username Validation
    body('userName')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

    // 2. Email Validation
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(), // Converts to lowercase, removes dots in gmail, etc.

    // 3. Password Validation
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidator = [
    // 1. Email Validation
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    // 2. Password Validation
    body('password')
        .notEmpty().withMessage('Password is required')
];
