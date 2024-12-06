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
        console.log("Couldn't connect to MySQL on jobs.js", err);
});

const router = express.Router();

router.get('/', (req, res) => {
    conn.query('SELECT * FROM jobs ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    conn.query('SELECT * FROM jobs WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json(results[0]);
    });
});

router.post('/', isAuthenticated, (req, res) => {
    const { title, description, location, company, salary } = req.body;
    const created_by = req.session.user.id;

    if (!title || !description || !location || !company || !salary || !created_by) {
        return res.status(400).json({ message: 'Missing fields.' });
    }

    const query = 'INSERT INTO jobs (title, description, location, company, salary, created_by) VALUES (?, ?, ?, ?, ?, ?)';
    conn.query(query, [title, description, location, company, salary, created_by], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
        res.status(201).json({ message: 'Job created successfully.', id: results.insertId });
    });
});

router.put('/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const { title, description, location, company, salary } = req.body;

    const query = 'UPDATE jobs SET title = ?, description = ?, location = ?, company = ?, salary = ? WHERE id = ?';
    conn.query(query, [title, description, location, company, salary, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ message: 'Job updated successfully.' });
    });
});

router.delete('/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;

    conn.query('DELETE FROM jobs WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ message: 'Job deleted successfully.' });
    });
});

function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Please log in first.' });
    } else if (req.session.user.role !== "employer") {
        return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
}

module.exports = router;