# Задача о замыканиях

## [Реализация](./index.js)

## Постановка 
- Напишите функцию, которая будет принимать массив функций и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

## Реализованные функции
- ```javascript
  getResultsExecutingFunctions(functionArray);
  ```
  - Возвращает функцию, которая принимает входное значение и выполняет каждую функцию из массива functionArray, возвращая массив результатов.
  - **functionArray** - массив функций.

- ```javascript
  executeFunctions(functionsArray)
  ```
  - Возвращает функцию, принимающую переменное число аргументов и вызывающую каждую функцию из массива functionsArray, возвращая массив результатов.
  - **functionsArray** - массив функций.

- ```javascript
  processFunctions(inputNumber)
  ```
  - Функция, созданная с использованием **_getResultsExecutingFunctions_**, выполняющая каждую функцию из массива functionArray с входным числом и возвращающая массив результатов.

- ```javascript
  combinedFunction(...args)
  ```
  -  Функция, созданная с использованием **_executeFunctions_**, вызывающая каждую функцию из массива **functionArray** с переменным числом аргументов и возвращающая массив результатов.

- ```javascript
  results
  ```
  - Массив результатов выполнения функции **_processFunctions_** с входным числом.

- ```javascript
  resultsV2
  ```
  - Массив результатов выполнения функции **_combinedFunction_** с входным числом.