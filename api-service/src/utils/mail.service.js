const nodemailer = require("nodemailer");

const sendEmail = async (emailAddress, subject, emailContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: emailAddress,
            subject: subject,
            text: emailContent,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = { sendEmail };