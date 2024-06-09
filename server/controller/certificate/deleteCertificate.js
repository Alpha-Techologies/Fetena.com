const Certificate = require("../../models/certificate.model");
const factory = require("./../handlerFactory")


exports.deleteCertificate = factory.deleteOne(Certificate)
