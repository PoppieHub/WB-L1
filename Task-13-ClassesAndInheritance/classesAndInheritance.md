# Задача на классы и наследование

## [Реализация](./index.js)

## Постановка 
- Cоздайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.

## Реализованные функции
- Абстрактный класс `Shape`
    - **Конструктор:** `constructor()`
      - Проверяет, вызывается ли конструктор напрямую для абстрактного класса.
      - Если вызывается, валится с ошибкой: "Невозможно создать экземпляр абстрактного класса."

    - **Метод:** `calculateArea()`
        - Абстрактный метод.
        - Валится с ошибкой: "Метод 'calculateArea' должен быть реализован."

    - **Метод:** `calculatePerimeter()`
        - Абстрактный метод.
        - Валится с ошибкой: "Метод 'calculatePerimeter' должен быть реализован."


- Класс `Rectangle extends Shape`
    - **Конструктор:** `constructor(width, height)`
        - Инициализирует ширину и высоту прямоугольника.
      
    - **Метод:** `calculateArea()`
        - Рассчитывает и возвращает площадь прямоугольника.

    - **Метод:** `calculatePerimeter()`
        - Рассчитывает и возвращает периметр прямоугольника.


- Класс `Circle extends Shape`
    - **Конструктор:** `constructor(radius)`
        - Инициализирует радиус круга.

    - **Метод:** `calculateArea()`
        - Рассчитывает и возвращает площадь круга.

    - **Метод:** `calculatePerimeter()`
        - Рассчитывает и возвращает периметр круга.


- Класс `Triangle extends Shape`
    - **Конструктор:** `constructor(sideA, sideB, sideC)`
        - Инициализирует радиус круга.

    - **Метод:** `calculateArea()`
        - Рассчитывает и возвращает площадь треугольника по формуле Герона.

    - **Метод:** `calculatePerimeter()`
        - Рассчитывает и возвращает периметр треугольника.
