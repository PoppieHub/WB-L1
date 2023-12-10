// Общий набор методов
const bookMethods = {
    getTitle() {
        return this.title;
    },
    setTitle(newTitle) {
        this.title = newTitle;
    },
    getAuthor() {
        return this.author;
    },
    setAuthor(newAuthor) {
        this.author = newAuthor;
    },
    getYear() {
        return this.year;
    },
    setYear(newYear) {
        this.year = newYear;
    },
};

// Классовый подход
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

// Добавляем общие методы к прототипу класса
Object.assign(Book.prototype, bookMethods);

// Объектный подход
const book = {
    title: "My goal is to work at Wildberries",
    author: "@Poppie",
    year: 2023,
};

// Добавляем общие методы к объекту
Object.assign(book, bookMethods);

// Создаем экземпляр класса Book
const myBook = new Book("My goal is to work at Wildberries", "@Poppie", 2023);

console.log("Название книги:", myBook.getTitle());
console.log("Автор книги:", myBook.getAuthor());
console.log("Год издания книги:", myBook.getYear());

// Изменяем некоторые значения
myBook.setTitle("Please Please Please Please");
myBook.setAuthor('@PoppieHub');
myBook.setYear(2024);

console.log("Новое название книги:", myBook.getTitle());
console.log("Новый автор книги:", myBook.getAuthor());
console.log("Новый год издания книги:", myBook.getYear());

console.log("Название книги (объект):", book.getTitle());
console.log("Автор книги (объект):", book.getAuthor());
console.log("Год издания книги (объект):", book.getYear());

// Изменяем некоторые значения
myBook.setTitle("Please Please Please");
myBook.setAuthor('@PoppieHub');
myBook.setYear(2024);

console.log("Новое название книги:", book.getTitle());
console.log("Новый год издания книги:", book.getYear());
