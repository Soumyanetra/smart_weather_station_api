const {sendMail} = require('../utility/mailSender')
const {forgetPasswordOptions} = require('../utility/mailOptions')
const forgetPassword = async (req, res, next) => {
    try {
        const content = req.body.content;
        let options;
        options = forgetPasswordOptions(content)
        let response = await sendMail(options);
        response = {...response, otp:options.otp}
        res.send(response)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    forgetPassword
}