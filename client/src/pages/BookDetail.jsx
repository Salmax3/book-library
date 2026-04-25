import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBookById, deleteBook } from '../services/api'

function BookDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [book, setBook]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getBookById(id)
      .then(data => setBook(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return (
    <div>
      <p style={{ color: 'red' }}>Error: {error}</p>
      <Link to="/books">← Back to list</Link>
    </div>
  )

  const handleDelete = async () => {
    if (!window.confirm('Delete this book?')) return
    try {
      await deleteBook(id)
      navigate('/books')
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    }
  }

  const handleUpdate = () => {
    navigate(`/books/edit/${id}`)
  }

  return (
    <div className="book-detail">
      <Link to="/books">← Back to list</Link>

      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Description:</strong> {book.description}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button
          onClick={handleUpdate}
          style={{
            color: 'white',
            background: '#2563eb',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Update Book
        </button>

        <button
          onClick={handleDelete}
          style={{
            color: 'white',
            background: '#f10707ff',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Delete Book
        </button>
      </div>
    </div>
  )
}

export default BookDetail