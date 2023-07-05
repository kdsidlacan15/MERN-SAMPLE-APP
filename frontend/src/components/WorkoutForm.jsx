import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
const WorkoutForm = () => {
const [newWorkout, setNewWorkout] = useState({
  title: '',
  load: '',
  reps: ''
})
const { dispatch } = useWorkoutsContext()
const { user } = useAuthContext()
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
const [emptyFields, setEmptyFields] = useState([])

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!user) {
    setError('You must be logged in!')
    return
  }
  setLoading(true)
  const response = await fetch('http://localhost:4000/api/workouts', {
    method: 'POST',
    body: JSON.stringify(newWorkout),
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    }
  })

  const data = await response.json()

  if(!response.ok) {
    setLoading(false)
    setError(data.error)
    setEmptyFields(data.emptyFields)
  } else {
    dispatch({ type: 'CREATE_WORKOUT', payload: data })
    setLoading(false)
    setNewWorkout({
      title: '',
      load: '',
      reps: ''
    })
    setError(null)
    setEmptyFields([])
    console.log('New workout added', data)
  }
}

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Exercise Type:</label>
      <input
        type="text"
        onChange={(e) => setNewWorkout({
          ...newWorkout,
          title: e.target.value
        })}
        value={newWorkout.title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setNewWorkout({
          ...newWorkout,
          load: e.target.value
        })}
        value={newWorkout.load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />  

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setNewWorkout({
          ...newWorkout,
          reps: e.target.value
        })}
        value={newWorkout.reps}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

        {loading ? <div className="loading">{loading}</div> : <button>Add Workout</button> }
        
        {error && <div className="error">{error}</div>}

      
    </form>
  )
}

export default WorkoutForm