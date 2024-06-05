const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    },
    ipAddress: { 
        type: String, 
        required: true 
    },
    action: { 
        type: String, 
        required: true,
        default:'unknown'
    },
    entity:{
        name:{
            type:String,
            default:'none'
        },
        id:{
            type:mongoose.Schema.Types.ObjectId
        }
    }
    },
    {
        timestamps: true,
    }
    );

const LogModel = mongoose.model("Logs", logSchema);

module.exports =  LogModel;