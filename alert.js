import nodemailer from 'nodemailer';
import config from './config.js';

export async function sendAlert(instanceId, status) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  const mailOptions = {
    from: '"AWS SLA Monitor" <your_email@gmail.com>',
    to: config.alertEmail,
    subject: `🚨 EC2 Instance ${instanceId} Alert`,
    text: `Instance ${instanceId} reported ${status} state. Immediate attention may be required.`,
  };

  await transporter.sendMail(mailOptions);
}
