import express from 'express'
import { createUser, loginUser,todoCreate , getTodos, updateTodo, deleteTask, editTask, updateUser, getallUsers, getUserById} from '../controllers/index.js';

import { AuthMiddleware } from '../Middleware/Auth.js';

export const userRouter = express.Router();

userRouter.post("/register" ,createUser)

userRouter.post("/login" , loginUser)

userRouter.post("/todo" , AuthMiddleware, todoCreate)

userRouter.get("/tasks" , AuthMiddleware ,getTodos ) 

userRouter.patch("/:id/status",AuthMiddleware ,updateTodo)

userRouter.delete("/deleteTask/:id",AuthMiddleware, deleteTask)

userRouter.patch("/editTask/:id",AuthMiddleware,editTask)

userRouter.put("/updateUser",AuthMiddleware, updateUser)

userRouter.get("/getallUser",AuthMiddleware, getallUsers)

userRouter.get("/getuser/:id",AuthMiddleware, getUserById)