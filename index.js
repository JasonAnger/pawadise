var app = require('./app')

var port = process.env.PORT


app.listen(port, function () {
    console.log('Server listening on port ' + port)
})