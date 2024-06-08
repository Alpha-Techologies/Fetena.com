const Chat = require("../../models/chat.model");
const TakeExam = require("../../models/take.exam.model");
const factory = require("./../handlerFactory");
const catchAsync = require("../../utils/catchAsync");


exports.sendChat =  catchAsync(async (req, res, next) => {

    const takeExam = await TakeExam.findOne( {_id: req.params.id});

    const doc = takeExam.sendChat(req.body);

    if (!doc) {
      return next(
        new APIError(`An error occured while creating the document`, 404)
      );
    }

    res.end()

  });

