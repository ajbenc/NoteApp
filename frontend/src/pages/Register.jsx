import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Username might be taken.')
      console.log(err);
      
    }
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Security Question</label>
          <input
            type="text"
            className="form-control"
            value={formData.securityQuestion}
            onChange={(e) => setFormData({...formData, securityQuestion: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Security Answer</label>
          <input
            type="text"
            className="form-control"
            value={formData.securityAnswer}
            onChange={(e) => setFormData({...formData, securityAnswer: e.target.value})}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}