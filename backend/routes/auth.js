const express = require('express');
const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user: "java",
    password: "password",
    database: "final4370",
});

conn.connect(function (err) {
    if (err)
        console.log("Couldn't connect to MySQL on auth.js", err);
});

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    conn.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // we are storing plain text password, ideally we would hash it first
        conn.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, password, role || 'user'],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                return res.status(201).json({ message: 'User registered successfully.' });
            }
        );
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find user by username
    conn.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const user = results[0];

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        res.status(200).json({ message: 'Login successful.', user: req.session.user });
    });
});


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to log out.' });
        }

        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful.' });
    });
});

router.get('/session', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(200).json({ loggedIn: false });
    }
});


module.exports = router;