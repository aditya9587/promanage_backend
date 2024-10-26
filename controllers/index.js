import { userData } from "../model/userSchema.js";
import { todoData } from "../model/Taskschema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const userExist = await userData.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const checkPassword = password === confirmPassword;
    if (!checkPassword) {
      return res.status(400).json({ message: "password not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new userData({ name, email, password: hashedPassword });
    await data.save();
    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req,res)=>{
  try {
    const{ email,password } = req.body;
    const userCheck = await userData.findOne({email})
    if(!userCheck){
      return res.status(400).json({message:"user not exist"})
    }
    const verifyPassword = await bcrypt.compare(password, userCheck.password)
    if(!verifyPassword){
      return res.status(400).json({message:" invalid credtinals "})
    }
    const payload = {key : userCheck._id }
    const token = jwt.sign(payload, process.env.SECRETKEY)
    return res.status(200).json({message:"user login successfull", Token: token})
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const todoCreate = async(req,res) =>{
  try {
    const{title, priority , checklist , dueDate} = req.body;
    const { user } = req;
    const data = new todoData({title,priority,checklist,dueDate, taskID : user })
    console.log(data)
    await data.save();
    return res.status(200).json({message : "todo created Sucessfully",datamsg : data})
 
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" });
  }

}

export const getTodos =  async (req,res) =>{
  try {
    const data  = await todoData.find({ taskID: req.user });
    return res.status(200).json({ data})
  } catch (error) {
    console.log(error)
  }
}

export const updateTodo = async (req, res) =>{
  const { id } = req.params;
  const {status} = req.body
  if (!id || !status) {
    return res.status(400).json({ message: "Invalid request. Task ID and status are required." });
  }
  try {
    const updatedTask = await todoData.findByIdAndUpdate(id, {status },{new:true})
    res.status(200).json({ data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
}

export const deleteTask = async (req,res) =>{
  const { id } = req.params;
  try {
    const deleteTask = await todoData.findByIdAndDelete(id);
    res.status(200).json({deleteTask})
  } catch (error) {
    res.status(500).json({message: "Error deleting task Status"})
  }
}

export const updateEmail = async (req, res) =>{
  const { email } = req.params;
  const update = await userData.find(email)
  

}