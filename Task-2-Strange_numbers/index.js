const funcStrangeNumbers = require('./funcStrangeNumbers.js');

// Тестовые данные
const testData = [
    { number: 28, expected: true },   // True 28 = 1 + 2 + 4 + 7 + 14
    { number: 12, expected: false },  // False 12 != 1 + 2 + 3 + 4 + 6
    { number: 6, expected: true },    // True 6 = 1 + 2 + 3
    { number: 9, expected: false },   // False 9 != 1 + 3
    { number: 496, expected: true },   // True 496 = 1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248
    { number: 10, expected: false },   // False 10 != 1 + 2 + 5
    { number: 8128, expected: true },  // True 8128 = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 127 + 254 + 508 + 1016 + 2032 + 4064
];

//Тест
const runStrangeNumbersTests = (strangeNumbersFunction, functionName) => {
    console.log(`Тестирование функции ${functionName}`);

    testData.forEach(data => {
        const { number, expected } = data;
        const result = strangeNumbersFunction(number);

        if (result === expected) {
            console.log(`Тест пройден для числа ${number}`);
        } else {
            console.log(`Тест не пройден для числа ${number}. Ожидалось ${expected}, получено ${result}`);
        }
    });
    console.log('\n');
};


const runAllTests = () => {
    runStrangeNumbersTests(funcStrangeNumbers.isStrangeNumberFor, 'Цикл for');
    runStrangeNumbersTests(funcStrangeNumbers.isStrangeNumberReduce, 'Reduce');
    runStrangeNumbersTests(funcStrangeNumbers.isStrangeNumberForEach, 'Цикл forEach');
    runStrangeNumbersTests(funcStrangeNumbers.isStrangeNumberRecursive, 'Рекурсия');
};

// Запуск всех тестов
runAllTests();
