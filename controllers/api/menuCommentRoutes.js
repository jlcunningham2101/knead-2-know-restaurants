const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all menu comments
router.get('/menu_comments', (req, res) => {
    const sql = `SELECT * FROM menu_comments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Here are all of the menu comments in our database!',
        data: rows
      });
    });
  });

//get 1 menu comment item by ID
router.get('/menu_comments/:id', (req, res) => {
  const sql = `SELECT * FROM menu_comments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Your requested menu comment has been found!',
      data: row
    });
  });
});

//Create a menu comment
 app.post('/api/menu_comments', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'id',
      'business_id',
      'user_id',
      'menu_rating',
      'description'
      );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

//update a menu comment
router.put('/menu_comments/:id', (req, res) => {
  const errors = inputCheck(req.body, 'business_id', 'user_id', 'menu_rating', 'description');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE menu_comments SET business_id = ? WHERE id = ?`;
  const params = [req.params.id, req.body.business_id, req.body.user_id, req.body.menu_rating, req.body.description];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Menu comment not found'
      });
    } else {
      res.json({
        message: 'An update was successfully made to your comment!',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

 //delete a comment
 router.delete('/menu_comments/:id', (req, res) => {
  const sql = `DELETE FROM menu_comments WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Comment not found'
      });
    } else {
      res.json({
        message: 'Your comment has been deleted!',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

  module.exports = router;