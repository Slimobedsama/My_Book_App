const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;