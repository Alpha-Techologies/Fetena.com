const Chat = require("../../models/chat.model");
const TakeExam = require("../../models/take.exam.model.js");
const catchAsync = require("../../utils/catchAsync");
const {mongoose} = require('./../../config/db_Connection.js')

exports.getChat = catchAsync(async (req, res, next) => {
  
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  // res.setHeader('Content-Security-Policy', "default-src 'none'; connect-src 'self' http://localhost:8080;");
  // Content-Security-Policy: default-src 'none'; connect-src 'self' http://localhost:8080;
  res.flushHeaders(); // flush the headers to establish SSE with client

  // setInterval(() => {
    
  //   res.write(`data:{sdffdsf}\n\n`)
  // }, 1000);

  mongoose.set("debug", async function (collectionName, methodName, ...methodArgs) {
    try {
      console.log(`${collectionName}.${methodName}(${JSON.stringify(methodArgs)})`);
      
      if (collectionName === 'takeexams' && methodName === 'updateOne'){

      const payload = methodArgs[1]["$push"]["chatMessages"]["$each"][0]
      const examId = methodArgs[0]["_id"]
      
      // console.log(payload, examId.toString(), req.params.id)
      // console.log(req.params.id == examId.toString())
      
      if (req.params.id == examId.toString() ){
          // replace id with params.id
          const doc = await TakeExam.find({_id:examId})
          // console.log(doc[0].chatMessages,'doc')

            if (!doc) {
              return next(
                new APIError(`An error occured while creating the document`, 404)
              );
            }
          res.write(`data:${JSON.stringify(doc[0])}\n\n`)
        }
      }
    } catch (error) {
    }
  });
});

