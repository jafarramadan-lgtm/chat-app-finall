const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "00fa0e1c792a00",
    pass: "e72ac6aadab258",
  },
});
const sendEmail = async (to, code) => {
  try {
    const info = await transporter.sendMail({
      from: '"Chat Appp" ramadangafer5@gmail.com', // sender address
      to: to, // list of recipients
      subject: "رمز التحقق الخاص بك  :", // subject line
      text: `مرحبا ,كود التحقق الخاص بك هو ${code}`, // plain text body
      html: `<b>  مرحبا ,كود التحقق الخاص بك هو ${code}</b>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
module.exports = sendEmail;
