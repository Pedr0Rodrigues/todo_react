import React, { useState } from "react";
import TaskItem from "../components/TaskItem";

export default function TodoList() {
  const initialTasks = [
    {
      id: 1,
      title: 'Acordar',
      completed: true,
    },
    {
      id: 2,
      title: 'Entregar',
      completed: true,
    },
    {
      id: 3,
      title: 'Apresentar',
      completed: false,
    },   
    {
      id: 4,
      title: 'Commitar',
      completed: false,
    },    
    {
      id: 5,
      title: 'Fazer o PR',
      completed: false,
    },


  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [newTitleTask, setNewTitleTask] = useState("");
  const [searchInput, setSearchInput] = useState("");


  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddNewTask();
    }
  };
  
  const handleNewTitleChange = (e) => {
    setNewTitleTask(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: new Date().getTime(),
      title: newTitleTask,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTitleTask("");
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const searchList = () => {
    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchInput.toLowerCase()) &&
        task.completed === false
    );
  
    return (
      <div>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="container">
      <p>
        <label htmlFor="new-task">Add Item</label>
        <input
          data-testid="newTaskTitle"
          id="new-task"
          type="text"
          value={newTitleTask}
          onChange={handleNewTitleChange}
          onKeyUp={handleEnterKeyPress} 
        />
        
        <button onClick={handleAddNewTask}>Add</button>
      </p>
      <h3>Todo</h3>
      <ul id="incomplete-tasks">
      <input
          id = "seach-task"
          type="search"
          placeholder="Search here your incomplete tasks!"
          onChange={handleSearch}
          value={searchInput}/>
          {searchList()}
      </ul>
      <h3>Completed</h3>
      <ul id="completed-tasks">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
};
