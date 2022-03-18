const firebase = require('../settings/db')
// const Weather = require('../models/WeatherInfo')
const firestore = firebase.firestore()


const getWeatherData = async (req, res, next) => {
    try {
        const key = req.body.content //POST Data Format: {content: ""}
        const weatherData = await firestore.collection('Members').get()
        let weatherInfo;
        if (weatherData.empty)
            res.status(404).send("No Data Found")
        else {
            weatherData.forEach(doc => {
                if (key === doc.id) {
                    weatherInfo =doc.data().data// new Weather()
                }
            })
            if (weatherInfo.length == 0)
                res.status(404).send("No such User ID")
            else
                res.send(weatherInfo)
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
}



module.exports = {
    getWeatherData
}