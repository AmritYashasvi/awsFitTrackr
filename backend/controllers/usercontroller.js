const User = require("../database/models/userModel");
const bodyParser = require("body-parser");
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





  exports.getworkout = async (req, res) => {
    const email = req.user.userEmail;
    User.findOne({email: email}).then((data) => {
      const result = data.workouts;
      res.status(200).send({result});
    }).catch((err) => {
      res.status(404).send({message: "not found", err});
    })
  }


  exports.addworkout = async (req, res) => {
    const data = {
        category: req.body.category,
        name: req.body.name,
        target: req.body.target,
        unit: req.body.unit
    }

    User.findOneAndUpdate({email: req.user.userEmail}, {$push: {workouts: data}}).then((d) => {
      
      const currentDate = new Date().toJSON().slice(0, 10);
      const email = req.user.userEmail;
      User.findOne({email: email}).select({ workoutlog: {$elemMatch: {date: currentDate}}}).then((result) => {
        const logs = result.workoutlog[0].arr;
        logs.push(data);
        const newdata = {
          date: currentDate,
          arr: logs,
        }
        User.findOneAndUpdate({email: req.user.userEmail}, {$pull: {workoutlog: {date: currentDate}}}).then(() => {
          User.findOneAndUpdate({email: req.user.userEmail}, {$push: {workoutlog: newdata}});
        });
        console.log(newdata);
      }).catch((err) => {
        res.send({err, message: 'not found'});
      });
      res.status(200).send({
        message: "Success",
      });
    }).catch((err) => {
      res.status(500).send({
        err,
        message: "Unable to add workout",
      })
    });

    
  }


  exports.removeworkout = async (req, res) => {
    const currentDate = new Date().toJSON().slice(0, 10);
    User.findOneAndUpdate({email: req.user.userEmail}, {$pull: {workouts: {_id: req.body._id}}}).then(() => {
      User.findOneAndUpdate({email: req.user.userEmail}, {$pull: {workoutlog: {date: currentDate}}}).then(() => {
        
      });
      res.status(200).send({message: "Success"});
    });
  }


  //logs
  exports.addlog = async (req, res) => {
    // console.log(req.body.arr);
    const currentDate = new Date().toJSON().slice(0, 10);
    const email = req.user.userEmail;
    const arr = req.body.arr;
    const data = {
      date: currentDate,
      arr : arr,
    };
    User.findOneAndUpdate({email: email}, {$pull: {workoutlog: {date: currentDate}}}).then(() => {
      User.findOneAndUpdate({email: req.user.userEmail}, {$push: {workoutlog: data}}).then((data) => {
        res.status(200).send({
          data,
          message: "Success",
        });
      }).catch((err) => {
        res.status(500).send({
          err,
          message: "Unable to add workout",
        })
      });
    })
  };

  exports.getlog = async (req, res) => {
    const email = req.user.userEmail;
    // console.log(req.body);
    User.findOne({email: email}).select({ workoutlog: {$elemMatch: {date: req.body.date}}}).then((result) => {
      console.log(result);
      res.send(result.workoutlog[0].arr);
    }).catch((err) => {
      res.send({err, message: 'not found'});
    });
  };

  exports.gettodaylog = async (req, res) => {
    const email = req.user.userEmail;
    const currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate);
    User.findOne({email: email}).select({ workoutlog: {$elemMatch: {date: currentDate}}}).then((result) => {
      if(result.workoutlog.length != 0)
        res.send(result.workoutlog);
      else {
        var arr = [];
        var data = [];
        User.findOne({email: email}).then((result) => {
          arr = result.workouts;
          data = {date: currentDate, arr: arr}
          console.log(data);
          User.findOneAndUpdate({email: email}, {$push: {workoutlog: data}}).then((d) => {
            User.findOne({email: email}).select({ workoutlog: {$elemMatch: {date: currentDate}}}).then((result) => {
              res.send(result.workoutlog);
            });
          }).catch((e) => {
            res.send(e);
          });
        }).catch((err) => {
          res.status(404).send({err, message: "user not found :("});
        });
        
        
      }
    }).catch((err) => {
      res.send({err, message: 'not found'});
    });

  };

