import {Task, TaskState, TaskFinishedStates} from '../data/Task';

export default function Header({ data, mode, filters, setFilters, setSortConfig }) {
    return (
        <header className="header">
            <p>{data[mode].length} {mode}</p>
            {(mode === 'task' && (
                <>
                <div>
                    <label>
                        Catégorie:
                        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                            <option value="">Toutes</option>
                            {data.category.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Etat:
                        <select onChange={(e) => setFilters({ ...filters, state: e.target.value })}>
                            <option value="">Tous</option>
                            {Object.values(TaskState).map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Nom:
                        <input
                            type="text"
                            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                        />
                    </label>
                    <label>
                        Urgence:
                        <input
                            type="checkbox"
                            onChange={(e) => setFilters({ ...filters, isUrgent: e.target.checked })}
                        />
                    </label>
                    <label>
                        Fait/Pas fait:
                        <select onChange={(e) => setFilters({ ...filters, isFinished: e.target.value })}>
                            <option value="">Tous</option>
                            <option value="true">Fait</option>
                            <option value="false">Pas fait</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Trier par:
                        <select onChange={(e) => setSortConfig({ key: e.target.value, direction: 'ascending' })}>
                            <option value="">Aucun</option>
                            <option value="title">Nom</option>
                            <option value="dueDate">Date d'échéance</option>
                            <option value="creationDate">Date de création</option>
                        </select>
                    </label>
                    <label>
                        Direction:
                        <select onChange={(e) => setSortConfig((prevConfig) => ({ ...prevConfig, direction: e.target.value }))}>
                            <option value="ascending">Ascendant</option>
                            <option value="descending">Descendant</option>
                        </select>
                    </label>
                </div>
                </>
            ))}
        </header>
    );
  }