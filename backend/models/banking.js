const mongoose = require("mongoose");

const bankingSchema = new mongoose.Schema({
    credit:{
        type:Number,
        required:false,
        default:0,
    },
    debit:{
        type:Number,
        required:false,
        default:0,
    },
    description:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        default:0,
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('banking', bankingSchema)