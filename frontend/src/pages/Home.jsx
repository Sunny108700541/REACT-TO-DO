import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearTasks, removeTask, updateTaskStatus } from '../redux/taskSlice';
import { Plus, Trash2 } from "lucide-react";
import TaskInput from '../components/TaskInput';
import { logout } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { axiosInstance } from "../utils/axios.js";


const BASE_URL = import.meta.env.MODE === "development" ?"http://localhost:4004" : "/";

const Home = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const navigate = useNavigate();

    const [showTaskInput, setShowTaskInput] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [quoteData, setQuoteData] = useState({});
    

    const fetchWeather = async (cityName) => {
        try {
            const res = await axiosInstance.get(`/api/weather/${cityName}`);
            setWeatherData(res.data);
        } catch (error) {
            console.error("Error fetching weather:", error.message);
        }
    };

    const fetchQuote = async (taskId) => {
        try {
            const res = await axiosInstance.get("/api/quote");
            setQuoteData(prevQuotes => ({
                ...prevQuotes,
                [taskId]: res.data 
            }));
        } catch (error) {
            console.error("Error fetching quote:", error.message);
        }
    };

    const getTasks = async () => {
        try {
            const res = await axiosInstance.get("/api/tasks", { withCredentials: true });
            dispatch(addTask(res.data));

            if (res.data.some(task => task.category === "Outdoor")) {
                fetchWeather("Chandigarh");
            }

            res.data
                .filter(task => task.category === "Indoor") 
                .forEach(task => fetchQuote(task._id)); 

        } catch (error) {
            console.error("Error fetching tasks:", error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axiosInstance.delete(`/api/tasks/${taskId}`, { withCredentials: true });
    
            dispatch(removeTask(taskId)); 
            
        } catch (error) {
            console.error("Error deleting task:", error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
            dispatch(logout());
            return navigate("/login");
        } catch (error) {
            console.log("error : ", error.message);
        }
    };
    

    useEffect(() => {
        if (tasks.length === 0) {
            dispatch(clearTasks());
            getTasks();
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="w-full bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center rounded-lg mb-6">
                <h2 className="text-2xl font-bold">📝 Task Manager</h2>

                <button 
                    onClick={handleLogout} 
                    className="flex flex-col items-center gap-1 px-3 py-2 bg-red-600 text-white 
                            font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300"
                >
                    <LogOut className="w-5 h-5" /> 
                    <span className="text-xs font-light">Logout</span>
                </button>
            </div>




            <div className="max-w-2xl mx-auto">
                {tasks.length === 0 ? (
                    <p className="text-gray-400 text-center my-5">No tasks available.</p>
                ) : (
                    tasks
                        .slice()
                        .sort((a, b) => {
                            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                            return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
                        })
                        .map((task, index) => (
                            <div key={task._id || index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 shadow-lg">
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-semibold">{task.text}</h2>
                                    <button 
                                        onClick={() => handleDeleteTask(task._id)} 
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300"
                                    >
                                        <Trash2 className="w-5 h-5 text-white" />
                                    </button>

                                </div>

                                <p className="text-gray-400">
                                    Priority:  
                                    <strong className={` 
                                        ${task.priority === "High" ? "text-red-500" : ""} 
                                        ${task.priority === "Medium" ? "text-orange-400" : ""} 
                                        ${task.priority === "Low" ? "text-yellow-400" : ""} 
                                    `}>
                                        {" " + task.priority}
                                    </strong>
                                </p>

                                <div className="flex items-center justify-between mt-3">
                                    <span 
                                        className={`px-0 py-1 text-lg rounded-full font-semibold flex items-center gap-2
                                            ${
                                                task.completed 
                                                    ? "text-gray-500" 
                                                    : task.category === "Outdoor" ? "text-blue-500" 
                                                    : task.category === "Shopping" ? "text-pink-500" 
                                                    : task.category === "Gym" ? "text-green-500" 
                                                    : task.category === "Meeting" ? "text-purple-500" 
                                                    : task.category === "Indoor" ? "text-yellow-500" 
                                                    : "text-gray-500"
                                            }
                                        `}
                                    >
                                        {task.category === "Outdoor" && "🌳 "}  
                                        {task.category === "Shopping" && "🛍️ "}  
                                        {task.category === "Gym" && "💪 "}  
                                        {task.category === "Meeting" && "📅 "}  
                                        {task.category === "Indoor" && "🏡 "}  
                                        {task.category}
                                    </span>

                                    <button 
                                        onClick={() => dispatch(updateTaskStatus({ taskId: task._id, completed: !task.completed }))}
                                        className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md 
                                            ${task.completed ? "bg-green-600 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-500"}
                                        `}
                                    >
                                        {task.completed ? "Completed" : "Mark as Complete"}
                                    </button>
                                </div>

                                
                                {task.category === "Outdoor" && weatherData && (
                                    <div className="mt-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-center">
                                        <h3 className="text-lg font-semibold mb-2">🌤️ Weather Info</h3>
                                        <div className="flex justify-between">
                                            <p>🌡️ Temp. : {weatherData.temperature} °C</p>
                                            <p>🌥️ Weather : {weatherData.weather}</p>
                                        </div>
                                    </div>
                                )}

                                
                                {task.category === "Indoor" && quoteData[task._id] && (
                                    <div className="mt-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-center">
                                        <h3 className="text-lg font-semibold mb-2">📜 Quote of the Day</h3>
                                        <p className="italic">"{quoteData[task._id]}"</p>
                                    </div>
                                )}
                            </div>
                        ))
                )}
            </div>

            <button 
                onClick={() => setShowTaskInput(true)} 
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white 
                        px-3 py-4 rounded-full shadow-lg flex items-center 
                        transition-all duration-300 group w-12 hover:w-36 overflow-hidden"
            >
                <Plus className="w-6 h-6 transition-all duration-300 flex-shrink-0" />
                <span className="ml-2 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 whitespace-nowrap">
                    Add Task
                </span>
            </button>

            {showTaskInput && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <TaskInput close={() => setShowTaskInput(false)} />
                </div>
            )}
        </div>
    );
};

export default Home;
