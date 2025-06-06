const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Đăng ký
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    // Hash password trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    req.db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err.message);
        return res.status(500).json({ error: 'Lỗi server', details: err.message });
      }
      res.status(201).json({ message: 'Đăng ký thành công!' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Đăng nhập
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  req.db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Lỗi server' });
      if (results.length === 0) return res.status(401).json({ error: 'Tên người dùng không tồn tại' });

      const user = results[0];

      try {
        // So sánh password với hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Mật khẩu không đúng' });

        res.json({ token: 'fake-jwt-token', userId: user.id });
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ error: 'Lỗi server' });
      }
    }
  );
});

module.exports = router;