import React from 'react'
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { use, useState } from "react";
import complete_task from "../assets/complete_task.png";
import { axiosInstance } from "../utils/axios.js";


const BASE_URL = import.meta.env.MODE === "development" ?"http://localhost:4004" : "/";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username , setUsername] = useState("sunny");
    const [password , setPassword] = useState("#Sunny123");

    const handleRegister = async () => {
        try {
            const res = await axiosInstance.post("/api/auth/register", { username, password }, { withCredentials: true });
    
            dispatch(login(res.data.data));
            console.log("data : ", res.data.data);
    
            navigate("/home");
        } catch (error) {
            console.log("error : ", error.message);
        }
    };
    

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 py-6 gap-10">

            <div className="flex flex-col justify-center items-center text-2xl md:text-3xl font-bold text-white">
                <h2>📝 Task Manager</h2>
                <img src={complete_task} alt="Todo Icon" className="max-w-xs md:max-w-sm h-auto" />
            </div>
    
            <fieldset className="w-full max-w-sm md:max-w-md bg-base-200 border border-base-300 p-6 rounded-lg shadow-lg">
                <legend className="text-lg font-semibold mb-2">Register</legend>
                
                <label className="block text-sm font-medium mb-1">Username</label>
                <input 
                    type="text" 
                    className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                
                <label className="block text-sm font-medium mt-3 mb-1">Password</label>
                <input 
                    type="password" 
                    className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button 
                    className="btn w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 mt-4 rounded-md transition duration-300"
                    onClick={handleRegister}
                >
                    Register
                </button>
    
                <div className="flex justify-center mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline text-sm">
                        Already have an account? Login.
                    </Link>
                </div>
            </fieldset>
        </div>
    );
    
    
}

export default Register