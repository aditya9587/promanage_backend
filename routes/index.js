import express from 'express'
import { createUser, loginUser,todoCreate , getTodos, updateTodo, deleteTask} from '../controllers/index.js';
import { AuthMiddleware } from '../Middleware/Auth.js';

export const userRouter = express.Router();

userRouter.post("/register" ,createUser)

userRouter.post("/login" , loginUser)

userRouter.post("/todo" , AuthMiddleware, todoCreate)

userRouter.get("/tasks/" , AuthMiddleware ,getTodos ) 

userRouter.patch("/:id/status",AuthMiddleware ,updateTodo)

userRouter.delete("/deleteTask/:id",AuthMiddleware, deleteTask)