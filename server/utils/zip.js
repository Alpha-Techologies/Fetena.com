var Minizip = require('minizip-asm.js');
const fs = require('fs');
// const Room = require("../models/roomModel.js")
const User = require("../models/user.model.js")
const APIFeatures = require("./apiFeatures.js");
const logger = require('./logger');


exports.zip = async (req,res,next) =>  {

    logger.info("Backing up...")

    const {password} = req.query
    const path = './backups'
    const filename = "archive.zip"
    const model = req.baseUrl.split("/")[1]
    let data;

    if (model === "rooms"){

      // let query = new APIFeatures(Room.find({}), req.query)
      // data = await query.query;
    }
    else if (model === "users"){
      let query = new APIFeatures(User.find({}), req.query)
      data = await query.query;
    }

    var mz = new Minizip();
    mz.append(`${model}-backup.json`,JSON.stringify(data), {password});


    fs.writeFileSync(path + "/" + filename, new Buffer(mz.zip()))

    res.download(path+"/"+filename);

  }
