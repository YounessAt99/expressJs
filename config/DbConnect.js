const mongooose = require('mongoose')

mongooose.connect("mongodb://127.0.0.1:27017/school")
.then(()=>console.log("db_connected"))
.catch((e)=>console.log(e))