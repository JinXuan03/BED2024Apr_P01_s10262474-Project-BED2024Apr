const sql = require('mssql');

class Book {
  static async getAllBooks() {
    try {
      const pool = await sql.connect();
      const result = await pool.request().query('SELECT * FROM Books');
      await pool.close();
      return result.recordset.map(record => new Book(record));
    } catch (error) {
      throw new Error('Error retrieving books');
    }
  }

  constructor({ id, title, author, availability }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.availability = availability;
  }
}

module.exports = Book;
