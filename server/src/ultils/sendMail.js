import nodemailer from "nodemailer";

export const sendMail = ({ email, html, subject }) =>
  new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: '"TIKI 👻" <no-relply@tiki.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
      });
      resolve(info);
    } catch (error) {
      reject(error);
    }
  });
