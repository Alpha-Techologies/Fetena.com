const Certificate = require("../../models/certificate.model");
const factory = require("./../handlerFactory");

exports.updateCertificate = factory.updateOne(Certificate);
