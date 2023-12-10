// Базовый класс Shape
class Shape {
    constructor() {
        /* Проверяет, вызывается ли конструктор напрямую для абстрактного класса.
           new.target предоставляет информацию о конструкторе, который был вызван с использованием new
         */
        if (new.target === Shape) {
            throw new Error("Невозможно создать экземпляр абстрактного класса");
        }
    }

    // Метод для расчета площади (абстрактный метод)
    calculateArea() {
        throw new Error("Метод calculateArea должен быть реализован.");
    }

    // Метод для расчета периметра (абстрактный метод)
    calculatePerimeter() {
        throw new Error("Метод calculatePerimeter должен быть реализован.");
    }
}

// Подкласс Rectangle (прямоугольник)
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    // Реализация метода для расчета площади прямоугольника
    calculateArea() {
        return this.width * this.height;
    }

    // Реализация метода для расчета периметра прямоугольника
    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}

// Подкласс Circle (круг)
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    // Реализация метода для расчета площади круга
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }

    // Реализация метода для расчета периметра круга
    calculatePerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// Подкласс Triangle (треугольник)
class Triangle extends Shape {
    constructor(sideA, sideB, sideC) {
        super();
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    // Реализация метода для расчета площади треугольника по формуле Герона
    calculateArea() {
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }

    // Реализация метода для расчета периметра треугольника
    calculatePerimeter() {
        return this.sideA + this.sideB + this.sideC;
    }
}

// Создаем экземпляр
const rectangle = new Rectangle(5, 8);
console.log("Площадь прямоугольника:", rectangle.calculateArea());
console.log("Периметр прямоугольника:", rectangle.calculatePerimeter());

const circle = new Circle(4);
console.log("Площадь круга:", circle.calculateArea());
console.log("Периметр круга:", circle.calculatePerimeter());

const triangle = new Triangle(3, 4, 5);
console.log("Площадь треугольника:", triangle.calculateArea());
console.log("Периметр треугольника:", triangle.calculatePerimeter());
