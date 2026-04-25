import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const redirected = location.state?.fromRedirect

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/books?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div id="center">
      <h1>Welcome to the Book Library</h1>

      {redirected && (
        <p style={{ color: 'red' }}>
          You must log in to access the admin page.
        </p>
      )}

      <p>Discover and explore our collection of books.</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}

export default Home