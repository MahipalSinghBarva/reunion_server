const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
require('dotenv').config();

const connectDB = require("./db/db")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express();

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "https://reunion-client-kappa.vercel.app"],
    credentials: true,
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/task", taskRoutes)

connectDB()

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is running"
    });
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server working on PORT: ${process.env.PORT}`)
})

