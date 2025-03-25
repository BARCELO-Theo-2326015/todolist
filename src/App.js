import React, { useState, useEffect } from 'react';
import { TaskFinishedStates } from './data/Task';

import Header from './layout/Header';
import Footer from './layout/Footer';

import Task from './components/Task';
import Category from './components/Category';

import useDataSystem from './data/DataSystem.js';

import Popup from './components/Popup';

import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [current, setCurrent] = useState({});

  const togglePopup = (edit, current) => {
    setIsEditMode(edit);
    setCurrent(current);
    setIsPopupOpen(!isPopupOpen);
  };

  const { categories, tasks, mode, setMode, removeTask,
    addTask, editTask, addCategory, removeCategory, editCategory
  } = useDataSystem();

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortedTasks, setSortedTasks] = useState(filteredTasks);

  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'creationDate', direction: 'ascending' });

  useEffect(() => {
    setFilteredTasks(tasks.filter(
      (task) => {
        if (filters.category && task.category !== filters.category) {
          return false;
        }
        if (filters.state && task.state !== filters.state) {
          return false;
        }
        if (filters.title && !task.title.toLowerCase().includes(filters.title.toLowerCase())) {
          return false;
        }
        if (filters.isUrgent && task.isUrgent !== filters.isUrgent) {
          return false;
        }
        if (filters.isFinished === "false") {
          if(!TaskFinishedStates.includes(task.state)) {
            return false;
          }
        } else if (filters.isFinished === "true") {
          if(TaskFinishedStates.includes(task.state)) {
            return false;
          }
        }
        return true;
      }
    ));
  }, [tasks, filters]);

  useEffect(() => {
    if(!sortConfig) return;
    const sortedArray = [...filteredTasks];
    if(sortConfig.direction === 'ascending') {
      setSortedTasks(sortedArray.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return -1;
        if (a[sortConfig.key] > b[sortConfig.key]) return 1;
        return 0;
      }));
    } else if(sortConfig.direction === 'descending') {
      setSortedTasks(sortedArray.sort((a, b) => {
        if (a[sortConfig.key] > b[sortConfig.key]) return -1;
        if (a[sortConfig.key] < b[sortConfig.key]) return 1;
        return 0;
      }));
    }
    console.log('sortedTasks', sortConfig.key, sortConfig.direction);
    sortedArray.forEach(element => {
      console.log(element[sortConfig.key]);
    });
  }, [filteredTasks, sortConfig]);

  return (
    <div className="App">
      <Header data={{task: sortedTasks, category: categories}} mode={mode} filters={filters} setFilters={setFilters} setSortConfig={setSortConfig} />
      <div className="main">
        {mode === 'category' ? (
          categories.map((category) => (
            <Category category={category}
              removeCategory={() => removeCategory(category.title)}
              editCategory={() => togglePopup(true, category)}
            />
          ))
        ) : mode === 'task' && (
          sortedTasks.map((task) => (
            <Task task={task}
              removeTask={() => removeTask(task.title)}
              editTask={() => togglePopup(true, task)}
            />
          ))
        )}
      </div>
      <Footer togglePopup={() => togglePopup(false)} setMode={setMode} mode={mode} />
      {isPopupOpen && (
        <Popup
          addCategory={addCategory}
          addTask={addTask}
          mode={mode}
          isEditMode={isEditMode}
          editTask={editTask}
          editCategory={editCategory}
          current={current}
          closePopup={() => togglePopup(false)}
        />
      )}
    </div>
  );
}

export default App;
