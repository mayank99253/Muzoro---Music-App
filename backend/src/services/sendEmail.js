import sgMail from '@sendgrid/mail';
import { ENV } from '../lib/env.js';

// SendGrid API Key configure karein
sgMail.setApiKey(ENV.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text, html) => {
    try {
        const msg = {
            to,
            from: ENV.SENDGRID_FROM_EMAIL, // SendGrid par verified email address
            subject,
            text,
            html,
        };
        await sgMail.send(msg);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error("SendGrid Email Error:", error.response?.body || error.message);
        throw error;
    }
};