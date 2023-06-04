import nodeMailer from 'nodemailer'

export interface FormInterface {
    host: string
    port: string
    username: string
    password: string
    recipients: string
    subject: string
    contents: string
    trackerLink: string
}

const sendEmail = async (emailData: FormInterface) => {
    const data = {
        from: emailData.username,
        to: emailData.recipients.split(" "),
        subject: emailData.subject,
        html: createEmail({contents: emailData.contents, trackerLink: emailData.trackerLink})
    }
    const transporter = nodeMailer.createTransport({
        host: emailData.host,
        port: parseInt(emailData.port),
        secure: false,
        requireTLS: true,
        auth: {
            user: emailData.username,
            pass: emailData.password,
        },
    })
    return transporter.sendMail(data)
}

export default sendEmail

const createEmail = ({contents, trackerLink}: {contents: string, trackerLink:string}) => {return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

  <head></head>

  <body>
    <p>${contents}</p>
    <img src="${trackerLink}">
  </body>

</html>
`
}