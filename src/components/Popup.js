import React, { useState } from 'react';

export default function Popup({
        addCategory, addTask,
        mode, closePopup,
        editTask, editCategory,
        isEditMode,
        current
    }) {
    // For task
    const [taskName, setTaskName] = useState(isEditMode && mode === "task" ? current.title : 'Nouvelle tâche');
    const [taskDescription, setTaskDescription] = useState(isEditMode && mode === "task" ? current.description : 'Cette tâche n\'a pas de description');
    const [isUrgent, setIsUrgent] = useState(isEditMode && mode === "task" ? current.isUrgent : false);
    const [taskEndDate, setTaskEndDate] = useState(isEditMode && mode === "task" ? new Date(current.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    const [taskState, setTaskState] = useState(isEditMode && mode === "task" ? current.state : 'NEW');

    // For category
    const [categoryName, setCategoryName] = useState(isEditMode && mode === "category" ? current.title : 'Nouvelle catégorie');
    const [categoryColor, setCategoryColor] = useState(isEditMode && mode === "category" ? current.color : '#FFFFFF');
    const [categoryEmoji, setCategoryEmoji] = useState(isEditMode && mode === "category" ? current.emoji : '📁');
    const [isActive, setIsActive] = useState(isEditMode && mode === "category" ? current.isActive : false);

    return (
        <div className="popupContainer">
            {isEditMode === true ? (
                <><div className="overlay" onClick={closePopup}></div><div className="popup">
                    {mode === "task" ? (
                        <><div className="popup-content">
                            <h2>Modifier une tâche</h2>
                            <input
                                type="text"
                                placeholder="Nom de la tâche"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)} />
                            <input
                                type="text"
                                placeholder="Description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)} />
                            <input
                                type="checkbox"
                                checked={isUrgent}
                                onChange={(e) => setIsUrgent(e.target.checked)} />
                            <label>Urgent</label>
                            <input
                                type="date"
                                placeholder="Date d'échéance"
                                value={taskEndDate}
                                onChange={(e) => setTaskEndDate(e.target.value)} />
                            <select value={taskState} onChange={(e) => setTaskState(e.target.value)}>
                                <option value="NEW">Nouvelle</option>
                                <option value="IN_PROGRESS">En cours</option>
                                <option value="COMPLETED">Complétée</option>
                                <option value="PENDING">En attente</option>
                                <option value="ABANDONED">Abandonnée</option>
                            </select>
                        </div>
                        <button onClick={() => {
                            editTask(
                                current.title, {
                                title: taskName,
                                dueDate: new Date(taskEndDate),
                                state: taskState,
                                description: taskDescription,
                                isUrgent: isUrgent
                            });
                            closePopup();
                        } }>Modifier</button>
                        </>
                    ) : mode === "category" ? (
                        <div className="popup-content">
                            <h2>Modifier une catégorie</h2>
                            <input
                                type="text"
                                placeholder="Nom de la catégorie"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)} />
                            <input
                                type="color"
                                value={categoryColor}
                                onChange={(e) => setCategoryColor(e.target.value)} />
                            <input
                                type="text"
                                placeholder="Emoji"
                                value={categoryEmoji}
                                onChange={(e) => setCategoryEmoji(e.target.value)} />
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)} /> Actif
                            <button onClick={() => {
                                editCategory(
                                    current.title, {
                                    title: categoryName,
                                    color: categoryColor,
                                    emoji: categoryEmoji,
                                    isActive: isActive
                                });
                                closePopup();
                            } }>Modifier</button>
                        </div>
                    ) : ''}
                    <button className="close" onClick={closePopup}>Fermer</button>
                </div></>
            ) : isEditMode === false ? (
                <><div className="overlay" onClick={closePopup}></div><div className="popup">
                    {mode === "task" ? (
                        <>
                        <div className="popup-content">
                        <h2>Ajouter une tâche</h2>
                        <input
                            type="text"
                            placeholder="Nom de la tâche"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)} />
                        <input
                            type="checkbox"
                            checked={isUrgent}
                            onChange={(e) => setIsUrgent(e.target.checked)} />
                        <label>Urgent</label>
                        <input
                            type="date"
                            placeholder="Date d'échéance"
                            onChange={(e) => setTaskEndDate(e.target.value)} />
                        <select onChange={(e) => setTaskState(e.target.value)}>
                            <option value="NEW">Nouvelle</option>
                            <option value="IN_PROGRESS">En cours</option>
                            <option value="COMPLETED">Complétée</option>
                            <option value="PENDING">En attente</option>
                            <option value="ABANDONED">Abandonnée</option>
                        </select>
                    </div>
                    <button onClick={() => {
                        addTask({
                            title: taskName || 'Nouvelle tâche',
                            dueDate: new Date(taskEndDate),
                            state: taskState,
                            description: taskDescription,
                            isUrgent: isUrgent
                        });
                        closePopup();
                    } }>Ajouter</button>
                    </>
                    ) : mode === "category" ? (
                        <>
                        <div className="popup-content">
                            <h2>Ajouter une catégorie</h2>
                            <input
                                type="text"
                                placeholder="Nom de la catégorie"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)} />
                            <input
                                type="color"
                                value={categoryColor}
                                onChange={(e) => setCategoryColor(e.target.value)} />
                            <input
                                type="text"
                                placeholder="Emoji"
                                value={categoryEmoji}
                                onChange={(e) => setCategoryEmoji(e.target.value)} />
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)} /> Actif
                        </div>
                        <button onClick={() => {
                            addCategory({
                                title: categoryName || 'Nouvelle catégorie',
                                color: categoryColor,
                                emoji: categoryEmoji,
                                isActive: isActive
                            });
                            closePopup();
                        } }>Ajouter</button>
                        </>
                    ) : ''}
                </div></>
            ) : ''}
        </div>
    );
}