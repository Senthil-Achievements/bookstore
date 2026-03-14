const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./src/books/book.model');
const fs = require('fs');
const path = require('path');

async function seed() {
    try {
        console.log("Connecting to DB...", process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB successfully. Clearing old books...");
        await Book.deleteMany({});
        
        console.log("Reading frontend/public/books.json...");
        const jsonPath = path.join(__dirname, '../frontend/public/books.json');
        const fileData = fs.readFileSync(jsonPath, 'utf8');
        let parsedBooks = JSON.parse(fileData);
        
        // Remove _id from JSON so Mongoose generates a standard ObjectId
        parsedBooks = parsedBooks.map(book => {
            delete book._id;
            return book;
        });

        console.log("Inserting all original 20 books...");
        await Book.insertMany(parsedBooks);
        console.log("Seeding Success! Uploaded original 20 books.");
        process.exit(0);
    } catch (e) {
        console.error("Error Seeding Data", e);
        process.exit(1);
    }
}
seed();
