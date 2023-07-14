const mongoose = require("mongoose");

const obj = {
    category: String,
    name: String,
    target: Number,
    unit: String
};

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        workouts: [obj],
        workoutlog: [{
            date: String,
            arr: [{
                ... obj,
                done: {type: Number, default: 0}
            }]
        }]
    }
);

const User = new mongoose.model("User", userSchema);


module.exports = User;