import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave }) => {

    //Ici j'initialise la valeur des input nom et description
    const [name, setName] = useState(task ? task.name : '');
    const [description, setDescription] = useState(task ? task.description : '');

    //handleSubmit est la fonction que j'appelle lors de la soumition du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description) {
        onSave({ ...task, name, description }); //cette ligne permet à la fois de gerer l'ajout et la modification
        setName(''); //ici j'efface le contenu des inputs 
        setDescription('');
        }
    };

    useEffect(() => {
        if (task) {
        setName(task.name);
        setDescription(task.description);
        }
    }, [task]);

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom de la tâche" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Enregistrer</button>
        </form>
    );
}

export default TaskForm;
