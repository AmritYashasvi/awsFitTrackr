const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth");
const usercontroller = require("../controllers/usercontroller");
const authorinzation = require("../middleware/authorinzation");

//workouts

router.post("/register", authcontroller.register);

router.post("/login", authcontroller.login);

router.get("/getworkout", authorinzation, usercontroller.getworkout);

router.patch("/addworkout", authorinzation, usercontroller.addworkout);

router.patch("/removeworkout", authorinzation, usercontroller.removeworkout);

//logs

router.patch("/addlog", authorinzation, usercontroller.addlog);

router.post("/getlog", authorinzation, usercontroller.getlog);

router.get("/gettodaylog", authorinzation, usercontroller.gettodaylog);




module.exports = router;
