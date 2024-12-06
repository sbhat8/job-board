const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'java',
    password: 'password',
    database: 'final4370',
});

conn.connect((err) => {
    if (err) {
        console.log('Could not connect to the database:', err);
        return;
    }
    console.log('Connected to the database.');

    const users = [
        { username: 'employer', password: 'pass', role: 'employer' },
        { username: 'user', password: 'pass', role: 'user' },
        { username: 'admin', password: 'pass', role: 'admin' },
    ];

    const userQuery = 'INSERT INTO users (username, password, role) VALUES ?';
    const userValues = users.map((u) => [u.username, u.password, u.role]);

    conn.query(userQuery, [userValues], (err, result) => {
        if (err) {
            console.error('Error inserting users:', err);
            return;
        }
        console.log('Users seeded:', result.affectedRows);

        const employerUserId = result.insertId;

        const jobs = [
            { title: 'Software Developer', description: 'Develop and maintain software solutions.', company: 'Tech Corp', location: "Atlanta, GA", salary: "$90,000", created_by: employerUserId },
            { title: 'Graphic Designer', description: 'Create visual concepts and designs.', company: 'Design Studio', location: "Los Angeles, CA", salary: "$65,000", created_by: employerUserId },
            { title: 'Project Manager', description: 'Manage projects and teams effectively.', company: 'Business Solutions', location: "Seattle, WA", salary: "$120,000", created_by: employerUserId },
        ];

        const jobQuery = 'INSERT INTO jobs (title, description, company, location, salary, created_by) VALUES ?';
        const jobValues = jobs.map((j) => [j.title, j.description, j.company, j.location, j.salary, j.created_by]);

        conn.query(jobQuery, [jobValues], (err, result) => {
            if (err) {
                console.error('Error inserting jobs:', err);
                return;
            }
            console.log('Jobs seeded:', result.affectedRows);
            conn.end(); // Close the connection
        });
    });
});