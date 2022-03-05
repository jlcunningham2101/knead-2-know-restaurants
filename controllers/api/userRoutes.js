const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all users
router.get('/user', (req, res) => {
    const sql = `SELECT * FROM user`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Here are all of the users in our database!',
        data: rows
      });
    });
  });

//get 1 user by ID
router.get('/user/:id', (req, res) => {
  const sql = `SELECT * FROM user WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Your requested user account has been found!',
      data: row
    });
  });
});

//Create a user
 app.post('/api/user', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'id',
      'user_type_id',
      );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

//update a user
router.put('/user/:id', (req, res) => {
  const errors = inputCheck(req.body, 'user_type_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE user SET user_type_id = ? WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'User not found'
      });
    } else {
      res.json({
        message: 'Your user account update was a success!',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

 //delete a restaurant
 router.delete('/user/:id', (req, res) => {
  const sql = `DELETE FROM user WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'User account not found'
      });
    } else {
      res.json({
        message: 'Your user account has been deleted!',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

  module.exports = router;
