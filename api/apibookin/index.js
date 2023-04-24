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

app.use(cors());
app.use(express.json());

const CONNECTION_URL = process.env.MONGO_URL 
const PORT = process.env.PORT|| 8080;

mongoose.connect(CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true } ,     console.log('the data base is connected'))
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

app.get("/" , (req , res) =>  {
    res.send("APP is running")
} )

app.use("/api/hotels" , hotelRoute)
app.use("/api/users" , usersRoute)
app.use("/api/room" , roomRoute)

