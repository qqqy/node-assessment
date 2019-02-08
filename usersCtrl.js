let userData = require('./userData.json')
let idMaker = 100

module.exports = {
  allUsers(req , res){
      console.log(req.query)
      let {age , email , favorites} = req.query
      if(age){
        console.log("by age")
        return res.status(200).send(userData.filter(user => +user.age < +age))}
      if(email){
        console.log("By Email")
        return res.status(200).send(userData.filter(user => user.email === email))}
        if(favorites){
          console.log("By Favorites")
          return res.status(200).send(userData.filter(user => user.favorites.includes(favorites)))}
    else {return res.status(200).send(userData)}
  } ,
  oneUser(req, res){
    let { userId } = req.params
    let userIndex = userData.findIndex((user) => user.id === +userId)
    if(userIndex === -1){return res.sendStatus(404)}
    res.status(200).send(userData[userIndex])
  } ,
  allAdmins(req, res){
    let admins = userData.filter(user => user.type === "admin")
    res.status(200).send(admins)
  } ,
  allNonAdmins(req, res){
    let nonAdmins = userData.filter(user => user.type !== "admin")
    res.status(200).send(nonAdmins)
  } ,
  allType(req, res){
    let { type } = req.params
    let allOfType = userData.filter((user) => user.type === type)
    res.status(200).send(allOfType)
  } , 
  editUser(req, res){
    let newInfo = req.body
    let { userId } = req.params
    let userIndex = userData.findIndex(user => user.id === +userId)
    if(userIndex === -1){
      // console.log("UserIndex:" , userIndex , req.params , req.body)
      return res.sendStatus(404)
    }
    else {
      userData.splice(userIndex , 1 , {...userData[userIndex] , ...newInfo})
      res.status(200).send(userData)
    }
  } ,
  newUser(req , res){
    let newUserObj = req.body
    idMaker++
    // console.log(`IDMaker is now ${idMaker}`)
    newUserObj.id = idMaker
    userData.push(newUserObj)
    res.status(200).send(userData)
  } ,
  removeUser(req,res){
    let { userId } = req.params
    let index = userData.findIndex(user => user.id === +userId)
    if(index === -1){return res.sendStatus(404)}
    userData.splice(index , 1)
    res.status(200).send(userData)
    // NOTE: I'm fully aware that the status should be 201, but I must abide by the test. Woe is me. //
  }
}