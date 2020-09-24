const express = require('express')
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

const router = express.Router();

router.post("/new-user", async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({
      username: username
    });

    if (user == null) {
      const resp = await User.create({
        username: username
      });
      return res.send({
        username: username,
        _id: resp._id
      }).status(201);
    } else {
      return res.send("Username is already taken").status(409);
    }

  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  let users = await User.find({});
  return res.send(users).status(200);
});

router.post("/add", async (req, res) => {
  let user = await User.findById(req.body.userId);
  const date = new Date(req.body.date);
  date.setHours(0, 0, 0, 0);

  user.exercises.push({
    description: req.body.description,
    duration: req.body.duration,
    date
  });

  user = await user.save();
  console.log(user);
  return res.send(user).status(201);
});

router.get("/log", async (req, res) => {
  const userId = req.query.userId;
  let filter = {
    $filter: {
      input: '$exercises',
      as: 'exercise',
      cond: {
        $and: []
      }
    }
  };
  if(req.query.from){
    const fromDate = new Date(req.query.from);
    fromDate.setHours(0, 0, 0, 0);
    filter.$filter.cond.$and.push({$gte: ['$$exercise.date', fromDate]})
  }
  const toDate = new Date(req.query.to);
  toDate.setHours(0, 0, 0, 0);
  if(req.query.to){
    const toDate = new Date(req.query.to);
    toDate.setHours(0, 0, 0, 0);
    filter.$filter.cond.$and.push({$lte: ['$$exercise.date', toDate]})
  }
  if(req.query.limit){
    filter = {
      $slice: [filter, parseInt(req.query.limit)]
    }
  }
  let results = await User.aggregate([
    {
      $match: {
        _id: ObjectId(userId)
      }
    },
    {
      $project: {
        exercises: filter
      }
    }
  ])

  return res.send(results).status(200);
});
module.exports = router;
