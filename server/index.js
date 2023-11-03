/* PACKAGE IMPORTS*/
import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

/* LOCAL MODULE IMPORTS*/
import { register } from "./controllers/auth.js"
import { authRouter } from "./routes/auth.js"
import { userRouter } from "./router/user.js"
import { postRouter } from "./router/post.js"
import { verifyToken } from "./middlewares/auth.js"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(bodyParser.json({limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "/public/assets")))

/* FILE STORAGE - to be edited and modularized */
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })
const PORT = process.env.PORT || 6001

/* CONNECTING TO THE MONGODB DATABASE */
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
}).catch((error)=> console.log(error, "\ncouldn't connect to the database."))

/* FILE RELATED ROUTES */
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost )

/* REGULAR ROUTES*/
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)