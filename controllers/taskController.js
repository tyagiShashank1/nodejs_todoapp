import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskModel.js";

//get all tasks
export const getAllTasks = async (req, res,next) => {
  try {
    const tasks = await Task.find({ user: req.user });
  res.json({ message: "Tasks fetched successfully", tasks });
    
  } catch (error) {
    next(error);
  }
};

//create task
export const createTask = async (req, res) => {
try {
    const { title, description } = req.body;
  const task = await Task.create({
    title: title,
    description: description,
    user: req.user,
  });
  res.json({ message: "Task Added Successfully", task });
} catch (error) {
  next(error);
}
};

//update task
export const updateTask = async (req, res,next) => {
  try {
    const { id } = req.params;
  const task = await Task.findById(id);
  if(!task) return next(new ErrorHandler("Error: Task Not Found for Updation ",404));
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.json({ message: "Task Updated Successfully", task });
  } catch (error) {
    next(error);
  }
};

//delete task
export const deleteTask = async (req, res,next) => {
  try {
    const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    //CALLING ERROR HANDLING MIDDLEWARE SETUP IN app.js
    next(new ErrorHandler("Error: Task Not Found for Deletion ",404));
  }
  await task.deleteOne();
  res.json({ message: "Task Deleted Successfully", task });
  } catch (error) {
    next(error)
  }
};
