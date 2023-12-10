// Функция для извлечения данных из формы
const extractFormData = form => {
    // Получаем все элементы формы
    const formElements = form.elements;
    // Объект для хранения данных формы
    const formData = {};

    // Итерация по элементам формы
    for (const element of formElements) {
        // Обработка каждого элемента формы
        processFormElement(element, formData);
    }

    // Возвращаем собранные данные
    return formData;
}

// Вспомогательная функция для обработки отдельного элемента формы
const processFormElement = (element, formData) => {
    // Получаем имя элемента
    const elementName = element.name;

    // Проверяем, есть ли имя у элемента
    if (elementName) {
        // В зависимости от типа элемента собираем его значение
        if (element.type === 'select-one' && element.options.length > 0) {
            // Для элемента <select> сохраняем выбранное значение
            formData[elementName] = element.options[element.selectedIndex].value;
        } else {
            // Для остальных элементов сохраняем их значение
            formData[elementName] = element.value;
        }
    }
}

// Функция для отправки данных на сервер
const sendDataToServer = async (data, url) => {
    // Опции для запроса
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        // Отправляем запрос на сервер
        const response = await fetch(url, requestOptions);

        // Проверяем успешность запроса
        if (!response.ok) {
            // Если запрос не успешен, выбрасываем ошибку
            throw new Error('Ошибка при отправке данных на сервер. Статус ошибки: ' + response.status);
        }

        // Возвращаем ответ сервера в формате JSON
        return response.json();
    } catch (error) {
        // В случае ошибки возвращаем объект ошибки
        return error;
    }
}

// Пример использования:
// Извлекаем данные из формы
const formData = extractFormData(document.querySelector('#form'));
try {
    // Отправляем данные на сервер и выводим результат
    const sendResult = await sendDataToServer(formData, 'some-url');
    console.log(sendResult);
} catch (error) {
    // В случае ошибки выводим ее в консоль
    console.error(error);
}
