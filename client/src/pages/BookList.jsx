import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllBooks } from '../services/api'

function BookList() {
  const [books, setBooks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [searchParams]        = useSearchParams()
  const query = searchParams.get('search') || ''

  useEffect(() => {
    getAllBooks()
      .then(data => setBooks(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading books...</p>
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>

  const filtered = query
    ? books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
      )
    : books

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{query ? `Results for "${query}"` : 'All Books'}</h1>
        <Link to="/books/add">          {/* ← ADD THIS LINK */}
          <button>+ Add New Book</button>
        </Link>
      </div>
      {filtered.length === 0 && <p>No books found.</p>}
      <ul className="book-list">
        {filtered.map(book => (
          <li key={book._id} className="book-card">
            <Link to={`/books/${book._id}`}>
              <h2>{book.title}</h2>
            </Link>
            <p>{book.author} · {book.genre} · {book.year}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList