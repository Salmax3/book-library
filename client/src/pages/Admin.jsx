import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

function Admin() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { state: { fromRedirect: true } })
    }
  }, [isLoggedIn, navigate])

  return (
    <div id="center">
      <h1>Admin Page</h1>
      <p>Only visible if logged in.</p>
    </div>
  )
}

export default Admin