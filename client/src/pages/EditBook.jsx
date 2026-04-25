import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getBookById, updateBook } from '../services/api'

function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch existing book data
  useEffect(() => {
    getBookById(id)
      .then(data => {
        setForm({
          title: data.title || '',
          author: data.author || '',
          genre: data.genre || '',
          year: data.year || '',
          description: data.description || ''
        })
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await updateBook(id, {
        ...form,
        year: Number(form.year)
      })

      
      navigate(`/books/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div>
      <Link to={`/books/${id}`}>← Back</Link>
      <h1>Edit Book</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />

        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />

        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <button type="submit">Update Book</button>
      </form>
    </div>
  )
}

export default EditBook