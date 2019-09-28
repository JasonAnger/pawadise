const request = require('supertest')
const app = require('../app')
const User = require('../models/user.model')

//  beforeEach(async () => {
//      await User.deleteMany()
//  })

test('Signup already exist User', async () => {
    await request(app).post('/register').send({
        name: 'Jay the Administrator',
        username: 'jayan',
        email: 'jayandn1999@gmail.com',
        district: "Hai Chau",
        city: 'Da Nang',
        phoneNumber: '+84965897211',
        password: '7749password'
    }).expect(400)
})

test('Login', async () => {
    await request(app).post('/login').send({
        username: 'jayan',
        password: '7749password'
    }).expect(202)
})



test('News page', async () => {
    await request(app).get('/news').expect(200)
})

test('Gallery page', async () => {
    await request(app).get('/gallery/pet').expect(200)
})

test('Error page', async () => {
    await request(app).get('/uisb').expect(404)
})