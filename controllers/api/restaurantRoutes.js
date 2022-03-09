const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all restaurants
router.get('/restaurant', (req, res) => {
    const sql = `SELECT * FROM restaurant`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Here are all of the restaurants in our database!',
        data: rows
      });
    });
  });

//get 1 restaurant by ID
router.get('/restaurant/:id', (req, res) => {
  const sql = `SELECT * FROM restaurant WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Your requested restaurant has been found!',
      data: row
    });
  });
});

//Create a restaurant
 app.post('/api/restaurant', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'id',
      'restaurant_name',
      'food_type',
      'business_address',
      'city',
      'phone_number',
      'website',
      'food_description'
  );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

//update a restaurant
router.put('/restaurant/:id', (req, res) => {
  const errors = inputCheck(req.body, 'email');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE restaurant SET restaurant_name = ? WHERE id = ?`;
  const params = [req.params.id, req.body.restaurant_name, req.body.food_type, req.body.business_address, req.body.city, req.body.phone_number, req.body.website, req.body.food_description];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Restaurant not found'
      });
    } else {
      res.json({
        message: 'Your restaurant update was a success!',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

 //delete a restaurant
 router.delete('/restaurant/:id', (req, res) => {
  const sql = `DELETE FROM restaurant WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Restaurant not found'
      });
    } else {
      res.json({
        message: 'Your restaurant has been deleted!',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

  module.exports = router;