// Функция для добавления анимации
const addAnimation = (elementId, duration) => {
    // Получаем ссылку на элемент по его идентификатору
    const element = document.getElementById(elementId);

    // Получаем время начала анимации
    let start = performance.now();

    // Вызываем первую отрисовку шага анимации через requestAnimationFrame
    requestAnimationFrame(function animateFrame(time) {
        // Вычисляем временную долю анимации (от 0 до 1)
        let timeFraction = (time - start) / duration;

        // Ограничиваем временную долю до 1, чтобы избежать превышения
        if (timeFraction > 1) timeFraction = 1;

        // Вычисляем состояние анимации на основе временной доли
        let progress = timing(timeFraction);

        // Отрисовываем новое состояние элемента на текущем шаге анимации
        draw(progress);

        // Если анимация еще не завершилась, вызываем следующий кадр анимации
        if (timeFraction < 1) {
            requestAnimationFrame(animateFrame);
        }
    });

    // Функция для определения, как будет изменяться анимация со временем
    const timing = timeFraction => {
        // Изменение анимации с квадратичным законом для примера
        return timeFraction ** 2;
    }

    // Функция для вычисления текущего состояния элемента по значению прогресса анимации
    const draw = progress => {
        // Пример изменения масштаба элемента (от 1 до 2)
        element.style.transform = `scale(${progress + 1})`;
    }
};

// Вызываем функцию с анимацией при загрузке страницы
addAnimation('animatedElement', 3000);
