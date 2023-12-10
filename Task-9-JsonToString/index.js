// Тестовые данные
const jsonData = {
    name: "John Doe",
    last_name: null,
    age: 30,
    isStudent: false,
    address: {
        street: "123 Main St",
        city: "Any-town",
        country: "USA",
    },
    languages: ["English", "Spanish"],
    contact: {
        email: "john@example.com",
        phone: "555-123-4567",
        obj: {
            arr: [
                { key: 1 },
                { key: "ffds" },
                { key3: [1, 2, 3] },
            ],
        },
    },
};

// Функция конвертации JSON в строку с использованием рекурсии
const convertJsonToString_Recursion = (jsonData) => {
    // Функция для определения типа данных
    const getType = (value) => {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';

        return typeof value;
    };

    // Рекурсивная функция для обхода объекта JSON
    const traverse = (data) => {
        // Определение типа текущего значения
        const type = getType(data);

        switch (type) {
            case 'object':
                // Обработка объекта
                const objectString = Object.keys(data)
                    .map((key) => `"${key}":${traverse(data[key])}`)
                    .join(',');
                return `{${objectString}}`;

            case 'array':
                // Обработка массива
                const arrayString = data.map((item) => traverse(item)).join(',');
                return `[${arrayString}]`;

            case 'string':
                // Обработка строки
                return `"${data}"`;

            default:
                // Обработка прочих типов данных (числа, булевы значения, undefined)
                return String(data);
        }
    };

    try {
        // Вызываем рекурсивную функцию для обхода объекта JSON
        const jsonString = traverse(jsonData);
        return jsonString;
    } catch (error) {
        // Обработка ошибок в случае возникновения исключения
        console.error('Ошибка при конвертации Json в строку:', error.message);
        return null;
    }
};

// Функция конвертации JSON в строку с использованием стека
const convertJsonToString_Stack = (jsonData) => {
    // Инициализация стека
    const stack = [jsonData];
    // Массив для хранения результата
    const resultStack = [];

    // Пока стек не пуст
    while (stack.length > 0) {
        // Извлекаем текущий элемент из стека
        const current = stack.pop();

        // Проверка, является ли текущий элемент объектом
        if (typeof current === 'object' && current !== null) {
            // Проверка, является ли текущий элемент массивом
            if (Array.isArray(current)) {
                // Обработка массива
                const arrString = current.map((item) =>
                    // Рекурсивный вызов для каждого элемента массива
                    item !== null && typeof item === 'object'
                        ? convertJsonToString_Stack(item)
                        : typeof item === 'string' ? `"${item}"` : item).join(',');

                // Добавление строки массива в результат
                resultStack.push(`[${arrString}]`);
            } else {
                // Обработка объекта
                // Получаем ключи объекта
                const keys = Object.keys(current);

                // Проверка, если объект пустой
                if (keys.length === 0) {
                    resultStack.push('{}');
                } else {
                    // Обработка непустого объекта
                    const objString = keys.map((key) =>
                        // Рекурсивный вызов для каждого свойства объекта
                        `"${key}":${current[key] !== null && typeof current[key] === 'object'
                            ? convertJsonToString_Stack(current[key])
                            : typeof current[key] === 'string' ? `"${current[key]}"` : current[key]}`).join(',');

                    // Добавление строки объекта в результат
                    resultStack.push(`{${objString}}`);
                }
            }
        } else {
            // Обработка примитивных значений
            resultStack.push(String(current));
        }
    }

    // Сборка результата из строк в массиве
    return resultStack.join('');
};

// Вызываем функции и выводим результаты
const jsonString_Recursion = convertJsonToString_Recursion(jsonData);
console.log(typeof jsonString_Recursion, jsonString_Recursion);

const jsonString_Stack = convertJsonToString_Stack(jsonData);
console.log(typeof jsonString_Stack, jsonString_Stack);
