require("dotenv").config();
const mongoose = require("mongoose");

async function dbConnect() {
    mongoose.connect('mongodb+srv://workout-tracker:workout-tracker@cluster0.2hhrcoe.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(() => {
        console.log("Sucessfully connected to database");
    })
    .catch((err) => {
        console.log(err);
        console.log("Failed to connect to database");
    });
}

module.exports = dbConnect;