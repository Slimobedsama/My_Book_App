const Book = require('../model/booksModel');

exports.all = async(req, res)=> {
    try {
        const allBooks = await Book.find().sort({author: 'asc'});
        return res.status(200).json(allBooks);
    } catch (err) {
        return res.status(500).json({errors: err.message});
    }
}

exports.home = (req, res)=> {
    res.render('../views/books/index', {title: 'HomePage'});
};

exports.create = async(req, res)=> {
    const {author, title, genre, summary, price, releaseYear} = req.body;
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({message: 'Book Created Successfully...', newBook});
    } catch (err) {
        res.status(400).json({errors: err.message});
        console.log(err);
    }
}

exports.getSearch = async(req, res)=> {
    const {query} = req.query;
    try {
       const book = await Book.findOne({genre: query});
       if(!book) {
        return res.json({message: 'Book not found'})
       }
       return res.json({message: 'Book found'})
    } catch (err) {
        console.log(err.message)
        res.status(404).json({errors: err.message})
    }
    // next();
}

exports.getOne = async(req, res, next)=> {
    const id = req.params.id;
    try {
        const oneBook = await Book.findById(id);
        if(!oneBook) {
            throw new Error('Book does not exists')
        }
        res.status(200).json({message: 'Successful', oneBook});
    } catch (err) {
        res.status(400).json({errors: err.message})
    }
    next();
}