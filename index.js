//npm nodemon ou npm nodemon --dev-save
//npm ejs
//npm axios
//npm body-parser

const express = require('express')
require('./config/DbConnect.js')

const routeStudent=require('./routes/RouteStudent.js')
const routeUser=require('./routes/RouteUser.js')

const app = express()
app.use(express.json())

const axios = require('axios')

app.set('view engine','ejs')
// app.use(bodyPaser.urlencoded())
app.use(express.urlencoded());

app.use('/api/v1/students',routeStudent);
app.use('/api/v1/users',routeUser);

// Server :  path
app.get('/',async (req,res)=>{
    const title='connexion'
    const response= await axios.get('http://localhost:5000/api/v1/students')
    const student=response.data
    console.log(student)
      res.render('home',{title,student:student})
})
    



app.listen(5000,()=>console.log('__Server Word__'))