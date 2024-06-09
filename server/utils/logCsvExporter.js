// utils/csvExporter.js

const Log = require("../models/log.model");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const exportLogsToCsv = async (filePath) => {
  const logs = await Log.find().populate('user', 'name email');

  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'timestamp', title: 'Timestamp' },
      { id: 'user', title: 'User' },
      { id: 'ipAddress', title: 'IP Address' },
      { id: 'action', title: 'Action' },
      { id: 'entityName', title: 'Entity Name' },
      { id: 'entityId', title: 'Entity ID' }
    ]
  });

  const records = logs.map(log => ({
    timestamp: log.createdAt.toISOString(),
    user: log.user ? `${log.user.name} (${log.user.email})` : 'Unknown',
    ipAddress: log.ipAddress,
    action: log.action,
    entityName: log.entity.name,
    entityId: log.entity.id
  }));

  await csvWriter.writeRecords(records);
};

module.exports = {
  exportLogsToCsv
};