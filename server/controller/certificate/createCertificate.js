const Certificate = require("../../models/certificate.model");
const factory = require("./../handlerFactory");

exports.createCertificate = factory.createMany(Certificate, true);
    
