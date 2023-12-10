const externalFunction = () => {
    // Создаем переменную во внешней функции
    const variable = "Переменная внешней функции";
    // Возвращаем внутреннюю функцию
    return function closuresFunction() {
        // Возвращаем результат работы второй функции
        return variable + " + работа внутренней функции";
    };
}

// Более короткая версия
const createClosure = (outerVariable) => () => `${outerVariable} + работа внутренней функции`;

// Сохраняем доступ к внутренней переменной
const innerFunc = externalFunction();
// Создаем замыкание и сохраняем доступ к внутренней переменной
const closure = createClosure("Переменная внешней функции");

// Выводим результат работы внутренней функции
console.log(innerFunc());
// Выводим результат работы внутренней функции
console.log(closure());