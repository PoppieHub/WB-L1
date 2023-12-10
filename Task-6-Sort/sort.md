# Задача о сортировке объектов

## [Реализация](./index.js)

## Постановка 
- Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. Напишите код, который сортирует этот массив по возрастанию возраста, а при равных возрастах сортирует по алфавиту по полю name.


## Реализованные сортировки
- Сортировка встроенным методом `sort`;
    ```javascript
    const sortedPeople = people.sort(comparePeople);
    ```
- Сортировка пузырьком `bubbleSort`;
    ```javascript
    const bubbleSortPeople = bubbleSort(people.slice(), comparePeople);
    ```
    Проходим по массиву, сравниваем соседние элементы и меняем их местами, если необходимо. Повторяем этот процесс до тех пор, пока массив не станет отсортированным.


- Сортировка слиянием `mergeSort`;
    ```javascript
    const mergeSortPeople = mergeSort(people.slice(), comparePeople);
    ```
  Рекурсивно разделяем массив пополам, сортируем каждую половину и затем объединяем их в отсортированный массив.


- Быстрая сортировка `quickSort`;
    ```javascript
    const quickSortPeople = quickSort(people.slice(), comparePeople);
    ```
  Выбираем опорный элемент, разделяем массив на элементы меньше, равные и больше опорного, затем рекурсивно сортируем эти подмассивы и объединяем их.


- Сортировка вставками `insertionSort`;
    ```javascript
    const insertionSortPeople = insertionSort(people.slice(), comparePeople);
    ```
  Проходим по массиву, вставляя каждый элемент на правильное место в отсортированной части массива.


- Сортировка выбором `selectionSort`;
    ```javascript
    const selectionSortPeople = selectionSort(people.slice(), comparePeople);
    ```
  На каждом шаге выбираем минимальный элемент из оставшейся части массива и обмениваем его с первым неотсортированным элементом.