const funcPalindromes = require('./funcPalindromes.js');
const testData = require('./testData.json');

//Тест
const runPalindromeTests = (palindromeFunction, functionName) => {
    console.log(`${functionName} - должно пройти проверку:`);
    testData.isPalindrome.forEach(str => {
        console.log(`${str}: ${palindromeFunction(str)}`);
    });
    console.log('\n');

    console.log(`${functionName} Не должно пройти проверку:`);
    testData.isNotPalindrome.forEach(str => {
        console.log(`${str}: ${palindromeFunction(str)}`);
    });
    console.log('\n');
};


const runAllTests = () => {
    runPalindromeTests(funcPalindromes.isPalindromeReverse, 'Переворачивание строки и сравнение');
    runPalindromeTests(funcPalindromes.isPalindromePointers, 'Указатели');
    runPalindromeTests(funcPalindromes.isPalindromeRecursive, 'Рекурсия');
    runPalindromeTests(funcPalindromes.isPalindromeStack, 'Стек');
    runPalindromeTests(funcPalindromes.isPalindromeMedian, 'Медиана');
    runPalindromeTests(funcPalindromes.isPalindromeEvery, 'Every');
    runPalindromeTests(funcPalindromes.isPalindromeBit, 'Побитово');
};

// Запуск всех тестов
runAllTests();