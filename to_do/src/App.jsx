import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React basics", completed: false },
    { id: 2, title: "Practice useState", completed: true },
    { id: 3, title: "Understand useEffect", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(tasks.filter(t => t.completed).length);
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const addTask = () => {
    if (!newTask) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  return (
    <div className="app-container">
      <h1 className="title">Task Manager</h1>

      <div className="input-section">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task" onClick={() => toggleTask(task.id)}>
            <div className={task.completed ? "checkbox checked" : "checkbox"} />
            <span className={task.completed ? "done" : ""}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>

      <div className="summary">
        Completed: {completedCount} / {tasks.length}
      </div>

      {completedCount === tasks.length && (
        <div className="all-done">🎉 All tasks completed!</div>
      )}
    </div>
  );
}

export default App;
