import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import EditWorkoutForm from './EditWorkoutForm'

const WorkoutDetails = ({ workout }) => {
  const [ visible, setVisible ] = useState(false)
  const { dispatch } = useWorkoutsContext()
  const {title, load, reps, createdAt} = workout
  const date = new Date(createdAt)
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleClickDelete = async () => {
    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: data})
    } else {
      
    }
  }
  const handleClickEdit = () => {
    setVisible(true)
  }
  return (
    <>
      <div className="workout-details">
        <h4>{title}</h4>
        <p><strong>Load(kg): </strong>{load}</p>
        <p><strong>Reps: </strong>{reps}</p>
        <p>{formattedDate}</p>
        <div>
          <span id="edit-button" className='material-symbols-outlined' onClick={handleClickEdit}>Edit</span>
          <span id="delete-button" className='material-symbols-outlined' onClick={ handleClickDelete }>Delete</span>
        </div>
      </div>
      { visible && <EditWorkoutForm workout={workout} setVisible={setVisible} /> }
  </>
  )
}

export default WorkoutDetails