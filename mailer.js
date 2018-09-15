// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(text) {
    const templateData = {
        to: 'laforetmoreno@gmail.com',
        from: 'laforetmoreno@gmail.com',
        subject: 'Opa, preços bons a vista!',
        text: text,
    };

    sgMail.send(templateData);
}

module.exports = {
    sendMail
}