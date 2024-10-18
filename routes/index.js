import express from 'express'
import { createUser, loginUser } from '../controllers/index.js';

export const userRouter = express.Router();

userRouter.post("/register" ,createUser)

userRouter.post("/login" , loginUser)