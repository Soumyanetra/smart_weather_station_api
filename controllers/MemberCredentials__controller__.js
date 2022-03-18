const firebase = require('../settings/db')
const firestore = firebase.firestore()

const checkMemberCredentials = async (req, res, next) => {
    try {
        const credential = req.body.content
        
        const memberData = await firestore.collection('Members').get()
        let memberInfo={};
        if (memberData.empty)
            res.status(404).send("No Data Found")
        else {
            memberData.forEach(doc => {
                const info = doc.data().profile
                if (info && info.email === credential.email && info.password === credential.password)
                    memberInfo= {...info, userId: doc.id}
            })
            res.send(memberInfo)
        }
        
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    checkMemberCredentials
}