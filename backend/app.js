const express = require("express");
const session = require("express-session");
const cors = require('cors')
const mysql = require("mysql2");

const auth = require("./routes/auth");
const jobs = require("./routes/jobs");

const conn = mysql.createConnection({
  host: "localhost",
  user: "java",
  password: "password",
  database: "final4370",
});

conn.connect(function (err) {
  if (err)
    console.log("Couldn't connect to MySQL", err);
  else
    console.log("Database connection established");
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "random",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.use("/auth", auth);
app.use("/job", jobs);

app.listen(7000, () => {
  console.log("API is running on port 7000");
});