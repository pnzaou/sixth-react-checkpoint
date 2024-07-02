import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      task.id = Date.now();
      setTasks([...tasks, task]);
    }
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette tâche?')) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
  };

  const handleToggleTask = (task) => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="App">
      <h1>Liste de Tâches</h1>
      <TaskForm task={currentTask} onSave={handleSaveTask} />
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
      />
    </div>
  );
}

export default App;
