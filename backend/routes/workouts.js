const express = require('express')
const { 
        createWorkout, 
        getAllWorkouts , 
        getWorkout,
        deleteWorkout,
        updateWorkout }
         = require('./../controllers/workoutController')

const router = express.Router()

// Get all workouts
router.get('/', getAllWorkouts)

// Get single workout
router.get('/:id', getWorkout)

// POST new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE new workout
router.patch('/:id', updateWorkout)


module.exports = router