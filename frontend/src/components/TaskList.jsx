import { useSelector, useDispatch } from "react-redux";
import { removeTask } from "../redux/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span>{task.text} - {task.priority}</span>
          <button onClick={() => dispatch(removeTask(task.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
