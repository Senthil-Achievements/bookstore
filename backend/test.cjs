const mongoose = require('mongoose');
const Book = require('./src/books/book.model');
require('dotenv').config();

async function run() {
    await mongoose.connect(process.env.DB_URL);
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    console.log(books.map(b => ({ title: b.title, cover: b.coverImage })));
    process.exit(0);
}
run();
