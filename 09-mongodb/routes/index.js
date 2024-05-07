var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const { title } = require('process');
const Book = require('../models/book');

const url = 'mongodb+srv://mongo:mongoPassword@cluster.9scxjr4.mongodb.net/mongo'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find().lean();
    res.render('index', {items: books});
  } catch (error) {
    res.status(500).render('index', {error: error.message});
    console.log(error);
  }
});

router.post('/insert', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  const start = async() => {
    try {
      const book = new Book(item);
      book.save();
      console.log(book);
    } catch (error) {
      console.log(error);
      res.status(400).json(error.message);
    }
  }

  start();
  res.redirect('/');
});

router.get('/books/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const book = await Book.findById(req.params.id).lean();
    if (! book) {
      res.status(404).json({error: 'Book not found'});
    }
    res.render('show', {book: book});
  } catch(error) {
    res.status(400).json({error: 'Something went wrong'});
  }
});

router.put('/books/:id', async(req, res, next) => {
  console.log('hellooooooo');
  try {
    const bookId = req.params.id;
    let result = await Book.replaceOne({_id: bookId}, req.body, {new: true});
    res.json({'updatedBook': result});
  } catch (e) {
    res.status(500).json({error: 'Something went wrong' + e.message});
  }
});

router.delete('/books/:id', async(req, res, next) => {
  try {
    const bookId = req.params.id;
    let result = await Book.deleteOne({_id: bookId});
    res.json({'deletedBook': result});
  } catch (e) {
    res.status(500).json({error: 'Something went wrong' + e.message});
  }
});

module.exports = router;
