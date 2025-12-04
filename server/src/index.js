require("dotenv").config();
const express = require("express");
const app=express();
const authRoute=require("./routes/authRoute");
const taskRoute=require("./routes/taskRoute");
const connectDB = require("./config/db");
const cors = require("cors");


app.use(express.json());
app.use(cors());
connectDB();


app.use('/auth', authRoute);
app.use('/tasks', taskRoute);

const PORT = process.env.PORT || 5000;


app.listen(PORT ,()=>{
        console.log("server running");
        
});
