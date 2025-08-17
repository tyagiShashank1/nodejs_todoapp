import express from "express"
import { createTask,deleteTask,getAllTasks, updateTask } from "../controllers/taskController.js";
import { isAuthenticated } from "../controllers/userController.js";
const router = express.Router();


//get all tasks
router.get('/my',isAuthenticated, getAllTasks);

//add new task
router.post('/new',isAuthenticated, createTask);

 //update task
router.put('/:id',isAuthenticated, updateTask);

//delete task
router.delete('/:id',isAuthenticated, deleteTask);

export default router;





