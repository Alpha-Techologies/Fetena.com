const TakeExam = require('../models/take.exam.model'); // Correct import path
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const exportAttendanceToCsv = async (filePath) => {
  // Find all exams and populate related user data
  const exams = await TakeExam.find()
    .populate('exam', 'name') // Adjust field names as per your `Exam` schema
    .populate('user', 'name email') // Adjust field names as per your `User` schema
    .exec();

  // Initialize CSV Writer
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
        { id: 'examId', title: 'Exam ID' },
        { id: 'exam', title: 'Exam Name' },
        { id: 'userId', title: 'User ID' },
        { id: 'user', title: 'User' },
        { id: 'status', title: 'Status' },
        { id: 'startTime', title: 'Start Time' },
        { id: 'endTime', title: 'End Time' }
    ],
  });

  // Map data to CSV format
  const records = exams.map((exam) => ({
    examId: exam.exam ? exam.exam._id.toString() : 'Unknown',
    exam: exam.exam ? exam.exam.name : 'Unknown',
    userId: exam.user ? exam.user._id.toString() : 'Unknown',
    user: exam.user ? `${exam.user.name} (${exam.user.email})` : 'Unknown',
    status: exam.status,
    startTime: exam.startTime ? exam.startTime : 'N/A',
    // endTime: exam.endTime ? exam.endTime.toISOString() : 'N/A',
    endTime: exam.endTime ? new Date(exam.endTime).toISOString() : 'N/A',
  }));

  // Write the records to a CSV file
  await csvWriter.writeRecords(records);
};

module.exports = {
  exportAttendanceToCsv,
};