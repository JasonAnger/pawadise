const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'Pawadise.vn@gmail.com',
        subject: 'Thanks for joining Pawadise Community!',
        text: `Hello ${name}!
        Welcome to the Pet Community Pawadise, ${name}. 
        Let me know how you get along with the app.`,
        templateId: "d-d992f3cfc3e34bc8a5c1a1655dcb955b"
    }
    sgMail.send(msg)
}

const sendResetPasswordCodeEmail = (email, name, code) => {
    const msg = {
        to: email,
        from: 'Pawadise.vn@gmail.com',
        subject: 'Reset Password Code',
        text: `<p>Hello ${name}. </p>
        This is the code to confirm that you want to reset your password.
        Please fill it in the redirect page to reset.
        ${code}`,
        templateId: "d-d992f3cfc3e34bc8a5c1a1655dcb955b"
    }
    sgMail.send(msg)
}

const sendRequest = (email, name, phone, content, title) => {
    const msg = {
        "to": 'Pawadise.vn@gmail.com',
        "from": 'Pawadise.vn@gmail.com',
        "subject": `${title} - Request from ${name} - Phone: ${phone}`,
        "text": `Email: ${email}
Name: ${name}
Phone: ${phone}
${content}`,
        "templateId": "d-d992f3cfc3e34bc8a5c1a1655dcb955b"
    }
    console.log(msg)
    return sgMail.send(msg)
}

module.exports = {
    sendWelcomeEmail,
    sendResetPasswordCodeEmail,
    sendRequest
}