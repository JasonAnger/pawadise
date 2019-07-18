const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'Pawadise.vn@gmail.com',
        subject: 'Thanks for joining Pawadise Community!',
        html: `<center><a href="http://pawadise.cf/"><img src="https://marketing-image-production.s3.amazonaws.com/uploads/dbf9fc0cbf0530ebd240735473aef74c54ae02961bf22920326a7b6653ac55188b4a0ac0da06b7561061010213bf7bad8a51bca660641884cc5cc0e7071cff3d.png" alt="" width="360"></a>
        <h1>Hello ${name}. </h1>
        <h3>Welcome to the Pet Community Pawadise, ${name}.</h3>
        <h3>Let me know how you get along with the app.</h3></center>`,
    }
    sgMail.send(msg)
}

const sendResetPasswordCodeEmail = (email, name, code) => {
    const msg = {
        to: email,
        from: 'Pawadise.vn@gmail.com',
        subject: 'Reset Password Code',
        html: `<center><a href="http://pawadise.cf/"><img src="https://marketing-image-production.s3.amazonaws.com/uploads/dbf9fc0cbf0530ebd240735473aef74c54ae02961bf22920326a7b6653ac55188b4a0ac0da06b7561061010213bf7bad8a51bca660641884cc5cc0e7071cff3d.png" alt="" width="360"></a>
        <h1>Hello ${name}. </h1>
        <h3>This is the code to confirm that you want to reset your password.
        Please fill it in the redirect page to reset. </h3>
        <h1>${code}</h1></center>`
    }
    sgMail.send(msg)
}

const sendRequest = (email, name, phone, content, title) => {
    const msg = {
        "to": 'Pawadise.vn@gmail.com',
        "from": 'Pawadise.vn@gmail.com',
        "subject": `${title} - Request from ${name} - Phone: ${phone}`,
        html: `<center><a href="http://pawadise.cf/"><img src="https://marketing-image-production.s3.amazonaws.com/uploads/dbf9fc0cbf0530ebd240735473aef74c54ae02961bf22920326a7b6653ac55188b4a0ac0da06b7561061010213bf7bad8a51bca660641884cc5cc0e7071cff3d.png" alt="" width="360"></a>
        <a><h3>Email: ${email}
        Name: ${name}
        Phone: ${phone}
        </h3></a>
        <h1>${content}</h1></center>`
    }
    return sgMail.send(msg)
}

module.exports = {
    sendWelcomeEmail,
    sendResetPasswordCodeEmail,
    sendRequest
}