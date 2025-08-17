import express from "express";
import userRouter from '../routes/user.js'
import taskRouter from '../routes/task.js';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../middlewares/error.js";
import cors from "cors";



export const app = express();
export const port = 3002;

config({
    path:"./database/config.env",
});


//Using middlewares

// This line is IMPORTANT 👇
app.use(express.json());   // parses JSON bodies

app.use(cookieParser());

// If you also want to parse form-urlencoded data
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors({
    origin:[process.env.FRONTEND_URL ],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use("/users",userRouter);
app.use("/tasks",taskRouter);



//ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware)
 








//FLOW OF EXECTION
// Request comes in → goes through JSON parser, cookie parser, body parser →

// Then matched against routers /users or /tasks →

// If matched, goes to that router’s route handler.


// Any time you call next(err) inside your routes, Express will skip all normal middlewares and go directly to this one.

// Useful for centralized error handling.

//So in plain words:

// Middlewares run first → then routers handle requests → then if error occurs, errorMiddleware handles it.