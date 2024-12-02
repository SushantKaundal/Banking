const express = require("express");
const app = express();
const mongoose = require("mongoose")
const apiRoutes = require('./router')
const cors = require("cors")

const banking = require('./models/banking')

require("dotenv").config();


app.use(cors());
app.use(express.json())


const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI


// CONNECTION TO THE DATABASE
mongoose.connect(MONGO_URI).then(() => {
    console.log("CONNECTED TO THE DATABASE");
}).catch((err) => {
    console.log("ERR GETTING CONNECTED TO THE DATABASE", err);
})


//API IMPLEMENTATION
app.use('/api', apiRoutes)





// APP LISTEN 
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})




