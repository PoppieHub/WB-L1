// Асинхронная функция для последовательного выполнения функций из массива
async function executeAsyncFunctions(functions) {
    // Массив для хранения результатов выполнения каждой функции
    const result = [];

    // Проходимся по функциям из массива
    for (let func of functions) {
        try {
            // Выполняем текущую функцию и ждем её завершения
            const funcResult = await func();
            // Добавляем результат выполнения в массив
            result.push(funcResult);
        } catch (error) {
            // Обрабатываем ошибку, если она возникает при выполнении функции
            console.error(`Ошибка при выполнении функции: ${error.message}`);
            // Можно выбросить ошибку или добавить значение по умолчанию в результат
            result.push(null);
        }
    }

    // Возвращаем массив результатов выполнения всех функций
    return result;
}

// Асинхронная функция для параллельного выполнения функций с использованием Promise.all
async function executeAsyncFunctionsPromiseAll(functions) {
    try {
        // Используем Promise.all для параллельного выполнения всех функций из массива
        const result = await Promise.all(functions.map(func => func()));
        // Возвращаем массив результатов выполнения всех функций
        return result;
    } catch (error) {
        // Обрабатываем ошибку, если она возникает при выполнении любой из функций
        console.error(`Ошибка при выполнении одной из функций: ${error.message}`);
        // Можно выбросить ошибку или вернуть пустой массив в случае ошибки
        return [];
    }
}

// Асинхронная функция для последовательного выполнения функций из массива с использованием рекурсии
async function executeAsyncFunctionsRecursive(functions) {
    // Массив для хранения результатов выполнения каждой функции
    const results = [];

    // Рекурсивная функция для выполнения следующей функции из массива
    async function executeNext(index) {
        // Проверяем, не достигли ли конца массива функций
        if (index < functions.length) {
            try {
                // Выполняем текущую функцию и ждем её завершения
                const result = await functions[index]();
                // Добавляем результат выполнения в массив
                results.push(result);
                // Рекурсивно вызываем executeNext для выполнения следующей функции
                await executeNext(index + 1);
            } catch (error) {
                // Обрабатываем ошибку, если она возникает при выполнении функции
                console.error(`Ошибка при выполнении функции ${index + 1}: ${error.message}`);
                // Можно выбросить ошибку или добавить значение по умолчанию в результат
                results.push(null);
                // Рекурсивно вызываем executeNext для выполнения следующей функции
                await executeNext(index + 1);
            }
        }
    }

    // Начинаем выполнение функций с индекса 0
    await executeNext(0);

    // Возвращаем массив результатов выполнения всех функций
    return results;
}

const functionsArray = [
    async () => {
        return 1;
    },
    async () => {
        return 2;
    },
    async () => {
        throw new Error('Ошибка в функции 3');
    }
];

// Вызываем функции и обрабатываем результаты
executeAsyncFunctions(functionsArray).then(result => {
    console.log('Результаты выполнения функций:', result);
});

executeAsyncFunctionsPromiseAll(functionsArray).then(result => {
    console.log('Результаты выполнения функций (Promise.all):', result);
});

executeAsyncFunctionsRecursive(functionsArray).then(result => {
    console.log('Результаты выполнения функций:', result);
});
