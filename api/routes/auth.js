const express = require("express")
const router = express.Router()
const db = require("../db")
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "I_have_Developed_This_API_So_dont_try_to_hack_it"

//ROUTE:1 - Create a User using POST     End-Point:/api/notes/createuser   -No login required
router.post('/createuser',
    [body('email', "Enter a Valid Email").isEmail(),
    body("password", "Password Must be atleast 5 characters").isLength({ min: 5 }),
    body('name', "username Must be atleast 5 characters").isLength({ min: 5 }),
    ], async (req, res) => {

        let success = false
        //Check for Validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() })
        }

        try {
            var salt = await bcrypt.genSaltSync(10);
            var hash = await bcrypt.hashSync(req.body.password, salt);

            //Create a User
            const q = "INSERT INTO auth (name, email, password) VALUES (?,?,?)"
            db.query(q, [req.body.name, req.body.email, hash], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({success, message:"Sorry a user with this email already exists"})  //if Email Already Exist Send this response
                }
                else {
                    const data = {
                        id: result.insertId
                    }
                    const authToken = jwt.sign(data, JWT_SECRET);
                    success = true
                    res.json({success, authToken })
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).send("Internal Server Error")
        }

    })

    //ROUTE:2 - Authenticate a user using POST     End-Point:/api/notes/login   -No login required
router.post('/login',
    [body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blanked").exists()
    ], async (req, res) => {
        let success = false
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() })
        }

        const { email, password } = req.body;
        try {

            //check for email existance

            // SQL query to check if a user with the provided username exists
            const query = 'SELECT * FROM auth WHERE email = ?';
            db.query(query, [email], async (err, results) => {
                if (err) {
                    console.error('Error executing SQL query: ', err);
                    res.status(500).json({success, error: 'Internal server error' });
                    return;
                }

                if (!results.length) { 
                    // User with the provided email does not exist
                    return res.status(200).json({success, error: "Please try to login with correct credentials" });

                } else {
                    // Else Part execute when User with the provided email exists

                    //Compare the password to check whether the user is valid for login
                    const passwordCompare = await bcrypt.compare(password, results[0].password);

                    if (!passwordCompare) { return res.status(200).json({ error: "Please try to login with correct credentials." }); }

                    //if password match then ----
                    const data = {
                        id: results[0].id
                    }
                    const authToken = jwt.sign(data, JWT_SECRET);
                    success = true
                    res.json({success, authToken })

                }
            });
        } catch (error) {
            console.error(error)
            res.status(500).send("Internal Server Error")
        }

    })


        //ROUTE:3 - Get Logged in User Details using POST     End-Point:/api/notes/getuser. Login required
        router.post('/getuser', fetchuser ,async (req, res) => {
            try {
                const id = req.id;
                const query = 'SELECT * FROM auth WHERE id = ?';
            db.query(query, [id], async (err, results) => {
                if (err) {
                    console.error('Error executing SQL query: ', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                if (results.length) {
                    // User with the provided email does not exist
                    const {password, ...user} = results[0]
                    return res.status(200).json(user);

                }
            })
            } catch (error) {
                console.error(error.message)
                res.status(500).send("Internel Server Error")
            }
    })

module.exports = router

