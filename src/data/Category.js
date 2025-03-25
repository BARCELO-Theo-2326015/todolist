class Category {
    constructor(title, color, emoji, isActive) {
        if (title.length < 3) throw new Error("Title must be at least 3 characters long");
        this.title = title;
        this.color = color;
        this.emoji = emoji;
        this.isActive = isActive;
    }
}

export default Category;