const express = require("express");

// create instance 
const app = express();

// require dotenv nd config
require("dotenv").config() ;

// middleware bodyparser
app.use(express.json())


// connnect our DB
const connectDB = require("./config/connectDB")
connectDB();


app.use('/api/contact' , require('./routes/contact') )

app.use('/api/user' , require('./routes/user') )

const PORT = process.env.PORT

app.listen(PORT , error => {
    error ? console.error(` Fail to connect ,${error}` ) :
    console.log(`server is running on port ${PORT}`)
})
