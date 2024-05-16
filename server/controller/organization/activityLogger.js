const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const User = require("../../models/user.model");
const catchAsync = require("../../utils/catchAsync");
const factory = require("../handlerFactory");
const APIError = require("../../utils/apiError");
const { fileUpload } = require("../profile/fileUpload");
const ActivityLog = require('../models/ActivityLog');

const activityLogger = (action) => {
    return async (req, res, next) => {
        const userId = req.user ? req.user._id : null; // Assuming you have user info in `req.user`
        const details = JSON.stringify({
            method: req.method,
            originalUrl: req.originalUrl,
            body: req.body,
            params: req.params
        });

        try {
            await new ActivityLog({
                userId,
                action,
                details
            }).save();

            next();
        } catch (error) {
            console.error('Failed to log activity:', error);
            next();
        }
    };
};

module.exports = activityLogger;