const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var apiRouter = require("./routes/api");

// DB connection
var MONGODB_URL = process.env.MONGO_URI;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		// console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))

//Route Prefixes
app.use("/api/", apiRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
