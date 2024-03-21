const Book = require('../model/booksModel');



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

exports.all = async(req, res)=> {
    try {
        const allBooks = await Book.find().sort({author: 'asc'});
        return res.status(200).json(allBooks);
    } catch (err) {
        return res.status(500).json({errors: err.message});
    }
}


exports.getOne = async(req, res, next)=> {
    const id = req.params.id;
    try {
        const oneBook = await Book.findById(id);
        if(!oneBook) {
            throw new Error('Book does not exists')
        }
        res.status(200).json({message: 'Successful', data: oneBook});
    } catch (err) {
        res.status(404).json({errors: err.message})
    }
    next();
}

exports.search = async(req, res)=> {
    const { author, title, genre } = req.query;
    try {
        let searchIndex;
        if(author) {
            searchIndex = await Book.find({ author });
            if(searchIndex.length === 0) {
                throw new Error('Author not found')
            }
        } else if(title) {
            searchIndex = await Book.find({ title });
            if(searchIndex.length === 0) {
                throw new Error('Title not found')
            }
        } else if(genre) {
            searchIndex = await Book.find({ genre });
            if(searchIndex.length === 0) {
                throw new Error('Genre not found')
            }
        }
        res.status(200).json({ message: 'Success', data: searchIndex });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ error: err.message });
    }
}

//TEMPLATE RENDERING LOGIC
exports.home = (req, res)=> {
    res.render('../views/books/index', {title: 'HomePage'});
};