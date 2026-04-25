const express = require('express')
const router  = express.Router()
const Book    = require('../models/Book')

// GET /api/books  — return all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 })
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/books/:id  — return one book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: "Book not found" })
    res.json(book)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/books  — create a new book
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body)
    res.status(201).json(book)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT /api/books/:id  — update a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!book) return res.status(404).json({ message: "Book not found" })
    res.json(book)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/books/:id  — delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) return res.status(404).json({ message: "Book not found" })
    res.json({ message: "Book deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
