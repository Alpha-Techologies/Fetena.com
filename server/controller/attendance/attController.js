const path = require('path');
const fs = require('fs');
const { exportAttendanceToCsv } = require('../../utils/attendanceCsv');

const exportAttendanceToCSV = async (req, res) => {
  try {
    // Define file name and path
    const fileName = 'attendance_logs.csv';
    const filePath = path.join(__dirname, '../../exports', fileName);
    
    console.log(filePath, 'log the file path');
    
    // Ensure the export directory exists
    if (!fs.existsSync(path.join(__dirname, '../../exports'))) {
      fs.mkdirSync(path.join(__dirname, '../../exports'));
    }

    // Export data to CSV
    await exportAttendanceToCsv(filePath);
    console.log('exporting attendance to csv');

    // Respond with the CSV file
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error downloading the file.' });
      }

      // Optionally, delete the file after download if not needed
      // fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error exporting attendance:', error);
    return res.status(500).json({ error: 'Failed to export attendance to CSV' });
  }
};

module.exports = {
  exportAttendanceToCSV,
};