/* Load mongoose module - allow to manipulate the database */
const mongoose = require("mongoose");


const logger = require("./../utils/logger")

/* get database authentication keys */
const {
  dbAuth
} = require("./db_Authentication");

mongoose
  // .connect("mongodb://mongo:27017/beach-resort?retryWrites=true", { //create connection
  .connect("mongodb://localhost:27017/beach-resort?retryWrites=true", { //create connection
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
  })

mongoose.set('debug', 
function(collectionName, methodName, ...methodArgs) {
  try{
    logger.info(`${collectionName}.${methodName}(${JSON.stringify(methodArgs)})`)
  }
  catch(error){
    logger.error(`${collectionName}.${methodName}(${JSON.stringify(methodArgs)})`)
  }
})
const dbConn = mongoose.connection

dbConn.on('error', () => {
  console.error.bind(console, 'connection error')
})
dbConn.once('open', () => {
  logger.info("DBconnection succcessful")
})
module.exports = dbConn;