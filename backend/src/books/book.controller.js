const Book = require("./book.model");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getLocalBooks = () => {
    try {
        const jsonPath = path.join(__dirname, '../../../frontend/public/books.json');
        const fileData = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(fileData);
    } catch (e) {
        console.error("Failed to read local books.json", e);
        return [];
    }
}

const postABook = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).send({message: "Database is offline. Cannot create book."});
        }
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
    }
}

const getAllBooks =  async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("DB not connected, serving from local JSON.");
            return res.status(200).send(getLocalBooks());
        }
        const books = await Book.find().sort({ createdAt: -1});
        res.status(200).send(books)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({message: "Failed to fetch books"})
    }
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        if (mongoose.connection.readyState !== 1) {
            console.log("DB not connected, serving from local JSON.");
            const books = getLocalBooks();
            const book = books.find(b => b._id.toString() === id);
            if (!book) return res.status(404).send({message: "Book not Found!"});
            return res.status(200).send(book);
        }
        const book =  await Book.findById(id);
        if(!book){
            return res.status(404).send({message: "Book not Found!"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})
    }
}

const UpdateBook = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).send({message: "Database is offline. Cannot update book."});
        }
        const {id} = req.params;
        const updatedBook =  await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook) {
            return res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({message: "Failed to update a book"})
    }
}

const deleteABook = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).send({message: "Database is offline. Cannot delete book."});
        }
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            return res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}