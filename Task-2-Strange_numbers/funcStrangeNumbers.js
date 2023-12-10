// Используя цикл for
const isStrangeNumberFor = num => {
    //Сумма делителей
    let sumOfDivisors = 0;

    // Пробегаем по всем делителям числа и суммируем их
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            sumOfDivisors += i;
        }
    }

    // Является ли сумма делителей числа равной самому числу
    return sumOfDivisors === num;
}

// Используя функцию reduce
const isStrangeNumberReduce = num => {
    const sumOfDivisors = [...Array(num - 1).keys()]
        // фильтруем массив, оставляя только те элементы, на которые число num делится без остатка
        .filter(i => num % i === 0)
        //складываем все элементы массива и получаем их сумму
        .reduce((acc, curr) => acc + curr, 0);

    return sumOfDivisors === num;
}

// Используя цикл forEach
const isStrangeNumberForEach = num => {
    let sumOfDivisors = 0;

    [...Array(num - 1).keys()].forEach(i => {
        const divisor = i + 1;
        if (num % divisor === 0) {
            sumOfDivisors += divisor;
        }
    });

    return sumOfDivisors === num;
};

// Используя рекурсию
const isStrangeNumberRecursive = (num, divisor = 1, sumOfDivisors = 0) => {
    // Условие выхода
    if (divisor === num) {
        return sumOfDivisors === num;
    }

    if (num % divisor === 0) {
        sumOfDivisors += divisor;
    }

    return isStrangeNumberRecursive(num, divisor + 1, sumOfDivisors);
};

module.exports = {
    isStrangeNumberFor,
    isStrangeNumberReduce,
    isStrangeNumberForEach,
    isStrangeNumberRecursive
}
