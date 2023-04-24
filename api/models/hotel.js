const mongoose = require('mongoose');


const HotelSchema = new mongoose.Schema({

    name:{type:String , required:true},
    type: {
    type: String,
    required: true,
  },
    city:{type:String , required:true},
    country:{type:String , required:true},
    adress:{type:String , required:true},
    distance:{type:Number , required:true},
    photos:[
        {type:String}
    ],
    rooms: {
      type: [String],
      },
    raiting:{type:Number , required:true , min:0 , max:5},
    desc:{type:String , required:true},
    lowPrice:{type:Number , required:true},
    HighPrice:{type:Number , required:true},
    beach:{type:Boolean , default:false},
    piscine:{type:Boolean , default:false}



})

module.exports = mongoose.model("Hotel", HotelSchema)
