const {sendMail} = require('../utility/mailSender')
const {contactUsOptions} = require('../utility/mailOptions')
const contactUS = async (req, res, next) => {
    try {
        const content = req.body.content;
        const options = contactUsOptions(content)
        const response = await sendMail(options);
        res.send(response)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    contactUS
}