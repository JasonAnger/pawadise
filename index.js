const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pawadise', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//Models
const Post = require('./models/post.model')

//Routers
const usersRouter = require('./routes/users.router')

//Controllers
const loginController = require('./controllers/login.controller')
const registerController = require('./controllers/register.controller')

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

app.get('/news', authLogin, function(req,res){
    var posts = Post.find().catch(error => {
        res.render('error', {
            error: error
        })
    })
    if(!error) res.render('index', {
        posts: posts
    })
})

app.use('/users',authLogin , usersRouter)

// app.get('/stores', storeRouter)
// app.get('/posts', postsRouter)
// app.get('/contact', requestRouter)
// app.get('/contact', requestRouter)

app.get('/login', authLogin, loginController.getLogin)
app.post('/login', authLogin, loginController.postLogin)

app.get('/logout', authLogin, logoutController)

app.get('/register', authLogin, registerController.getRegister)
app.post('/register', authLogin, authRegister , registerController.postRegister)

app.listen(3000, function(){
    console.log('Server listening on port '+port)
})