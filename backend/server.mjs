/* import https from "https";

import fs from "fs";

//import app from "./app.mjs";

const PORT =3000;

const server = https.createServer({
    key:fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')

})

server.listen(PORT); */

import https from "https";
import http from "http";
import fs from "fs";
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import express from "express";
import cors from "cors";

const PORT = 3001;
const app = express();

const options ={
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

app.use(cors());
app.use(express.json());

app.use((reg, res, next)=>
{
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();

})

app.use("/post", posts);
app.route("/post",posts);
app.use("/user",users);
app.route("/user", users);

let server = https.createServer(options, app)
console.log(PORT)
server.listen(PORT);