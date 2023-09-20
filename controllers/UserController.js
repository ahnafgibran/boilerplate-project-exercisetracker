const UserModel = require("../models/UserModel")
const ExerciseModel = require("../models/ExerciseModel")

exports.createUser = [
  (req, res) => {
    try {
      if (!req.body.username) return res.json({ error: "Username is required" })
      const user = new UserModel({
        username: req.body.username,
      })
      user
        .save()
        .then(function (data) {
          res.json({ username: data.username, _id: data._id })
        })
        .catch(function (err) {
          res.status(400).json({ message: "Error", error: err })
        })
    } catch (err) {
      res.status(400).json({ message: "Error", error: err })
    }
  },
]

exports.getUsers = [
  (req, res) => {
    try {
      UserModel.find({})
        .then(function (data) {
          res.json(data)
        })
        .catch(function (err) {
          res.status(400).json({ message: "Error", error: err })
        })
    } catch (err) {
      res.status(400).json({ message: "Error", error: err })
    }
  },
]

exports.createExercise = [
  async (req, res) => {
    try {
      const { description, duration, date } = req.body
      const id = req.params.id
      console.log(req.body)
      console.log(id, description, duration, date)
      if (!id || !description || !duration)
        return res.json({ error: "Required field(s) missing" })

      const userData = await UserModel.findOne({ _id: id })
      if (!userData) return res.json({ error: "User not found" })

      const exercise = new ExerciseModel({
        username: userData.username,
        description,
        duration,
        date: date ? new Date(date) : new Date(),
      })

      exercise
        .save()
        .then(function (data) {
          return res.json({
            _id: userData.id,
            username: userData.username,
            date: data.date.toDateString(),
            duration: data.duration,
            description: data.description,
          })
        })
        .catch(function (err) {
          res.status(400).json({ message: "Error", error: err })
        })
    } catch (err) {
      return res.status(400).json({ message: "Error", error: err })
    }
  },
]

exports.getUserExercises = [
  (req, res) => {
    try {
      const id = req.params.id
      const limit = req.query.limit
      const from = req.query.from
      const to = req.query.to
      // Define the filter object
      const dateFilter = {}

      // Check if "from" parameter is provided
      if (from) {
        dateFilter.date = { $gte: new Date(from) }
      }

      // Check if "to" parameter is provided
      if (to) {
        // If "dateFilter.date" already exists, add "$lte" condition
        // Otherwise, create a new object with "$lte" condition
        dateFilter.date = dateFilter.date || {}
        dateFilter.date.$lte = new Date(to)
      }
      if (!id) return res.json({ error: "Required field(s) missing" })
      UserModel.findOne({ _id: id })
        .then(function (data) {
          if (!data) return res.json({ error: "User not found" })
          ExerciseModel.find({ username: data.username, ...dateFilter })
            .limit(limit)
            .then(function (data) {
              return res.json({
                _id: id,
                username: data.username,
                count: data.length,
                log: data.map((item) => ({
                  description: item.description,
                  duration: item.duration,
                  date: item.date.toDateString(),
                })),
              })
            })
            .catch(function (err) {
              res.status(400).json({ message: "Error", error: err })
            })
        })
        .catch(function (err) {
          res.status(400).json({ message: "Error", error: err })
        })
    } catch (err) {
      res.status(400).json({ message: "Error", error: err })
    }
  },
]
