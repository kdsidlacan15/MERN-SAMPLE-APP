
const WorkoutDetails = ({workout}) => {
  const {title, load, reps, createdAt} = workout
  const date = new Date(createdAt)
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p><strong>Load(kg):</strong>{load}</p>
      <p><strong>Reps:</strong>{reps}</p>
      <p>{formattedDate}</p>
    </div>
  )
}

export default WorkoutDetails