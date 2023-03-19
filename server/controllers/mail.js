import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'


let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'juliana.schultz73@ethereal.email',
        pass: '9wDUVagGbzK3B2jsb9'
    }
}

let transporter = nodemailer.createTransport(nodeConfig)

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body

    // body of the email
    var email = {
        body: {
            name: username,
            intro: text || 'Hey there, way to Better-Login.',
            outro: "Don't hesitate to ask, we'd love to help."
        }
    }

    var emailBody = MailGenerator.generate(email)

    let message = {
        from: 'juliana.schultz73@ethereal.email',
        to: userEmail,
        subject: subject || 'Signup Successful',
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).json({ msg: 'You should receive an email' })
        })
        .catch((error) => {
            return res.status(500).json(error)
        })
}