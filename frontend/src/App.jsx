import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";


const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter basename="/">
        <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<Home />} />

            <Route path="/register" element={<Register />} />

            <Route path="/" element={isAuthenticated ? (
              <div>
                <TaskInput />
                <TaskList />
              </div>
            ) : <Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
  );
};

export default App;
