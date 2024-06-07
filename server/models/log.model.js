const mongoose = require("mongoose");
const Organization = require("./organization.model");

const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization"        
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
            type:String
        }
    }
    },
    {
        timestamps: true,
    }
    );

const LogModel = mongoose.model("Logs", logSchema);

module.exports =  LogModel;