// Очищает строку от символов, кроме букв и цифр, приводя все символы к нижнему регистру
const cleanString = str => {
    return str.toLowerCase().replace(/[^A-zА-я0-9]/g, '');
}

// Переворачивание строки и сравнение
const isPalindromeReverse = str => {
    const notReversedStr = cleanString(str);
    // Либо return notReversedStr === [...notReversedStr].reverse().join('');
    return notReversedStr === notReversedStr.split('').reverse().join('');
}

// Задействуем два указателя (начало и конец строки) и сравниваем символы, смещая указатели в сторону центра строки
const isPalindromePointers = str => {
    const cleanedStr = cleanString(str);
    let firstPointer = 0, secondPointer = cleanedStr.length - 1;

    while (firstPointer < secondPointer) {
        if (cleanedStr[firstPointer] !== cleanedStr[secondPointer]) {
            return false;
        }
        firstPointer++; secondPointer--;
    }
    return true;
}

//Рекурсия. Разбиваем строку на подстроки и проводим посимвольное сравнение, начиная с краев строки и двигаясь к центру
const isPalindromeRecursive = str => {
    const cleanedStr = cleanString(str);

    //условие выхода
    if (cleanedStr.length <= 1) {
        return true;
    }
    //проводим посимвольное сравнение
    return cleanedStr[0] === cleanedStr[cleanedStr.length - 1] &&
        isPalindromeRecursive(
            //обрезаем с краев по символу и возвращаем подстроку
            cleanedStr.slice(1, -1)
        );
}

/* Через стек. Половина символов записывается в стек,
затем оставшаяся часть строки сравнивается с элементами стека, извлекая их */
const isPalindromeStack = str => {
    const cleanedStr = cleanString(str);

    const stack = [];
    const length = cleanedStr.length;

    // Записываем первую половину символов в стек
    for (let i = 0; i < Math.floor(length / 2); i++) {
        stack.push(cleanedStr[i]);
    }

    // Сравниваем оставшуюся часть строки с элементами стека, извлекая их
    for (let i = Math.ceil(length / 2); i < length; i++) {
        if (cleanedStr[i] !== stack.pop()) {
            return false;
        }
    }

    return true;
}

// Через медиану. Делим строку наполовину (по большему округлению) и сравниваем параллельно со второй половиной
const isPalindromeMedian = str => {
    const cleanedStr = cleanString(str);

    const length = cleanedStr.length;
    const medianIndex = Math.floor(length / 2);

    for (let i = 0; i < medianIndex; i++) {
        if (cleanedStr[i] !== cleanedStr[length - 1 - i]) {
            return false;
        }
    }

    return true;
}

// Через Every (проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции)
const isPalindromeEvery = str => {
    const cleanedStr = cleanString(str);

    //сравниваем символы в строке, берем первый и последний, затем второй и предпоследний и т.д.
    return [...cleanedStr].every((value, index) =>
        value === cleanedStr[cleanedStr.length - 1 - index]
    );
}

// Сравнение побитово.
const isPalindromeBit = str => {
    const cleanedStr = cleanString(str);
    let firstChar = 0, secondChar = cleanedStr.length - 1;

    while (firstChar < secondChar) {
        // Кодировки символов сравниваются по их числовым значениям.
        if (cleanedStr.charCodeAt(firstChar++) -
            cleanedStr.charCodeAt(secondChar--) !== 0) {
            return false;
        }
    }

    return true;
}

module.exports = {
    isPalindromeReverse,
    isPalindromePointers,
    isPalindromeRecursive,
    isPalindromeStack,
    isPalindromeMedian,
    isPalindromeEvery,
    isPalindromeBit
}

