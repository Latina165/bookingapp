const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.query('SELECT * FROM appointment', (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err.message);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json(results);
  });
});

// Thêm route POST nếu cần
router.post('/', (req, res) => {
  const { patientName, doctorName, date, time } = req.body;
  const query = 'INSERT INTO appointment (patientName, doctorName, date, time) VALUES (?, ?, ?, ?)';
  req.db.query(query, [patientName, doctorName, date, time], (err, result) => {
    if (err) {
      console.error('Error booking appointment:', err.message);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.status(201).json({ message: 'Đặt lịch thành công!' });
  });
});

module.exports = router;