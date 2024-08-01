const express = require('express');
const app = express();


const database = require("./configs/database.configs");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const {PORT} = require('./utils/dotenvVariables');
const userRouter=require('./routers/Auth.Route');
const userMovie=require("./routers/Movie.Route")

database.connect();

// add middleware 

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credential: true,
    })
);


app.use("/api/v1/auth", userRouter);
app.use(`/api/v1/movie`,userMovie)
// app.use("/api/v1/profile", profileRouter);




app.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "Success running...Prabhatsaini"
    })
});
console.log(PORT,"adfadf")

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});