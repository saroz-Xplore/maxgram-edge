import express from "express";
import dotenv from 'dotenv';
import { DatabaseConnect } from "./db/index.js";
import userRoutes from "./routes/user.routes.js";
const port = 8000
const app = express()
const hostname =  "127.0.0.1"


dotenv.config()

DatabaseConnect().then(() => {
    app.listen(port, hostname, () => {
        console.log(`Running on http://${hostname}:${port}`);
    })
}).catch((err) => {
    console.log("Error while connecting", err);
})

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))

app.use('/api/v1/auth',userRoutes)

app.get('/', (req, res) => {
    res.send('Hello everyone\', this is instagram home page')
})