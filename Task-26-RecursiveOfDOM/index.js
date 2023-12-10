// Функция обхода DOM с использованием цикла
const traverseDOMWithCycle = (node, action) => {
    // Выполняем действия с текущим узлом
    action(node);

    // Получаем дочерние элементы текущего узла с помощью деструктуризации
    const { childNodes } = node;

    // Рекурсивно вызываем функцию для каждого дочернего элемента
    for (const child of childNodes) {
        // Проверяем, что это элемент узла перед рекурсивным вызовом
        if (child.nodeType === Node.ELEMENT_NODE) {
            traverseDOMWithCycle(child, action);
        }
    }
};

// Функция обхода DOM с использованием Array.from и forEach
const traverseDOMRecursively = (node, action) => {
    // Выполняем действия с текущим узлом
    action(node);

    // Используем Array.from для преобразования коллекции в массив и использования forEach
    Array.from(node.children).forEach(child => {
        // Проверяем, что это элемент узла перед рекурсивным вызовом
        if (child.nodeType === Node.ELEMENT_NODE) {
            traverseDOMRecursively(child, action);
        }
    });
};

// Функция обхода DOM с использованием оператора расширения
const traverseDOMExtension = (node, action) => {
    // Выполняем действия с текущим узлом
    action(node);

    // Рекурсивный вызов для каждого дочернего элемента с использованием оператора расширения
    [...node.children]
        .filter(child => child.nodeType === Node.ELEMENT_NODE)
        .forEach(child => traverseDOMExtension(child, action));
};

// Начнем обход с корневого элемента
const rootNode = document.body;

// Вывод информации о тегах в консоль
const logNodeInfo = node => {
    console.log(`Тэг: ${node.tagName}, Тип: ${node.nodeType}`);
};

// Обход DOM с использованием цикла
traverseDOMWithCycle(rootNode, logNodeInfo);
console.log('\n\/');

// Обход DOM с использованием Array.from и forEach
traverseDOMRecursively(rootNode, logNodeInfo);
console.log('\n\/');

// Обход DOM с использованием оператора расширения
traverseDOMExtension(rootNode, logNodeInfo);
