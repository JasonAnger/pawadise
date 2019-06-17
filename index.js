const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pawadise', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//Models
const Post = require('./models/post.model')
const Request = require('./models/request.model')

//Routers
const usersRouter = require('./routes/users.router')
const storeRouter = require('./routes/stores.router')
const postsRouter = require('./routes/posts.router')

//Controllers
const loginController = require('./controllers/login.controller')
const registerController = require('./controllers/register.controller')
const storeController = require('./controllers/store.controller')
const logoutController = require('./controllers/logout.controller')

//Authentication
const authRegister = require('./auth/register.auth')
const authLogin = require('./auth/login.auth')

const app = express()

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var port = 3000

// app.get('/', authLogin, homeController.get)
// app.get('/home', authLogin, homeController.get)

app.get('/news', authLogin, async (req, res) => {
    try {
        var posts = await Post.find()
        res.status(200).send(posts)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/events', authLogin, async (req, res) => {
    try {
        var posts = await Post.find({isEvent: true})
        res.status(200).send(posts)
    } catch (e) {      
        res.status(500).send(e)
    }
})

app.use('/users', authLogin, usersRouter)

app.get('/shop', storeController.getShop)
app.get('/cafe', storeController.getCafe)
app.get('/medical', storeController.getMedical)
app.use('/stores', storeRouter)


app.use('/posts', authLogin, postsRouter)

app.get('/contact', async (req, res) => {
    try {
        res.status(200).send('Contact Page.')
    } catch (e) {      
        res.status(500).send(e)
    }
})

app.post('/contact', async (req, res) => {
    try {
        var request = new Request(req.body)
        request.save()
    } catch (e) {      
        res.status(500).send(e)
    }
})

app.get('/login', authLogin, loginController.getLogin)
app.post('/login', authLogin, loginController.postLogin)

app.get('/logout', authLogin, logoutController)

app.get('/register', authLogin, registerController.getRegister)
app.post('/register', authLogin, authRegister, registerController.postRegister)

app.listen(3000, function () {
    console.log('Server listening on port ' + port)
})