const firebase = require('../settings/db')
const firestore = firebase.firestore()

const resetPassword = async (req, res, next) => {
    try {
        let resolveProm,rejectProm;
        let emailExist = new Promise((resolve, reject) => {
            resolveProm = resolve
            rejectProm = reject
        });
        
        const credential = req.body.content
        const memberData = await firestore.collection('Members').get()
        
        if (memberData.empty)
            res.status(404).send("No Data Found")
        else {
            memberData.forEach(async doc => {
                const info = doc.data().profile
                try{
                    if (info.email === credential.email)
                    {
                        info.password = credential.password
                        await firestore.collection('Members').doc(doc.id).set({ profile: info }, { merge: true });
                        resolveProm()
                    }
                }
                catch (err) { ;}
            })
        }
        setTimeout(() => rejectProm(), 5000)
        emailExist.then(() => res.send({ "status": "success" }))
                  .catch(err => res.send({"status": "unsuccess"}));
        
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    resetPassword
}