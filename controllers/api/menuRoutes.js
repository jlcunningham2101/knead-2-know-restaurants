const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all menus
router.get('/menu', (req, res) => {
    const sql = `SELECT * FROM menu`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Here are all of the menu items in our database!',
        data: rows
      });
    });
  });

//get 1 menu item by ID
router.get('/menu/:id', (req, res) => {
  const sql = `SELECT * FROM menu WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Your requested menu item has been found!',
      data: row
    });
  });
});

//Create a menu item
 app.post('/api/menu', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'id',
      'business_id',
      'description',
      'price'
      );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

//update a menu item
router.put('/menu/:id', (req, res) => {
  const errors = inputCheck(req.body, 'business_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE menu SET business_id = ? WHERE id = ?`;
  const params = [req.params.id, req.body.business_id, req.body.description, req.body.price];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Menu item not found'
      });
    } else {
      res.json({
        message: 'Your menu item update was a success!',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

 //delete a menu item
 router.delete('/menu/:id', (req, res) => {
  const sql = `DELETE FROM menu WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Menu item not found'
      });
    } else {
      res.json({
        message: 'Your menu item has been deleted!',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

  module.exports = router;