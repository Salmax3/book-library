import { NavLink } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Navbar() {
  const { isLoggedIn, login, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="nav-brand">📚 Book Library</span>
      </div>

      <div className="nav-center">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/books/add">Add Book</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar