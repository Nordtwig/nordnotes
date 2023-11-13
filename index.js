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

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is live on localhost:${port}`);
})