import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      "title": `Novo Projeto ${Date.now()}`,
      "owner": "undefined"
    });

    const project = response.data;

    if (project) {
      setProjects([...projects, project]);
    }
  }

  return (
    <>
      <Header title="Título 5" />
      
      <ul>
        {projects.map((project, index) => <li key={project.id}>{project.title}</li>)}
      </ul>
      
      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;
