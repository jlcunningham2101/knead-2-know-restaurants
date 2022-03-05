const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all restaurants
router.get('/food', (req, res) => {
    const sql = `SELECT * FROM food`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'The restaurant of your choice has been found!',
        data: rows
      });
    });
  });
     
  module.exports = router;
  