const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB)

const app = express()


var port = 3000

app.get('/', function(req,res){
    res.render('index', {
        users: db.get('users').value()
    })
})

app.use('/users', usersRouter)
app.use('/stores', storesRouter)
app.use('/posts', postsRouter)
app.use('/cafes', cafesRouter)

app.listen(3000, function(){
    console.log('Server listening on port '+port)
})