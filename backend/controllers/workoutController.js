const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})
  try {
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get a single workout
const getWorkout = async (req,res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Invalid Id Format'})
    }
    const workout = await Workout.findById(id)
    if(!workout) {
      return res.status(404).json({error: 'No such workout'})
    } else {
      res.status(200).json(workout)
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// create new workout
const createWorkout = async (req, res)=> {
  const {title, load, reps } = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0){
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
  }
  // add doc to db
  try {
    const workout = await Workout.create({
      title,
      load,
      reps
    })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({error: 'Invalid Id Format'})
    }
    const workoutToDelete = await Workout.findOneAndDelete({_id: id})
    if(!workoutToDelete) {
      res.status(400).json({error: 'No such Workout'})
    } else {
      res.status(200).json(workoutToDelete)
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
 
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({error: 'Invalid Id Format'})
    }
    const workoutToUpdate = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body}, {new: true})
    if(!workoutToUpdate) {
      res.status(400).json({error: 'No such Workout'})
    } else {
      res.status(200).json(workoutToUpdate)
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}