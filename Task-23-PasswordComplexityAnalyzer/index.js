// Минимальная длина пароля
const MIN_LENGTH = 8;
// Объект для хранения предложений по улучшению пароля
const passwordSuggestions = {};

// Строка символов, используемых для генерации паролей
const TEST_STRING = '!"#$%&()*+-/0123456789<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~';

// Функция для оценки сложности пароля
const evaluatePasswordStrength = (password) => {
    // Рассчитываем оценку сложности пароля
    const strength = calculatePasswordStrength(password);

    if (strength > 0) {
        // Если оценка положительная, возвращаем сообщение о сложности пароля
        return `Сложность пароля: ${strength} единиц`;
    } else {
        // Если оценка отрицательная, возвращаем рекомендацию по улучшению
        return `Пароль слишком простой. Рекомендация: ${getPasswordSuggestion(password, passwordSuggestions)}`;
    }
};

// Функция для рассчета оценки сложности пароля
const calculatePasswordStrength = (password) => {
    // Критерии оценки сложности пароля
    const requirements = {
        length: { criteria: MIN_LENGTH, matches: password.length >= MIN_LENGTH, rate: 5 },
        lowercase: { criteria: /[a-z]/g, matches: /[a-z]/g.test(password), rate: 1 },
        uppercase: { criteria: /[A-Z]/g, matches: /[A-Z]/g.test(password), rate: 1 },
        digits: { criteria: /\d/g, matches: /\d/g.test(password), rate: 1 },
        symbols: { criteria: /[\W_]/g, matches: /[\W_]/g.test(password), rate: 1 },
    };

    let score = 0;

    // Проходим по каждому критерию и вычисляем оценку сложности
    for (const [key, { matches, rate }] of Object.entries(requirements)) {
        // Увеличиваем оценку, если критерий выполнен, иначе сохраняем для рекомендаций
        score += matches ? rate : (passwordSuggestions[key] = { criteria: requirements[key].criteria });
    }

    // Если есть невыполненные критерии, возвращаем -1
    return Object.values(passwordSuggestions).some(criteria => !criteria.matches) ? -1 : score;
};

// Функция для генерации рекомендаций по улучшению пароля
const getPasswordSuggestion = (password, suggestions) => {
    let symbolsToAdd = '';

    // Проходим по каждому критерию, где пароль не соответствует
    for (const key in suggestions) {
        const criteria = suggestions[key].criteria;
        if (criteria instanceof RegExp) {
            // Получаем уникальные символы, соответствующие критерию
            const symbols = new Set(TEST_STRING.match(criteria));
            // Выбираем два случайных символа
            const randomSymbols = Array.from({ length: 2 }, () => [...symbols][getRandomNumber(symbols.size)]);
            // Добавляем эти символы к строке
            symbolsToAdd += randomSymbols.join('');
        }
    }

    // Добавляем символы к паролю и перемешиваем
    let result = password + shuffleString(symbolsToAdd);

    // Если длина пароля недостаточна, добавляем символы из TEST_STRING
    if (result.length < MIN_LENGTH) {
        // Добавляем символы из TEST_STRING, чтобы не добавлять новые символы
        result += Array.from({ length: MIN_LENGTH - result.length }, () => TEST_STRING[getRandomNumber(TEST_STRING.length)]).join('');
    }

    return result;
};

// Функция для генерации случайного числа в заданном диапазоне
const getRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);

// Функция для перемешивания символов в строке случайным образом
const shuffleString = (string) => {
    const arr = string.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = getRandomNumber(i + 1);
        // Обмен значениями элементов для перемешивания
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr.join('');
};

console.log(evaluatePasswordStrength('12345678'));
