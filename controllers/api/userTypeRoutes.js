const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all user_type
router.get('/user_type', (req, res) => {
    const sql = `SELECT * FROM user_type`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Here are all of the user types in our database!',
        data: rows
      });
    });
  });

//get a user_type by ID
router.get('/user_type/:id', (req, res) => {
  const sql = `SELECT * FROM user_type WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Your requested user type has been found!',
      data: row
    });
  });
});

//Create a user_type
 app.post('/api/user_type', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'id',
      'user_role',
      'username',
      'user_password',
      'email'
  );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

//update a user_type
router.put('/user_type/:id', (req, res) => {
  const errors = inputCheck(req.body, 'email');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE user_type SET user_role = ? WHERE id = ?`;
  const params = [req.params.id, req.body.user_role, req.body.username, req.body.user_password, req.body.email];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'User type not found'
      });
    } else {
      res.json({
        message: 'Your user type update was a success!',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

 //delete a user_type
 router.delete('/user_type/:id', (req, res) => {
  const sql = `DELETE FROM user_type WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'User type not found'
      });
    } else {
      res.json({
        message: 'Your user type has been deleted!',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

  module.exports = router;