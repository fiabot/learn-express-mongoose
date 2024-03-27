import {santizeInput} from "./utils";
let Book = require('../models/book');
let Author = require('../models/author');
let Genre = require('../models/genre');

function getAuthor(family_name, first_name) {
  family_name = santizeInput(family_name); 
  first_name = santizeInput(first_name); 

  if (family_name != null && first_name != null){
    return Author.findOne({family_name: family_name, first_name: first_name});
  }else{
    return null;
  }

}

function getGenre(name) {
  name = santizeInput(name); 
  if (name != null){
    return Genre.find({name: name});
  }else{
    return null; 
  }
  
}

exports.new_book = async (res, family_name, first_name, genre_name, title) => {

  let author = await getAuthor(family_name, first_name).exec();
  let genre = await getGenre(genre_name).exec();

  if (author != null && genre != null){
    let book = Book({
      title: title,
      summary: 'Demo Summary to be updated later',
      author: author,
      isbn: 'ISBN2022',
      genre: genre
    });
    await book.save();
    res.send('Created new book : ' + book);
  }else{
    return res.status(400).send('Invalid input format');
  }

}
