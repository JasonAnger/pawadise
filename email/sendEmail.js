const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Pawadise.vn@gmail.com',
        subject: 'Thanks for joining Pawadise Community!',
        text: `Welcome to the Pet Community Pawadise, ${name}. Let me know how you get along with the app.`
    })
}

const sendResetPasswordCodeEmail = (email, name, code) => {
    sgMail.send({
        to: email,
        from: 'Pawadise.vn@gmail.com',
        subject: 'Reset Password Code',
        text: `Hello, ${name}. This is the code to confirm that you want to reset your password.
        Please fill it in the redirect page to reset.
        ${code}`
    })    
}

const sendRequest = (email, name, phone, content) => {
    sgMail.send({
        to: 'Pawadise.vn@gmail.com',
        from: 'Pawadise.vn@gmail.com',
        subject: `Request from ${name} - Phone: ${phone}`,
        text: 
        `Email: ${email}
        Name: ${name}
        Phone: ${phone}
        ${content}`
    })    
}

module.exports = {
    sendWelcomeEmail,
    sendResetPasswordCodeEmail,
    sendRequest
}