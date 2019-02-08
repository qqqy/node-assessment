const express = require('express')
const uCtrl = require('./usersCtrl')
require('dotenv').config()

const app = express()
const { SERVER_PORT } = process.env

app.use(express.json())

// ENDPOINTS AS REQUIRED //
app.get('/api/user/:userId' , uCtrl.oneUser)
app.get('/api/user' , uCtrl.allUsers)
app.get('/api/admin' , uCtrl.allAdmins)
app.get('/api/nonadmin' , uCtrl.allNonAdmins)
app.get('/api/type/:type' , uCtrl.allType)

app.put('/api/user/:userId' , uCtrl.editUser)

app.post('/api/user' , uCtrl.newUser)

app.delete('/api/user/:userId' , uCtrl.removeUser)

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT + " is our port in the storm")
})