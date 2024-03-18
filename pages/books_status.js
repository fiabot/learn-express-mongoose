let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');
let BookInstance = require("../models/")
let Author = require('../models/author');

function get_books () {
  return BookInstance.find({status: {$eq: "available"}}, 'title author')
    .sort({title : 1})  // 1 indictes ascending order
    .populate('book')
    .populate("author");
}

async function get_avail_books (){
  try {
    let books = await get_books().exec();
    return books.map(function(b) {
      return b._id + ' : ' + b.title + ' : ' + Author(b.author).name;
    });
  }
  catch(err) {
    console.log('Could not get books ' + err);
  }
}

exports.show_all_books_status = function(res) {
  get_avail_books()
  .then((data) => res.send(data))
  .catch((_) => res.send('No books found'));
}