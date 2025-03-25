import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import axios from "axios";
import { X } from "lucide-react"; 
import { axiosInstance } from "../utils/axios.js";


const BASE_URL = import.meta.env.MODE === "development" ?"http://localhost:4004" : "/";

const TaskInput = ({ close }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Indoor");
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!task.trim()) return; 

    try {
        const res = await axiosInstance.post(
            "/api/tasks",
            { text: task, priority, category },
            { withCredentials: true }
        );

        dispatch(addTask(res.data)); 
        setTask(""); 
        setPriority("Medium");
        close();
    } catch (error) {
        console.error("Error adding task:", error.message);
    }
};


  return (
    <div className="fixed bottom-20 right-6 bg-gray-800 text-white p-6 rounded-xl shadow-xl w-96">
      <button onClick={close} className="absolute top-3 right-3 text-gray-400 hover:text-white">
        <X size={20} />
      </button>

      <h2 className="text-lg font-bold mb-4">📝 Add New Task</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-3 mt-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="High" className="text-red-500">🔥 High</option>
        <option value="Medium" className="text-orange-400">⚠️ Medium</option>
        <option value="Low" className="text-yellow-400">🟡 Low</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 mt-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Outdoor" className="text-blue-500">🌳 Outdoor</option>
        <option value="Shopping" className="text-pink-500">🛍️ Shopping</option>
        <option value="Gym" className="text-green-500">💪 Gym</option>
        <option value="Meeting" className="text-purple-500">📅 Meeting</option>
        <option value="Indoor" className="text-yellow-500">🏡 Indoor</option>

      </select>
      <button
        onClick={handleAddTask}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg shadow-md font-semibold transition duration-300"
      >
        ➕ Add Task
      </button>
    </div>
  );
};

export default TaskInput;
