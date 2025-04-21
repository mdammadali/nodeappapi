import nodemailer from 'nodemailer';

// Create a transport using Gmail SMTP (for development, use a secure environment variable)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',   // Your Gmail address
        pass: 'your-email-password',     // Your Gmail password or app-specific password
    },
});

// Example function to send a verification email
const sendVerificationEmail = (toEmail, token) => {
    console.log(toEmail, token);

    //   const verificationUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
//       const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${plainVerificationToken}`;
// console.log(verificationUrl);

    //   const mailOptions = {
    //     from: 'your-email@gmail.com',
    //     to: toEmail,
    //     subject: 'Email Verification',
    //     text: `Please click the following link to verify your email: ${verificationUrl}`,
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.log('Error sending email:', error);
    //     } else {
    //       console.log('Verification email sent:', info.response);
    //     }
    //   });
};

export default sendVerificationEmail;
