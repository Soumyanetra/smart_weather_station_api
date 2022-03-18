const express = require('express');
const config = require('./settings/config');
const weatherRouter = require('./routers/WeatherInfo__router__')
const memberRouter = require('./routers/Members__router__')
const contactRouter = require('./routers/Contact__router__')

const app = express();


var allowCrossDomain = (req, res, next)=> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Security-Policy-Report-Only', 'default-src https');
    next();
}
app.use(allowCrossDomain);
app.use(express.json());

app.use('/api', weatherRouter.routes)

app.use('/member', memberRouter.routes)

app.use('/suggessions', contactRouter.routes)

// app.get('/echo', (req, res) => {
//     res.send(req.body)
// })

app.get("/", (req, res) => {
    res.send("API is Live!");
});

app.listen(config.PORT,() => {console.log("listening on port "+config.PORT)})