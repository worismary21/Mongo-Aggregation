"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtml = exports.sendmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: "abn4reel@gmail.com",
        pass: "frqeiibcizvleyje"
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendmail = async (from, to, subject, html) => {
    try {
        const reponse = await exports.transporter.sendMail({
            from: "abn4reel@gmail.com",
            to,
            subject: "Welcome",
            html
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendmail = sendmail;
const emailHtml = (email, password) => {
    const mail = `<h1>Welcome<h1>
                    <p>You username: ${email}</p><br>
                    <p>Your Password: ${password}</p><br>
                    <p>Thank You</p>`;
    return mail;
};
exports.emailHtml = emailHtml;
