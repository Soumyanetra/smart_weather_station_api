const firebase = require('../settings/db')
// const Weather = require('../models/WeatherInfo')
const firestore = firebase.firestore()

const setWeatherData = async (req, res, next) => {
    /*
        cred:{
            id,
            password,
            social, (T/F)
        }
        data:{
            time:{
                temperature,
                humidty,
                pressure,
                aqi
            }
        }
    */
    
    try {
        const key = req.body.content //POST Data Format: {content: ""}
        const cred = key.cred;
        const data = key.data;
        if (cred.social) {
            await firestore.collection('Members').doc(cred.id).set({ data }, { merge: true })
            res.send("Successful")
        }
        else {
            const weatherData = await firestore.collection('Members').get()
            if (weatherData.empty)
                res.status(404).send("No Data Found")
            else {
                    weatherData.forEach(async doc => {
                        if (cred.id === doc.id && doc.data().profile && cred.password === doc.data().profile.password) {
                            await firestore.collection('Members').doc(cred.id).set({ data }, { merge: true })
                            res.send("Successful")
                            throw 'Break';
                        }
                    })
                
                setInterval(() => {
                        try {
                            res.status(404).send("No such User ID or Password Mismatch")
                        }
                        catch (e) { }
                    }, 5000);
            }
        }
        
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const setCordinate = async (req, res, next) => {
}
module.exports = {
    setWeatherData,
    setCordinate
}