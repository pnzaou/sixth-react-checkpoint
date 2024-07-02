import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)}>Éditer</button>
      <button onClick={() => onDelete(task)}>Supprimer</button>
      <button onClick={() => onToggle(task)}>
        {task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
      </button>
    </div>
  );
}

export default TaskItem;
