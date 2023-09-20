var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);