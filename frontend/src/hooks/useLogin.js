import { useState } from 'react'
import { useAuthContext } from'./useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const login = async (credentials) => {
    const { email, password } = credentials
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const data = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(data.error)
    } else {
      // save the user to the local storage
      localStorage.setItem('user', JSON.stringify(data))

      // update the auth context
      dispatch({type:'LOGIN', payload: data})
      setIsLoading(false)
      setError(null)
    }
  }
  return { login, isLoading, error,  }
}