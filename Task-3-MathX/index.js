const MathX = (function () {

    // Функция для кеширования результатов работы функции
    function memo(func) {
        // Объект для хранения кешированных результатов, создается при каждом вызове функции и хранится в замыкании
        const cache = {};

        // Возвращаем функцию-обертку, принимающую параметр x
        return function(x) {
            // Если в кеше уже есть результат для данного параметра x, возвращаем его
            if (cache[x] !== undefined) {
                return cache[x];
            }

            // Если результата нет в кеше, вызываем переданную функцию func с параметром x
            const result = func(x);

            // Сохраняем полученный результат в кеше для будущих вызовов с тем же параметром x
            cache[x] = result;

            // Возвращаем результат вызова функции func с параметром x
            return result;
        };
    }

    // Функция для проверки, является ли число простым
    function isPrime(number) {
        // Обрабатываем все простые случаи
        if (number <= 1) return false;
        if (number <= 3) return true;
        if (number % 2 === 0 || number % 3 === 0) return false;

        // Если число составное, то хотя бы один из его множителей должен быть не больше квадратного корня этого числа
        for (let i = 2; i * i <= number; i++) {
            // Если текущее число является делителем, то исходное число не является простым
            if (number % i === 0) {
                return false;
            }
        }

        // Если все предыдущие проверки не сработали, значит число является простым
        return true;
    }

    return {
        // Нахождение N-ого члена последовательности Фибоначчи
        fibonacci: memo((n) => {
            // База рекурсии
            if (n <= 0) return 0;
            if (n === 1) return 1;

            // Шаг рекурсии - вычисляем сумму двух соседних чисел
            return (MathX.fibonacci(n - 1) + MathX.fibonacci(n - 2))
        }),
        // Нахождение всех членов последовательности Фибоначчи до N
        fibonacciSeries: memo((n) => {
            const series = [];

            // Вычисляем каждый член последовательности до тех пор, пока не вычислим N-ый член
            for (let i = 1; i <= n; i++) {
                series.push(MathX.fibonacci(i));
            }

            return series;
        }),
        // Нахождение N-ого простого числа
        nthPrime: memo((n) => {
            // Первое простое число === 2
            if (n === 1) return 2;
            // Счетчик для простых чисел
            let count = 1;
            // В качестве начального простого числа берем 3
            let num = 3;

            // Пока количество найденных простых чисел не равно нужному
            while (count < n) {
                // Если текущее число является простым, инкрементируем счетчик
                if (isPrime(num)) {
                    count++;
                }
                // Увеличиваем проверяемое число на 2, т.к. простое число не может быть четным
                num += 2;
            }
            // Когда количество простых чисел стало равно нужному, возвращаем предыдущее проверенное число
            return num - 2;
        }),
        // Нахождение всех простых чисел до N
        primeSeries: memo((n) => {
            const series = [];

            // Находим каждое простое число и сохраняем его, до тех пор, пока не дойдем до числа N
            for (let i = 2; i <= n; i++) {
                if (isPrime(i)) {
                    series.push(i)
                }
            }

            return series;
        })
    }
})();

// Вычисление N-го числа в ряду Фибоначчи
console.log(MathX.fibonacci(5)); // return 5
// Вычисление всех чисел в ряду Фибоначчи до числа N
console.log(MathX.fibonacciSeries(8)); // return [0, 1, 1, 2, 3, 5, 8, 13, 21]
// Вычисление N-го простого числа
console.log(MathX.nthPrime(3)); // return 5
// Вычисление всех простых чисел до числа N
console.log(MathX.primeSeries(10)); // return [2, 3, 5, 7]
// Повторный вызов функции fibonacci для того же значения
console.log(MathX.fibonacci(5)); // Результат будет взят из кеша, не будет повторного вычисления
// Повторный вызов функции nthPrime для того же значения
console.log(MathX.nthPrime(3)); // Результат будет взят из кеша, не будет повторного вычисления
