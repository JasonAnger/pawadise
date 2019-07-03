const request = require('supertest')
const app = require('../app')
const User = require('../models/user.model')

// beforeEach(async () => {
//     await User.deleteMany()
// })

test('Signup a User', async () => {
    await request(app).post('/register').send({
        name: 'Jay the Administrator',
        username: 'jayan',
        email: 'jayandn1999@gmail.com',
        district: "Hai Chau",
        city: 'Da Nang',
        phoneNumber: '+84965897211',
        password: '7749password'
    }).expect(201)
})

test('Login', async () => {
    await request(app).post('/login').send({
        username: 'jayan',
        password: '7749password'
    }).expect(202)
})



test('Error page', async () => {
    await request(app).get('/uisb').expect(404)
})