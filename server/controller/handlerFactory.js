const mongoose = require("mongoose");
const APIError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const {logActivity} = require("../utils/logActivity");
const APIFeatures = require("../utils/apiFeatures");
const dbConn = require("../config/db_Connection");
// const OrganizationExaminer = require("../models/organization.examiner.model");
const { StatusCodes } = require("http-status-codes");
require("events").EventEmitter.prototype._maxListeners = 70;
require("events").defaultMaxListeners = 70;

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = new APIFeatures(Model.findById(req.params.id), req.query)
      .filter()
      .field()
      .populate();

    const doc = await query.query;

    if (!doc) {
      return next(new APIError(`No document found with ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: "succcess",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model, options = "", obj = {}) =>
  catchAsync(async (req, res, next) => {
    // currentTime, pathname, method
    // const {currentTime,_parsedOriginalUrl} = req 
    // console.log(currentTime)
    // console.log(_parsedOriginalUrl.pathname)

    let opt = {};
    if (options === "addUser") opt = { user: req.user.id }; 
    if (options === "addOrganization") opt = { organization: req.params.id };
    if (options === "addExaminerStatus")
      opt = { user: req.user.id, status: "activated" };
    if (options === "addExamCreater")
      opt = { createdBy: req.user.id, organization: req.params.id };
    if (options === "addExam") opt = { exam: req.params.id };

    const page = req.query.page * 1 || 1;

    console.log(opt, options)
    const limit = req.query.limit * 1 || 10;

    let count = new APIFeatures(Model.find(opt), req.query).filter().count();
    let total = await count.query;

    let query = new APIFeatures(Model.find(opt), req.query)
      .filter()
      .field()
      .sort()
      .paginate()
      .populate();

    const doc = await query.query;

    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "succcess",
      data: {
        data: doc,
        results: doc.length,
        paginationData: {
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          showingFrom: limit * (page - 1) + 1,
          showingUntil: limit * page > total ? total : limit * page,
        },
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
      { 
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }

    await logActivity(req,1,{name:Model?.modelName,id:req.params.id})
    
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const doc = await Model.findByIdAndDelete(req.params.id);
    const model = await Model.findOne({_id: req.params.id});

    if (!model) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }

    model.active = false;
    console.log(model)
    await model.save();

    await logActivity(req,5,{name:Model?.modelName,id:req.params.id} )
    res.status(StatusCodes.OK).json({
      status: "success",
      data: null,
    });
  });

exports.deleteMany = (Model, delArr) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany({
      _id: {
        $in: delArr,
      },
    });

    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(
        new APIError(`An error occured while creating the document`, 500)
      );
    }

    await logActivity(req,0,{name:Model?.modelName,id:doc.id})

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createMany = (Model, returnOnlyId = false) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.insertMany(req.body);
    if (!doc) {
      return next(
        new APIError(`An error occured while creating the document`, 404)
      );
    }

    if (returnOnlyId) {
      let id = doc.map((item) => item._id);
      // await logActivity(req,0,{name:Model?.modelName,id:req.params.id} )
      res.status(201).json({
        status: "success",
        data: {
          data: id,
        },
      });
    } else {

      // await logActivity(req,0,{name:Model?.modelName,id:req.params.id} )

      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    }
  });
