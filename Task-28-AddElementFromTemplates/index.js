function createElement(parent, html) {
    // Создаем шаблон элемента
    const template = document.createElement('template');
    template.innerHTML = html;

    // Клонируем содержимое шаблона
    const clone = template.content.cloneNode(true);

    // Вставляем склонированный элемент в DOM
    parent.appendChild(clone);
}

// Массив карточек товаров для использования шаблона
const products = [
    {
        id: 1,
        name: "Фирменный продукт 1",
        description: "Описание продукта 1 здесь.",
        price: 19.99,
        category: "Категория товара 1",
    },
    {
        id: 2,
        name: "Фирменный продукт 2",
        description: "Описание продукта 2 здесь.",
        price: 29.99,
        category: "Категория товара 2",
    },
    {
        id: 3,
        name: "Фирменный продукт 3",
        description: "Описание продукта 3 здесь.",
        price: 129.99,
        category: "Категория товара 3",
    },
    {
        id: 4,
        name: "Фирменный продукт 4",
        description: "Описание продукта 4 здесь.",
        price: 249.99,
        category: "Категория товара 4",
    }
];

// Находим тег <main>
const mainElement = document.querySelector('main');

// Создаем карточки товаров и добавляем их в <main>
products.forEach(product => {
    const html = `
        <div class="product-card">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Цена: $${product.price}</p>
            <p>Категория: ${product.category}</p>
        </div>
    `;
    createElement(mainElement, html);
});
