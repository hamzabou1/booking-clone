const mongoose = require('mongoose');


const RoomSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
      },
      photos: {
        type: [ String],
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      maxPeople: {
        type: Number,
        required: true,
      },
      Size: {
        type: Number ,
        required : true
      },
      View : {
        type: String, 
        required : true
      },
      airClim : {
        type: Boolean,
        required: true ,
        default: false
      },
      privatBath : {
        type: Boolean,
        required: true ,
        default: false
      },
      CollectiveBath : {
        type: Boolean,
        required: true ,
        default: true
      },
      TV : {
        type: Boolean,
        required: true ,
        default: true
      },
      Bar : {
        type: Boolean,
        required: true ,
        default: true
      },
      Wifi : {
        type: Boolean,
        required: true ,
        default: true
      },

      desc: {
        type: String,
        required: true,
      },
      roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
    },
    { timestamps: true }


)
module.exports = mongoose.model("Room", RoomSchema)
