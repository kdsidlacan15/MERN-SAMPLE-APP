import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const {title, load, reps, createdAt} = workout
  const date = new Date(createdAt)
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleClick = async () => {
    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: data})
    } else {
      
    }
  }
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p><strong>Load(kg): </strong>{load}</p>
      <p><strong>Reps: </strong>{reps}</p>
      <p>{formattedDate}</p>
      <span className='material-symbols-outlined' onClick={ handleClick }>Delete</span>
    </div>
  )
}

export default WorkoutDetails