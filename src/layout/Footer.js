function Footer({ togglePopup, setMode, mode }) {
    return (
        <footer className="footer">
            <button onClick={togglePopup}>Ajouter une {mode === 'task' ? 'tâche' : 'catégorie'}</button>
            <div>
                <button className={mode === 'task' ? 'active' : ''} onClick={() => setMode('task')}>Tâche</button>
                <button className={mode === 'category' ? 'active' : ''} onClick={() => setMode('category')}>Catégorie</button>
            </div>
        </footer>
    );
}

export default Footer;