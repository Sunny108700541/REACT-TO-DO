import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["High", "Medium", "Low"], 
    default: "Medium" 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  category: { 
    type: String, 
    enum: ["Outdoor", "Shopping", "Gym", "Meeting", "Indoor"], 
    default: "Indoor" 
  },

});

export const Task = mongoose.model("Task", TaskSchema);
