const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:true
    },
	email:{
        type:String,
        required:true,
        unique : true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    drones: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Drone',
        },
      ],
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema) 