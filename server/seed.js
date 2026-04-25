require('dotenv').config()
const mongoose = require('mongoose')
const Book     = require('./models/Book')

const books = [
  { title: 'The Great Gatsby',      author: 'F. Scott Fitzgerald', genre: 'Classic',        year: 1925, description: 'A story of wealth, love, and the American Dream in the 1920s.' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee',          genre: 'Classic',        year: 1960, description: 'A young girl witnesses racial injustice in the American South.' },
  { title: 'Dune',                  author: 'Frank Herbert',       genre: 'Science Fiction', year: 1965, description: 'An epic tale of politics, religion, and ecology on a desert planet.' },
  { title: '1984',                  author: 'George Orwell',       genre: 'Dystopian',      year: 1949, description: 'A chilling vision of a totalitarian society under constant surveillance.' },
  { title: 'Pride and Prejudice',   author: 'Jane Austen',         genre: 'Classic',        year: 1813, description: 'A witty romance exploring manners and marriage in Regency England.' },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  await Book.deleteMany({})
  await Book.insertMany(books)
  console.log('Database seeded successfully')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
