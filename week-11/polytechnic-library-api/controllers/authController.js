const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../config/dbConfig');

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    console.log('Received data:', { username, password, role }); // Debugging log

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');
        
        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        console.log('Generated salt:', salt); // Debugging log

        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password:', hashedPassword); // Debugging log

        await pool.request()
            .input('username', sql.VarChar, username)
            .input('passwordHash', sql.VarChar, hashedPassword)
            .input('role', sql.VarChar, role)
            .query('INSERT INTO Users (username, passwordHash, role) VALUES (@username, @passwordHash, @role)');

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');
        
        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { id: user.user_id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during user login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
