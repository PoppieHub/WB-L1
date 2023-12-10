const stringToJSON = (jsonString) => {
    // Удаляем пробелы и другие пустые символы
    jsonString = jsonString.trim();

    // Обрабатывем пустую строку
    if (jsonString === "") {
        return '';
    }

    let index = 0;

    // Основная функция для парсинга значений всех типов
    const parseValue = () => {
        const char = jsonString[index];

        if (char === "{") {
            return parseObject();
        } else if (char === "[") {
            return parseArray();
        } else if (char === '"') {
            return parseString();
        } else if (char === "t" && jsonString.slice(index, index + 4) === "true") {
            index += 4;
            return true;
        } else if (char === "f" && jsonString.slice(index, index + 5) === "false") {
            index += 5;
            return false;
        } else if (char === "n" && jsonString.slice(index, index + 4) === "null") {
            index += 4;
            return null;
        } else if (char === "-" || (char >= "0" && char <= "9")) {
            return parseNumber();
        } else {
            throw new SyntaxError(`Unexpected token: ${char}`);
        }
    };

    // Функция для парсинга строк
    const parseString = () => {
        index++;
        let result = "";

        while (index < jsonString.length) {
            const char = jsonString[index];

            // Если текущий символ это кавычки, значит строка закончилась
            if (char === '"') {
                index++;
                return result;
            }
            // Если текущий символ это \\, значит это спецсимвол, обрабатываем его отдельно
            else if (char === "\\") {
                const nextChar = jsonString[index + 1];

                if (nextChar === '"' || nextChar === "\\" || nextChar === "/" || nextChar === "b" || nextChar === "f" || nextChar === "n" || nextChar === "r" || nextChar === "t" || nextChar === "u") {
                    result += nextChar;
                    index += 2;
                } else {
                    throw new SyntaxError(`Invalid escape sequence: \\${nextChar}`);
                }
            }
            // Во всех остальных случаях добавляем символ к результату и идем дальше
            else {
                result += char;
                index++;
            }
        }

        // Если цикл завершился, а закрывающая кавычка не была обнаружена, выбрасываем ошибку
        throw new SyntaxError("Unterminated string literal");
    };

    // Функция для парсинга чисел
    const parseNumber = () => {
        const start = index;

        // Пока текущий символ является числом, увеличиваем index
        while (index < jsonString.length && (jsonString[index] === "-" || (jsonString[index] >= "0" && jsonString[index] <= "9") || jsonString[index] === "." || jsonString[index] === "e" || jsonString[index] === "E")) {
            index++;
        }

        // После остановки цикла получаем все число целиком
        const numberString = jsonString.slice(start, index);
        // Приводим его к числовому формату
        const parsedNumber = parseFloat(numberString);

        // Дополнительная проверка на NaN
        if (isNaN(parsedNumber)) {
            throw new SyntaxError(`Invalid number: ${numberString}`);
        }

        return parsedNumber;
    };

    // Функция для парсинга массива
    const parseArray = () => {
        index++;
        const array = [];

        while (index < jsonString.length) {
            const char = jsonString[index];

            // Если найден закрывающий символ, возвращаем полученный массив
            if (char === "]") {
                index++;
                return array;
            }

            // Вызываем функцию для парсинга текущего значения и добавляем его в массив
            const value = parseValue();
            array.push(value);

            // Если найдена запятая, продолжаем парсинг
            if (jsonString[index] === ",") {
                index++;
            }
            // Если текущий символ не является ни запятой ни закрывающей скобкой, выбрасываем ошибку
            else if (jsonString[index] !== "]") {
                throw new SyntaxError(`Unexpected token: ${jsonString[index]}`);
            }
        }

        throw new SyntaxError("Unterminated array");
    };

    // Функция для парсинга объекта
    const parseObject = () => {
        index++;
        const obj = {};

        while (index < jsonString.length) {
            const char = jsonString[index];

            if (char === "}") {
                index++;
                return obj;
            }

            // Ключ парсим как строку
            const key = parseString();

            // Если после ключа не идет ":", выбрасываем ошибку
            if (jsonString[index] !== ":") {
                throw new SyntaxError(`Expected ':' after key in object, but found '${jsonString[index]}'`);
            }

            // Проходим ":"
            index++;
            // Парсим значение
            const value = parseValue();
            // Сохраняем пару ключ и значение в объекте
            obj[key] = value;

            // Если найдена запятая, продолжаем парсинг
            if (jsonString[index] === ",") {
                index++;
            }
            // Если текущий символ не является ни запятой ни закрывающей скобкой, то выбрасываем ошибку
            else if (jsonString[index] !== "}") {
                throw new SyntaxError(`Unexpected token: ${jsonString[index]}`);
            }
        }

        throw new SyntaxError("Unterminated object");
    };

    const result = parseValue();

    // Проверяем, что весь json был обработан
    if (index !== jsonString.length) {
        throw new SyntaxError(`Unexpected token: ${jsonString[index]}`);
    }

    return result;
};

const jsonString = '{"name":"John","age":30,"isAdmin":true,"salary":1250.75,"city":"New York","nullValue":null,"child":{"test":["a",12,true]}}';
const parsedObject = stringToJSON(jsonString);
console.log(parsedObject);
