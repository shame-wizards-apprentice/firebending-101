// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape our Day object
const DaySchema = new Schema({
    name: String,
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Workout"
        }
    ]
})

// Export model
const Day = mongoose.model("Day", DaySchema);
module.exports = Day;