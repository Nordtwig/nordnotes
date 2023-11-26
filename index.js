import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dbConf from "./db_config.json" assert { type: "json" };
import favicon from "serve-favicon";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { log } from "console";

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
    res.render("book.ejs");
});

app.get("/book/edit", async (req, res) => {
    const book = await db.query({
        text: "SELECT * FROM book WHERE id=$1",
        values: [req.query.id]
    });
    res.render("book_edit.ejs", { book: book.rows[0] });
});

app.post("/book/add", async (req, res) => {
    console.log(req.body);
    const query = await db.query({
        text: "INSERT INTO book(title, author, cover_url, book_url, publication_year, format, read_date, rating, note) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        values: [req.body.title, req.body.author, req.body.cover_url, req.body.book_url, req.body.publication_year, req.body.format, req.body.read_date, req.body.rating, req.body.note]
    });
    res.redirect("/");
});

app.patch("/book/edit", async (req, res) => {
    console.log(req.body);
    const query = await db.query({
        text: "UPDATE book SET title = $2r, author = $3, cover_url = $4, book_url = $5, publication_year = $6, format = $7, read_date = $8, rating = $9, note = $10 WHERE id=$1",
        values: [req.query.id, req.body.title, req.body.author, req.body.cover_url, req.body.book_url, req.body.publication_year, req.body.format, req.body.read_date, req.body.rating, req.body.note]
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is live on localhost:${port}`);
})