const firebase = require('../settings/db')
const firestore = firebase.firestore()

const memberSignup = async (req, res, next) => {
    try {
        const credential = req.body.content
        // if (credential.picture) {
        //     const name = credential.name
        //     console.log(credential);
        //     const task = storage.child(name).put(credential.picture)
        //     task.then(snapshot => snapshot.ref.getDownloadUrl())
        //         .then(url => {
        //         console.log(url);
        //     })
        // }
        const memberData = await firestore.collection('Members').get()
        let emailExist = false;
        if (memberData.empty) {
            res.status(404).send("No Data Found")
        } 
        else {
                memberData.forEach(doc => {
                    const info = doc.data().profile
                    try {
                        if (info.email === credential.email)
                            emailExist = true;
                    }
                    catch (err) {
                        ;
                    }
                })
        }
        if (!emailExist) {
            await firestore.collection('Members').doc().set({ profile: credential });
            res.send(credential);
        }
        else
            res.send({ "status": "Email ID already exists" })
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    memberSignup
}