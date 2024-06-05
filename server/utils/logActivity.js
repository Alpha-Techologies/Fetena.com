const Log = require("../models/log.model");
const actionTypes = ["created","edited","archived","loggedIn","deactivated", "delete","activated","joined"]
// const entities = ["an organization","an exam","user"]


const logActivity = async (req,actionIndex, {name,id}) => {

      await Log.create({
        user: req.user.id? req.user._id : 'Unknown',
        ipAddress: req.ip? req.ip : 'Unknown',
        action:`${actionTypes[actionIndex]}`,
        entity:{
          name,
          id
        }
      });
  };

module.exports = {
  logActivity,
};