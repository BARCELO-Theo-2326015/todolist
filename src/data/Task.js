class Task {
    constructor(title, dueDate, state, description = '', isUrgent = false, creationDate = new Date()) {
        if (title.length < 3) throw new Error('Title must be at least 3 characters long');
        this.id = Math.floor(Math.random() * 1000000);
        this.title = title;
        this.state = state;
        this.description = description;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent;
    }
}

const TaskState = Object.freeze({
    NOUVEAU: 'Nouveau',
    EN_COURS: 'En cours',
    REUSSI: 'Réussi',
    EN_ATTENTE: 'En attente',
    ABANDONNE: 'Abandonné',
});

const TaskFinishedStates = Object.freeze([
    TaskState.REUSSI,
    TaskState.ABANDONNE,
]);

export { Task, TaskState,  TaskFinishedStates };