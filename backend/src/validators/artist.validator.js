import { body } from 'express-validator';

export const registerArtistValidator = [
    body('stageName')
        .trim()
        .notEmpty().withMessage('Stage name or Artist name is required')
        .isLength({ min: 2, max: 24 }).withMessage('Stage name must be at least 2 characters long'),

    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),

    body('socialLinks')
        .trim()
        .notEmpty().withMessage('Social Links is required')
];