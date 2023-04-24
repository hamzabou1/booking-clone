const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const hotelRoute = require("./routes/hotels");
const usersRoute = require("./routes/users");
const roomRoute = require('./routes/room')
const cookie = require("cookie-parser");
const cors = require('cors');
/// pour l'utilisation du document env pour cacher les données
app.use(cors());
app.use(cookie());

dotenv.config( { path : '.env'} )

app.use(express.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() =>  console.log("DB Connection Successfull")).catch((err) => console.log(err))

app.listen(process.env.PORT || 8080 , () =>  {
    console.log("the back end is running")
})
app.get("/" , (req , res) =>  {
    res.send("APP is running")
} )

app.use("/api/hotels" , hotelRoute)
app.use("/api/users" , usersRoute)
app.use("/api/room" , roomRoute)

