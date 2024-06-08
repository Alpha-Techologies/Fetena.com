const { createCertificate } = require("./createCertificate");
const { deleteCertificate } = require("./deleteCertificate");
const { getAllCertificate, getOneCertificate, getMyCerts } = require("./getCertificate");
const { updateCertificate } = require("./updateCertificate");

module.exports = {
    createCertificate,
    deleteCertificate,
    getAllCertificate,
    getOneCertificate,
    updateCertificate, 
    getMyCerts
}