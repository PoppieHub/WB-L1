// Объявление трех функций, выполняющих различные математические операции
function functionFirst(inputNumber) {
    return inputNumber + 10;
}

function functionSecond(inputNumber) {
    return inputNumber * 7;
}

function functionThird(inputNumber) {
    return inputNumber * 3;
}

// Собираем функции в массив
const functionArray = [functionFirst, functionSecond, functionThird];

// Входное значение, которым будут оперировать функции
const inputNumber = 5;

// Вариант, если необходимо получать массив результатов текущей функции и предыдущих
const getResultsExecutingFunctions = (functionArray) => {
    // Возвращаем функцию, которая принимает входное значение
    return function (inputNumber) {
        // Объявляем пустой массив, в котором будут записаны результаты выполнения функций
        let result = [];

        // Перебираем каждую функцию из массива
        functionArray.forEach((func) => {
            // Записываем результат выполнения функции
            result.push(func(inputNumber));
        });

        // Возвращаем массив результатов выполнения функций
        return result;
    };
};

// Вариант, использующий функцию executeFunctions для вызова функций из массива
const executeFunctions = (functionsArray) => {
    // Возвращаем функцию, принимающую переменное число аргументов
    return (...args) => functionsArray.map(func => func(...args));
};

// Создаем новую функцию с использованием первого варианта
const processFunctions = getResultsExecutingFunctions(functionArray);
// Создаем новую функцию с использованием второго варианта
const combinedFunction = executeFunctions(functionArray);

// Вызываем новые функции с входными данными
const results = processFunctions(inputNumber);
const resultsV2 = combinedFunction(inputNumber);

// Выводим массивы результатов, полученных после вызова каждой функции
console.log(results);
console.log(resultsV2);
