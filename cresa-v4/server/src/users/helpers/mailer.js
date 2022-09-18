require('dotenv').config()
const nodemailer = require('nodemailer')

async function sendEmail (email, code, link) {
  try {
    // const smtpEndpoint = 'in-v3.mailjet.com'
    const smtpEndpoint = process.env.MAIL_SMTP
    const port = process.env.MAIL_PORT

    // const senderAddress = '16f9f390a6-a1c09a@inbox.mailtrap.io'
    // const senderAddress = 'muhammadaasimsoomro@gmail.com'

    const senderAddress = process.env.MAIL_USERNAME
    var toAddress = email

    const smtpUsername = process.env.MAIL_USERNAME
    const smtpPassword = process.env.MAIL_PASSWORD

    // const smtpUsername = '2370568497f6117e5df1cdfc64ab8289'

    // const smtpPassword = '30e5f533c72e45b44b11a86897bcbb8d'

    var subject = process.env.MAIL_SUBJECT

    // The body of the email for recipients
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Hello,<br/> Please  ${link} <a href="${link}/reset/${code}">Click Here</a> to Reset Password</b>
      </body>
    </html>`

    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true,
      auth: {
        user: smtpUsername,
        pass: smtpPassword
      }
    })

    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html
    }

    let info = await transporter.sendMail(mailOptions)
    console.log('infooo', info)
    return { error: false }
  } catch (error) {
    console.error('send-email-error', error)
    return {
      error: true,
      message: 'Cannot send email'
    }
  }
}

module.exports = { sendEmail }
