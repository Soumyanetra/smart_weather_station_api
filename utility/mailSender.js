const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const config = require('../settings/config')


const sendMail = async (options)=> {
    const auth = config.gmailCredential;
    const OAuth2Client = new google.auth.OAuth2(auth.clientId, auth.clientSecret, auth.redirectUri)
    OAuth2Client.setCredentials({ refresh_token: auth.refreshToken })
    try {
        const accessToken = await OAuth2Client.getAccessToken()
       
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'smartweatherstation2021@gmail.com',
                clientId: auth.clientId,
                clientSecret: auth.clientSecret,
                refreshToken: auth.refreshToken,
                accessToken: accessToken
            }
        })
        const mailOptions = {
            from: 'SMART WEATHER SATION <smartweatherstation2021@gmail.com>',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        }
        const result = await transport.sendMail(mailOptions)
        
        return result;
    } catch (err) {
        return(err.message)
    }
}

module.exports = {
    sendMail
}