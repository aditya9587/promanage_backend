import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    enum: ["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"],
    require: true,
  },
  checklist: [
    {
      text: String,
      checked: {
        type: Boolean,
        default: false,
      },
    },
  ],
  status: {
    type: String,
    enum: ["backlog", "todo", "inProgress", "done"],
    default: "todo",
  },
  taskID: {
    type: mongoose.Schema.ObjectId,
    ref: "userData",
    require: true,
  },
  assignTo: {
    type: mongoose.Schema.ObjectId,
    ref: "userData",
  },
  dueDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const todoData = new mongoose.model("todoDatas", todoSchema);
