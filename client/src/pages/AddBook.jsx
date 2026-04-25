import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBook } from '../services/api'
{/* AddBook form — Lab 12 update */}
function AddBook() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', author: '', genre: '', year: '', description: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createBook({ ...form, year: Number(form.year) })
      navigate('/books')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Add New Book</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <div style={{ marginBottom: '12px' }}>
          <label>Title<br />
            <input name="title" value={form.title} onChange={handleChange} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Author<br />
            <input name="author" value={form.author} onChange={handleChange} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Genre<br />
            <input name="genre" value={form.genre} onChange={handleChange} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Year<br />
            <input name="year" type="number" value={form.year} onChange={handleChange} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Description<br />
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ width: '100%' }} />
          </label>
        </div>
        <button onClick={handleSubmit} style={{ marginRight: '8px' }}>Add Book</button>
        <button onClick={() => navigate('/books')}>Cancel</button>
      </div>
    </div>
  )
}

export default AddBook