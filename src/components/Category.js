export default function Category({ category, removeCategory, editCategory }) {
    return (
        <div className="category" style={{ borderColor: category.color }}>
            <h3>{category.emoji} | {category.title}</h3>
            <span>{category.isActive ? 'Active' : 'Inactive'}</span>
            <button onClick={removeCategory}>Supprimer</button>
            <button onClick={editCategory}>Modifier</button>
        </div>
    );
}