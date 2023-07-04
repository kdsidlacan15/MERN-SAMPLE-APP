import { useSignup } from "../hooks/useSignup"
const { useState } = require("react")

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const {signup, error, isLoading, success} = useSignup()

  const handleCredentialChange = (e, cred) => {
    if(cred === 'email') {
      setCredentials({...credentials, email: e.target.value})
    } else {
      setCredentials({...credentials, password: e.target.value})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(credentials)
  }

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign up</h3>

      <label>Email:</label>
      <input
      type="email" 
      onChange={(e) => handleCredentialChange(e, 'email')}
      value={credentials.email}
      />

      <label>Password:</label>
      <input
      type="password" 
      onChange={(e) => handleCredentialChange(e, 'password')}
      value={credentials.password}
      />
      <button disabled={isLoading}> Sign Up </button>
      {error && <div className="error"> {error} </div>}
      {success && <div className="success-signup">Sign up successful!</div>}
    </form>
  )
}

export default Signup