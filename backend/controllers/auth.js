const bcrypt = require("bcrypt");
const User = require("../database/models/userModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

const saltRound = 10;


//register
exports.register = async (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user != null) {
            res.status(403).send({message: "User already exists"});
        }
        else {
            bcrypt.hash(req.body.password, saltRound)
            .then((hashedPassword) => {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    workouts: [{
                        category: 'Cardio',
                        name: 'Walk',
                        target: 5,
                        unit: 'km',
                    }]
                });
                console.log(user);
                user.save()
                .then((result) => {
                    res.status(201).send({
                        message: "User Created Successfully",
                        result,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
                console.log("User added");
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Password was not hashed successfully",
                    err,
                });
                console.log("Unable to add the user");
            });
        }
    });


    
};




//login
exports.login = async (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        bcrypt.compare(req.body.password, user.password).then((passwordCheck) => {
            if(!passwordCheck)
            {
                return res.status(400).send({
                        message: "Passwords does not match"
                    });
            }
            //creating token
            const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                process.env.TOKEN,
                { expiresIn: "24h" }
            );
            res.status(200).send({
                message: "Login Successful",
                email: user.email,
                name: user.name,
                token
            })
            }).catch((err) => {
                res.status(400).send({
                    message: "Passwords does not match",
                    err
                });
        });
    }).catch((e) => {
        res.status(404).send({
            message: "Username not found",
            e
        });
    })
};