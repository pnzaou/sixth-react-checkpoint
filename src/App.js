import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); //J'initialise l'état de la liste de tache à afficher avec un tableau vide
  const [currentTask, setCurrentTask] = useState(null);

  //Dans ce useEffect j'utilise la méthode getItem de localstorage pour récupérer les taches stockées et les transforme en objet 
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  //Dans ce useEffect j'utilise la méthode setItem pour enregister les taches sous forme de chaîne de caractères JSON
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t))); //Ici je vérifie si la tache existe déjà dans un cas de modification
    } else {
      task.id = Date.now(); //Ici j'attribut la date de creation comme id
      setTasks([...tasks, task]); //j'utilise l'operateur spread pour faire une copie du tableau de tache dans laquelle j'ajoute la nouvelle tache
    }
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette tâche?')) {
      setTasks(tasks.filter((t) => t.id !== task.id)); //ici je supprime une tache en renvoyant un nouveau tableau avec les taches dont l'id est different de celui de la tache passé en parametre
    }
  };

  const handleToggleTask = (task) => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)) //ici dans le cas ou la tache est trouvée je modifie son attribut completed
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
