const express = require('express');
const { getAllBooks, updateBookAvailability } = require('../controllers/bookController');
const { verifyJWT, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/books', verifyJWT, authorizeRole(['member', 'librarian']), getAllBooks);
router.put('/books/:bookId/availability', verifyJWT, authorizeRole(['librarian']), updateBookAvailability);

module.exports = router;
