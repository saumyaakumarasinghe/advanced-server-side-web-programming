const express = require('express')
const session = require('express-session')
const UserService = require('./Services/UserService')
const AttractionsService = require('./Services/AttractionsService')
const APIKey = require('./Services/ApiKeyService')
const apikeyMiddleware = require('./Middleware/APIAuth/APIAuthMiddleWare')
const checkSession = require('./Middleware/SessionAuth/SessionAuth')
const app = express()
app.use(express.json())//Parse any data in body element into Json from req object
app.use(session({
    secret: 'my_secret_',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //https only or http and https
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

const PORT_NUMBER = 5000
app.use('/api', apikeyMiddleware)

app.get('/api/getAllAttractions', async (req, res) => {
    this.attractionsService = new AttractionsService()
    const data = await this.attractionsService.getAll()
    res.json(data)
})

app.post('/newrecord', async (req, res) => {
    this.attractionsService = new AttractionsService()
    const result = await this.attractionsService.create(req)
    res.json(result)
})

app.post('/getapikey', async (req, res) => {
    this.apikeyservice = new APIKey()
    const data = await this.apikeyservice.create(req)
    res.json(data)
})

app.post('/registerUser', async (req, res) => {
    const userService = new UserService()
    const result = await userService.create(req)
    res.json(result)

})

app.post('/login', async (req, res) => {
    const userService = new UserService()
    const result = await userService.authenticate(req)
    res.json(result)
})
/*
app.get('/', async (req, res) =>{
    const userservice = new UserService()
    const data = await userservice.getAll(req)
    res.json(data)
})*/

app.get('/contactus', checkSession, (req, res) => {
    res.send('<h1>Contact us</h1>')
})

app.get('/aboutus', (req, res) => {
    res.sendFile(__dirname + '\\views\\test.html')
})

app.listen(PORT_NUMBER, (err) => {
    if (err) {
        console.log('Port is not available')
    }
    else {
        console.log('Server has started and is Listening on port: ', PORT_NUMBER)
    }
})