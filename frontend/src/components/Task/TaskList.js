import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, categoryId };
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle('');
      setDescription('');
      setCategoryId('');
      setTasks([...tasks, newTask]); // Ajouter la nouvelle tâche à la liste des tâches
    } catch (error) {
      console.error('Erreur lors de la création de la tâche', error);
    }
  };

  return (
    <div>
      <h2>Mes Tâches</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID de la catégorie"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <button type="submit">Créer une tâche</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.description}
            {/* Ajouter des boutons pour modifier et supprimer ici */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
