import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dbConf from "./db_config.json" assert { type: "json" };
import favicon from "serve-favicon";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: dbConf.database,
    password: dbConf.password,
    port: dbConf.port
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM book ORDER BY read_date DESC;");

    res.render("index.ejs", { books: result.rows });
});

app.get("/book", (req, res) => {
    res.render("book.ejs")
})

app.post("/book/add", async (req, res) => {
    const query = await db.query({
        text: "INSERT INTO book(title, author, cover_url, book_url, publication_year, format, read_date, rating, note) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        values: [req.body.title, req.body.author, req.body.cover_url, req.body.book_url, req.body.publication_year, req.body.format, req.body.read_date, req.body.rating, req.body.note]
    });
    
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server is live on localhost:${port}`);
})