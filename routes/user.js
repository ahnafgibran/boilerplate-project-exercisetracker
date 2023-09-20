var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:id/logs", UserController.getUserExercises);
router.post("/:id/exercises", UserController.createExercise);

module.exports = router;