const firebase = require('../settings/db')
const firestore = firebase.firestore()

const socialLogin = async (req, res, next) => {
    try {
        const credential = req.body.content.id
        await firestore.collection('Members').doc(credential).set({}, { merge: true })
        res.send("Successful")
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    socialLogin
}