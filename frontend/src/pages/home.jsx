import { useEffect, useState } from 'react'
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchWorkouts = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:4000/api/workouts', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      const data = await response.json()
      if (response.ok) {
        setLoading(false)
        dispatch( {type: 'SET_WORKOUTS', payload: data} )
      } 
    }
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      { loading ? <div className="loading-screen">
        <div className="loading"/>
        </div> : <div className="workouts">
        {workouts && workouts?.map((workout)=> (
          <WorkoutDetails key={workout?._id} workout={workout} />
        ))}
      </div>}
      
      <WorkoutForm />
    </div>
  )
}

export default Home