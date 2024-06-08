const Certificate = require("../../models/certificate.model");
const factory = require("./../handlerFactory");

exports.getOneCertificate = factory.getOne(Certificate);
exports.getAllCertificate = factory.getAll(Certificate);
exports.getMyCerts = factory.getAll(Certificate,"myCertificate");
