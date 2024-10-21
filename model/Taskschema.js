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
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  taskID: {
    type: String,
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
