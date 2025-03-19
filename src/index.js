import express from "express";
import dotenv from 'dotenv';
import { DatabaseConnect } from "./db/index.js";
import cookieParser from 'cookie-parser'
import {userRoutes} from "./routes/user.routes.js";
import {postRoutes} from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js"
const port = 3000
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

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))

app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/comment', commentRoutes)
app.use('/api/v1/like', likeRoutes)

app.get('/', (req, res) => {
    res.send('Hello everyone')
})

