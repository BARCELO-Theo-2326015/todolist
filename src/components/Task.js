import { TaskFinishedStates } from '../data/Task';

export default function Task({ task, removeTask, editTask }) {
    return (
        <div className="task" style={{ color: task.isUrgent && 'red', textDecoration: TaskFinishedStates.includes(task.state) ? 'line-through' : 'none', borderColor: TaskFinishedStates.includes(task.state) ? 'green' : 'red' }}>
            <h3>{task.title}</h3>
            <span>{task.state}</span>
            <p>{task.description}</p>
            <p>Crée le {task.creationDate.toLocaleDateString()}</p>
            <p>A faire avant le {task.dueDate.toLocaleDateString()}</p>
            <p>{task.isUrgent ? 'Urgent' : 'Non urgent'}</p>
            <button onClick={removeTask}>Supprimer</button>
            <button onClick={editTask}>Modifier</button>
        </div>
    );
}