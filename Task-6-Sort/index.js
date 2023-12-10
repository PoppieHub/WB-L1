const people = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 22 },
];

// Функция сравнения для сортировки
const comparePeople = (person1, person2) => {
    // Сначала сравниваем возраст
    if (person1.age !== person2.age) {
        return person1.age - person2.age;
    }

    // Если возрасты равны, сравниваем по имени
    return person1.name.localeCompare(person2.name);
};

// Функция сортировки пузырьком O(n^2)
const bubbleSort = (array, compareFunction) => {
    const n = array.length;
    let swapped;

    // Повторяем проходы по массиву, пока не будет отсортирован
    do {
        swapped = false;

        // Проходим по элементам массива
        for (let i = 0; i < n - 1; i++) {
            // Сравниваем элементы с использованием функции сравнения
            if (compareFunction(array[i], array[i + 1]) > 0) {
                // Меняем местами элементы, если нужно
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
    } while (swapped);

    // Возвращаем отсортированный массив
    return array;
};

// Функция слияния
const merge = (left, right, compareFunction) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Сравниваем элементы левого и правого подмассивов и объединяем их в отсортированный массив
    while (leftIndex < left.length && rightIndex < right.length) {
        if (compareFunction(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Добавляем оставшиеся элементы из левого и правого подмассивов
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

// Функция сортировки слиянием O(n log n)
const mergeSort = (array, compareFunction) => {
    // если массив содержит 1 элемент или менее, то он уже отсортирован
    if (array.length <= 1) {
        return array;
    }

    // находим средний индекс массива
    const middle = Math.floor(array.length / 2);

    // Разбиваем массив на левую и правую части
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Рекурсивно сортируем левую и правую части
    return merge(
        mergeSort(left, compareFunction),
        mergeSort(right, compareFunction),
        compareFunction
    );
};

// Функция быстрой сортировки O(n log n)
const quickSort = (array, compareFunction) => {
    // если массив пуст или содержит 1 элемент, то он уже отсортирован
    if (array.length <= 1) {
        return array;
    }

    // Выбираем опорный элемент из массива
    const elm = array[0];

    // Разделяем массив на элементы, меньшие опорного, равные опорному и большие опорного
    const less = array.filter(item => compareFunction(item, elm) < 0);
    const equal = array.filter(item => compareFunction(item, elm) === 0);
    const greater = array.filter(item => compareFunction(item, elm) > 0);

    // Рекурсивно сортируем подмассивы и объединяем их
    return quickSort(less, compareFunction).concat(equal, quickSort(greater, compareFunction));
};

// Функция сортировки вставками O(n)
const insertionSort = (array, compareFunction) => {
    const n = array.length;

    for (let i = 1; i < n; i++) {
        // Запоминаем текущий элемент
        const currentElement = array[i];
        let j = i - 1;

        // Сравниваем текущий элемент с предыдущими и сдвигаем их вправо, пока не найдем правильное место
        while (j >= 0 && compareFunction(array[j], currentElement) > 0) {
            array[j + 1] = array[j];
            j--;
        }

        // Вставляем текущий элемент на правильное место
        array[j + 1] = currentElement;
    }

    return array;
};

// Функция сортировки выбором
const selectionSort = (array, compareFunction) => {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Находим индекс минимального элемента в оставшейся части массива
        for (let j = i + 1; j < n; j++) {
            if (compareFunction(array[j], array[minIndex]) < 0) {
                minIndex = j;
            }
        }

        // Обмениваем минимальный элемент с текущим элементом
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    return array;
};

// Сортировка массива объектов с использованием встроенного метода sort O(n log n)
const sortedPeople = people.sort(comparePeople);
// Создаем копию массива перед сортировкой, чтобы не изменять исходный
const bubbleSortPeople = bubbleSort(people.slice(), comparePeople);
const mergeSortPeople = mergeSort(people.slice(), comparePeople);
const quickSortPeople = quickSort(people.slice(), comparePeople);
const insertionSortPeople = insertionSort(people.slice(), comparePeople);
const selectionSortPeople = selectionSort(people.slice(), comparePeople);
