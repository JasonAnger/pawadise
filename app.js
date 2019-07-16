const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.disconnect()
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
const galleryRouter = require('./routes/gallery.router')
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

app.use('/public', express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', homeController.get)
app.get('/home', homeController.get)

app.get('/news', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        const perPage = 20
        let posts = await Post.find().sort({'timestamp': -1}).skip((page - 1) * perPage).limit(perPage)
        res.status(200).send(posts)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.use('/users', authLogin, usersRouter)

app.get('/shop', storeController.getShop)
app.get('/service', storeController.getService)
app.use('/stores', storesRouter)

app.use('/posts', authLogin, postsRouter)

app.get('/contact', async (req, res) => {
    res.status(200).send('Contact Page')
})

app.post('/contact', async (req, res) => {
    try {
        Email.sendRequest(
            req.body.email,
            req.body.name,
            req.body.phone,
            req.body.content,
            req.body.title
        )
    } catch (e) {
        res.status(500).send(e)
    }
})

app.use('/gallery', galleryRouter)

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