const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//Email
const Email = require('./email/sendEmail')

//Models
const Post = require('./models/post.model')

//Routers
const usersRouter = require('./routes/users.router')
const storesRouter = require('./routes/stores.router')
const postsRouter = require('./routes/posts.router')
const resetPasswordRouter = require('./routes/resetpassword.router')
const adminRouter = require('./routes/admin.router')

//Controllers
const homeController = require('./controllers/home.controller')
const loginController = require('./controllers/login.controller')
const registerController = require('./controllers/register.controller')
const storeController = require('./controllers/store.controller')
const logoutController = require('./controllers/logout.controller')

//Authentication
const authRegister = require('./auth/register.auth')
const authLogin = require('./auth/login.auth')

const app = express()

app.use(cors())

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use('/public', express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', authLogin, homeController.get)
app.get('/home', authLogin, homeController.get)

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
        var posts = await Post.find({ isEvent: true })
        res.status(200).send(posts)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.use('/users', authLogin, usersRouter)

app.get('/shop', authLogin, storeController.getShop)
app.get('/service', authLogin, storeController.getService)
// app.get('/cafe', authLogin, storeController.getCafe)
// app.get('/medical', authLogin, storeController.getMedical)
app.use('/stores', authLogin, storesRouter)


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
        Email.sendRequest(
            req.body.Email,
            req.body.name,
            req.body.phone,
            req.body.content
        )
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/register', authLogin, registerController.getRegister)
app.post('/register', authRegister, registerController.postRegister)

app.get('/login', loginController.getLogin)
app.post('/login', loginController.postLogin)

app.get('/logout', authLogin, logoutController)

app.use('/resetpassword', resetPasswordRouter)

//app.use('/administrator', adminRouter)

app.use('*', async (req, res) => {
    res.status(404).send('404 NOT FOUND!')
})

module.exports = app