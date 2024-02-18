const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const db = require("../db")
const { body, validationResult } = require('express-validator');

//ROUTE:1 - Get all the Notes using GET     End-Point:/api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
      const q = "SELECT * FROM notes WHERE user_id = ?";
      const result = await new Promise((resolve, reject) => {
        db.query(q, [req.id], (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      res.json(result);
    } catch (error) {
      console.error('Internal server error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


//ROUTE:2 - add a new Note using POST     End-Point:/api/notes/addnewnote. Login required
router.post("/addnewnote", fetchuser,
  [
    body('title', "Title must be at least 5 characters").isLength({ min: 5 }),
    body('description', "Description must be at least 5 characters").isLength({ min: 5 }),
    body('tag', "Tag must be at least 2 characters").isLength({ min: 2 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const title = req.body.title;
      const description = req.body.description;
      const tag = req.body.tag;
      const id = req.id;

      const q = "INSERT INTO notes (title, description, tag, user_id) VALUES (?,?,?,?) ";
      await new Promise((resolve, reject) => {
        db.query(q, [title, description, tag, id], (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      res.json("Note Has Been Added");
    } catch (error) {
      console.error('Internal server error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);


//ROUTE:3 - Update an existing Note using PUT     End-Point:/api/notes/updatenote. Login required
router.put("/updatenote/:id", fetchuser,
  [
    body('title', "Title must be at least 5 characters").isLength({ min: 5 }),
    body('description', "Description must be at least 5 characters ").isLength({ min: 5 }),
    body('tag', "Tag must be at least 2 characters").isLength({ min: 2 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const title = req.body.title;
      const description = req.body.description
      const tag = req.body.tag
      const id = req.params.id

      // Check whether the Note exists or not
      const q = 'SELECT * FROM notes WHERE id = ?'
      const result = await new Promise((resolve, reject) => {
        db.query(q, [id], (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      //if result with the id not exist
      if (!result[0]) {
        return res.status(404).json("Not Found");    
      } else if (result[0].user_id != req.id) {  //check the user belong to the notes with correct creditentials or not - if not then return the following response
        return res.status(401).json("Not Allowed");
      }

      const query = "UPDATE notes SET title = ? , description = ? ,  tag = ? WHERE id = ? ";
      await new Promise((resolve, reject) => {
        db.query(query, [title, description, tag, id], (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      res.json("Note Updated");
    } catch (error) {
      console.error('Internal server error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

//ROUTE:4 - Delete an existing Note using DELETE     End-Point:/api/notes/deletenote. Login required
router.delete("/deletenote/:id", fetchuser,
  async (req, res) => {
    try {
      const id = req.params.id
      // Check whether the Note exists or not
      const q = 'SELECT * FROM notes WHERE id = ?'
      const result = await new Promise((resolve, reject) => {
        db.query(q, [id], (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      //if result with the id not exist
      if (!result[0]) {
        return res.status(404).json("Not Found");
      } else if (result[0].user_id != req.id) {  //check the user belong to the notes with correct creditentials or not - if not then return the following response
        return res.status(401).json("Not Allowed");
      }

      const query = "DELETE FROM notes WHERE id = ? ";
      await new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
          if (err) {
            console.error('Error executing SQL query: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      res.json("Note Deleted");
    } catch (error) {
      console.error('Internal server error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);




module.exports = router