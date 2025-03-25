import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.tasks = [...state.tasks, ...action.payload];
      } else {
        state.tasks.push(action.payload);
      }
    },
    
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
  
  
    updateTaskStatus: (state, action) => {
      const { taskId, completed } = action.payload;
      const task = state.tasks.find(task => task._id === taskId);
      if (task) {
          task.completed = completed;
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    clearTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem("tasks"); 
    }
  },
});

export const { addTask, removeTask, updateTaskStatus, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
