const { poolPromise, sql } = require('../config/dbConfig');

const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send('Error retrieving books');
  }
};



exports.updateBookAvailability = async (req, res) => {
    const { bookId } = req.params;
    const { availability } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('bookId', sql.Int, bookId)
            .input('availability', sql.Char, availability)
            .query('UPDATE Books SET availability = @availability WHERE book_id = @bookId');

        res.status(200).json({ message: 'Book availability updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
