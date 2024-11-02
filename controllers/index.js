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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await userData.findOne({ email });
    if (!userDetails) {
      return res.status(400).json({ message: "user not exist" });
    }
    const verifyPassword = await bcrypt.compare(password, userDetails.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: " invalid credtinals " });
    }
    const payload = {
      userId: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY);
    return res
      .status(200)
      .json({ message: "user login successfull", Token: token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const todoCreate = async (req, res) => {
  try {
    const { title, priority, checklist, dueDate, assignTo } = req.body;
    const { user } = req;
    let assignedUserId = null;

    // Check if `assignTo` contains an email and find the corresponding user
    if (assignTo) {
      const assignedUser = await userData.findOne({ email: assignTo });
      if (assignedUser) {
        assignedUserId = assignedUser._id;
      } else {
        return res.status(404).json({ message: "Assigned user not found in the database" });
      }
    }
    const data = new todoData({
      title,
      priority,
      checklist,
      dueDate,
      taskID: user,
      assignTo :assignedUserId,
    });
    console.log(data);
    await data.save();
    return res
      .status(200)
      .json({ message: "todo created Sucessfully", datamsg: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const data = await todoData.find({
      $or: [{ taskID: req.user }, { assignTo: req.user }],
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Invalid request. Task ID and status are required." });
  }
  try {
    const updatedTask = await todoData.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res.status(200).json({ data: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating task status", error });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await todoData.findByIdAndDelete(id);
    return res.status(200).json({ message: " Todo deleted sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task Status" });
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const updatedtask = req.body;
  try {
    const editTask = await todoData.findByIdAndUpdate(id, updatedtask, {
      new: true,
    });
    if (!editTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "TO do updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task Status" });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, oldpassword, newpassword } = req.body;
  try {
    const updateUser = await userData.findById(req.user);
    if (!updateUser) {
      return res.status(404).json({ message: "Email not found" });
    }

    const passwordVerify = await bcrypt.compare(
      oldpassword,
      updateUser.password
    );
    if (!passwordVerify) {
      return res.status(400).json({ message: "invalid password" });
    }
    const updatePassword = await bcrypt.hash(newpassword, 10);

    updateUser.password = updatePassword;
    updateUser.name = name;
    updateUser.email = email;

    await updateUser.save();
    return res.status(200).json({ message: " Email updated sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: " error updating in email " });
  }
};

export const getallUsers = async (req, res) => {
  try {
    const users = await userData.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "error getting all users" });
  }
} 