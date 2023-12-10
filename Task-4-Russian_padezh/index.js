// Используя оператор switch и тернарные операторы
export function getCorrectWordForm(amount, wordForms) {
    // Получаем последние две цифры числа
    const lastTwoDigits = Math.abs(amount) % 100;
    // Получаем последнюю цифру числа
    const lastDigit = lastTwoDigits % 10;

    switch (true) {
        // Если последние две цифры находятся в диапазоне от 11 до 19, то выбираем 3 форму слова
        case (lastTwoDigits >= 11 && lastTwoDigits <= 19):
            return wordForms[2];
        // Если последняя цифра равна 1, то выбираем 1 форму слова
        case (lastDigit === 1):
            return wordForms[0];
        // Если последняя цифра находится в диапазоне от 2 до 4, то выбираем 2 форму слова
        case (lastDigit >= 2 && lastDigit <= 4):
            return wordForms[1];
        // Во всех остальных случаях выбираем 3 форму слова
        default:
            return wordForms[2];
    }
}

// Используя объект для хранения форм слов и обращения к ним по ключу
export function getCorrectWordFormV2(amount, wordForms) {
    // Объект, который содержит соответствие форм слов по ключам
    const forms = {
        1: wordForms[0],
        2: wordForms[1],
        3: wordForms[1],
        4: wordForms[1],
        11: wordForms[2],
        12: wordForms[2],
        13: wordForms[2],
        14: wordForms[2],
    };

    // Получаем последние две цифры числа
    const lastTwoDigits = Math.abs(number) % 100;
    // Определяем ключ для выбора формы слова
    const key = lastTwoDigits in forms ? lastTwoDigits : lastTwoDigits % 10;

    // Возвращаем выбранную форму слова или 3 форму слова по умолчанию
    return forms[key] || wordForms[2];
}