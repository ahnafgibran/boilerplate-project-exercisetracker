var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
	username: {type: String, required: true},
  date: {type: Date, required: true},
  duration: {type: Number, required: true},
  description: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Exercise", ExerciseSchema);