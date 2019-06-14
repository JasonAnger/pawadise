const express = require('express')
const mongoose = require('mongoose')

//Models
const Post = require('./models/post.model')

//Routers
const usersRouter = require('./router/users.router')

//Controllers
const loginController = require('./controllers/login.controller')

mongoose.connect(process.env.MONGO_DB)

const app = express()

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



var port = 3000

app.get('/', function(req,res){
    var posts = Post.find().catch(error => {
        res.render('error', {
            error: error
        })
    })
    if(!error) res.render('index', {
        posts: posts
    })
})
app.get('/home', homeController.get)
app.get('/users', usersRouter)
app.get('/stores', storesRouter)
app.get('/posts', postsRouter)
app.get('/contact', requestRouter)
app.get('/login', loginController.getLogin)
app.post('/login', loginController.postLogin)
app.get('/register', registerController.getRegister)
app.post('/register', registerController.postRegister)

app.listen(3000, function(){
    console.log('Server listening on port '+port)
})