// Объявление трех функций, выполняющих различные математические операции
function functionFirst(num) {
    return num + 10;
}

function functionSecond(num) {
    return num * 7;
}

function functionThird(num) {
    return num * 3;
}

// Собираем функции в массив
const functionArray = [functionFirst, functionSecond, functionThird];

// Пример данных
const inputNumber = 5;

/*
   Применяем функции последовательно.
   Передаем в метод reduce очередную функцию и при первом вызове inputNumber,
   в функцию передаем аккумулятор (результат предыдущего вызова этой функции).
*/
const finalResult = functionArray.reduce((acc, func) => func(acc), inputNumber);
console.log(`Результат: ${finalResult}`);


/* Иная реализация задания */

// Создаем объект promise, который завершится успешно через 3с
const firstPromise = () =>
    new Promise((resolve) => setTimeout(() => resolve(300)), 300);

// Создаем объект promise, который завершится успешно через 2с
const secondPromise = (param) =>
    new Promise((resolve) => setTimeout(() => resolve(param + 200)), 200);

// Создаем объект promise, который завершится успешно через 1с
const thirdPromise = (param) =>
    new Promise((resolve) => setTimeout(() => resolve(param + 100)), 100);

// Передаем в функцию обработки массив функций
async function promisesInSeries(asyncFns) {
    // Объявляем переменную, где будет храниться параметр передаваемый в очередную функцию
    let param;

    // Проходимся по всем функциям в массиве
    for (let i = 0; i < asyncFns.length; i++) {
        // Записываем в param результат выполнения функции с параметром
        param = await asyncFns[i](param);
    }

    // Результат выполнения самой последней функции
    return param;
}

// Собираем функции в массив
const functionArray2 = [firstPromise, secondPromise, thirdPromise];

// Вызываем асинхронную функцию и выводим результат
(async () => {
    console.log(`Результат:`, await promisesInSeries(functionArray2));
})();
