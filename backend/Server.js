   
 require('dotenv').config();// needed at the top
   
   const express = require("express");
   const App = express();

const cors = require('cors');

const connectDB =require("./src/config/db.js");
const StudentRoutes = require("./src/routes/StudentRoutes.js");






App.use(cors());
App.use(express.json());
 

// connect to db
connectDB();


// mount routes

App.use('/api/student',StudentRoutes);  



App.listen(process.env.PORT ||5000,()=>{
console.log("server is running");
})