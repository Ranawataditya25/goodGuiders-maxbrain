// import nodemailer from 'nodemailer';

// // For Gmail, you need to use an "App Password" not your regular password
// // See: https://support.google.com/accounts/answer/185833
// // You'll need to enable 2-step verification first, then generate an app password

// interface EmailOptions {
//   to: string;
//   subject: string;
//   text: string;
//   html?: string;
// }

// // Optional: for creating a test account (e.g. with Ethereal)
// async function createTestAccount() {
//   const testAccount = await nodemailer.createTestAccount();
//   return {
//     user: testAccount.user,
//     pass: testAccount.pass,
//     service: 'ethereal',
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//   };
// }

// export async function sendEmail(options: EmailOptions): Promise<boolean> {
//   try {
//     const isConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

//     const config = isConfigured
//       ? {
//           service: 'gmail',
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASSWORD,
//           },
//         }
//       : {
//           host: 'smtp.gmail.com',
//           port: 587,
//           secure: false,
//           auth: {
//             user: 'ashishpancholi1990@gmail.com',
//             pass: 'mcau knqc evob kqxh', // App password
//           },
//         };

//     const transporter = nodemailer.createTransport(config);

//     const from = isConfigured
//       ? process.env.EMAIL_USER
//       : 'ashishpancholi1990@gmail.com';

//     const info = await transporter.sendMail({
//       from,
//       to: options.to,
//       subject: options.subject,
//       text: options.text,
//       html: options.html,
//     });

//     console.log('Email sent successfully:', info.messageId);
//     return true;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return false;
//   }
// }
