import { useState, useEffect } from 'react';
import {Task, TaskState, TaskFinishedStates} from './Task';
import Category from './Category';
import Link from './Link';

const initialData = {
    tasks: [
        new Task('Task 1', new Date("2023-10-01"), TaskState.NOUVEAU, 'La tache numéro 1', false, new Date("2023-09-01")),
        new Task('Task 2', new Date("2023-10-02"), TaskState.REUSSI, 'Numero Dos', false, new Date("2023-09-02")),
        new Task('Task 3', new Date("2023-10-03"), TaskState.ABANDONNE, 'Tres', false, new Date("2023-09-03")),
    ],
    categories: [
        new Category('Work', '#FF0000', '💼', true),
        new Category('Personal', '#00FF00', '🏠', true),
        new Category('Urgent', '#0000FF', '⚠️', true),
    ],
    links: [
        new Link('Task 1', 'Work'),
        new Link('Task 2', 'Personal'),
        new Link('Task 3', 'Urgent'),
    ],
    mode: 'task'
};

function getData() {
    const tasks =
        JSON.parse(localStorage.getItem('tasks'))
        ?.map(task =>
            new Task(
                task.title,
                new Date(task.dueDate),
                task.state,
                task.description,
                task.isUrgent
            )
        ) ?? initialData.tasks;
    const categories =
        JSON.parse(localStorage.getItem('categories'))
        ?.map(category =>
            new Category(
                category.title,
                category.color,
                category.emoji,
                category.isActive
            )
        ) ?? initialData.categories;
    const links =
        JSON.parse(localStorage.getItem('links'))
        ?.map(link =>
            new Link(
                link.task,
                link.category
            )
        ) ?? initialData.links;
    const mode = localStorage.getItem('mode') ?? initialData.mode;
    return { tasks, categories, mode, links };
}

function setData(tasks, categories, mode) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('mode', mode);
}

function importData(json) {
    const importedTasks = json.taches.map(tache => 
        new Task(
            tache.title,
            new Date(tache.date_echeance),
            tache.etat,
            tache.description,
            tache.urgent,
            tache.date_creation
        )
    );

    const importedCategories = json.categories.map(categorie => 
        new Category(
            categorie.title,
            categorie.color,
            categorie.icon,
            categorie.actif
        )
    );

    const importedLinks = json.relations.map(relation =>
        new Link(
            relation.tache,
            relation.categorie
        )
    );

    return { tasks: importedTasks, categories: importedCategories, links: importedLinks };
}

export default function useDataSystem() {
    const data = getData();

    const [tasks, setTasks] = useState(data.tasks ?? initialData.tasks);
    const [categories, setCategories] = useState(data.categories ?? initialData.categories);
    const [mode, setMode] = useState(data.mode ?? initialData.mode);
    const [links, setLinks] = useState(data.links ?? initialData.links);

    function addTask(task) {
        if (!task) task = new Task('Nouvelle tâche', new Date(), TaskState.NEW);
        else task = new Task(task.title, task.dueDate, task.state, task.description, task.isUrgent);
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        return newTasks;
    }

    function removeTask(title) {
        const newTasks = tasks.filter(task => task.title !== title);
        setTasks(newTasks);
        return newTasks;
    }

    function editTask(title, updatedTask) {
        const newTasks = tasks.map(task => (task.title === title ? new Task(updatedTask.title, updatedTask.dueDate, updatedTask.state, updatedTask.description, updatedTask.isUrgent) : task));
        setTasks(newTasks);
        return newTasks;
    }

    function addCategory(category) {
        if (!category) category = new Category('Nouvelle catégorie', '#FFFFFF', '📁', true);
        else category = new Category(category.title, category.color, category.emoji, category.isActive);
        const newCategories = [...categories, category];
        setCategories(newCategories);
        return newCategories;
    }

    function removeCategory(title) {
        const newCategories = categories.filter(category => category.title !== title);
        setCategories(newCategories);
        return newCategories;
    }

    function editCategory(title, updatedCategory) {
        const newCategories = categories.map(category => (category.title === title ? new Category(updatedCategory.title, updatedCategory.color, updatedCategory.emoji, updatedCategory.isActive) : category));
        setCategories(newCategories);
        return newCategories;
    }

    function addLink(task, category) {
        const newLinks = [...data.links, new Link(task, category)];
        setData(tasks, categories, mode);
        return newLinks;
    }

    function removeLink(task, category) {
        const newLinks = data.links.filter(link => link.task !== task || link.category !== category);
        setData(tasks, categories, mode);
        return newLinks;
    }

    useEffect(() => {
        setData(tasks, categories, mode, links);
    }, [tasks, categories, mode, links]);

    return {tasks, setTasks, categories, setCategories, mode, setMode, addTask, removeTask, editTask, addCategory, removeCategory, editCategory, addLink, removeLink, importData};
}