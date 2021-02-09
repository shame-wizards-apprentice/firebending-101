// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape our Workout object
const WorkoutSchema = new Schema({
    name: String,
    type: String,
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number,
    isCardio: Boolean
});

// Export model
const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;