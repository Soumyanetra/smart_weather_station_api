const firebase = require('../settings/db')
const firestore = firebase.firestore()
const storage = firebase.storage().ref()

const setProfileImage = async (req, res, next) => {
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
       console.log(credential)
        res.send(credential);
        
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    setProfileImage
}