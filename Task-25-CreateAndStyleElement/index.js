// Функция для создания и стилизации элемента
const createAndStyleElement = () => {
    // Создаем новый элемент
    const newElement = document.createElement('div');
    // Создаем вложенный элемент
    const newNestedElement = document.createElement('span');
    newNestedElement.innerText = 'Новый элемент';

    // Устанавливаем стили с помощью свойства style
    Object.assign(newElement.style, {
        width: '400px',
        height: '400px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    });

    Object.assign(newNestedElement.style, {
        color: 'white',
        textAlign: 'center',
        lineHeight: '100px',
    });

    // Добавляем элемент в newElement
    newElement.appendChild(newNestedElement);
    // Добавляем элемент в DOM
    document.body.appendChild(newElement);
};

// Вызываем функцию для создания и стилизации элемента
createAndStyleElement();