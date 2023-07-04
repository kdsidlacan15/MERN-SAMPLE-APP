import { useState } from 'react'
import { useAuthContext } from'./useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const signup = async (credentials) => {
    const { email, password } = credentials
    setSuccess(null)
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const data = await response.json()

    if(!response.ok) {
      setSuccess(null)
      setIsLoading(false)
      setError(data.error)
    } else {
      // save the user to the local storage
      localStorage.setItem('user', JSON.stringify(data))

      // update the auth context
      dispatch({type:'LOGIN', payload: data})
      setIsLoading(false)
      setError(null)
      setSuccess(true)
    }
  }
  return { signup, isLoading, error, success }
}