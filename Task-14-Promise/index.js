// URL изображения
const imageUrl = 'https://leconceptmarketing.com/wp-content/uploads/2023/05/image-13.png';

// Функция для загрузки изображения и возврата промиса
const loadImage = url => {
    // Возвращаем новый промис, который разрешится после загрузки изображения
    return new Promise((resolve, reject) => {
        // Создаем новый объект Image
        const image = new Image();

        // Устанавливаем обработчик для успешной загрузки изображения
        image.onload = () => {
            // Разрешаем промис с данными об изображении
            resolve({
                width: image.width,
                height: image.height,
                src: url
            });
        };

        // Устанавливаем обработчик для ошибки загрузки изображения
        image.onerror = () => {
            // Отклоняем промис в случае ошибки загрузки изображения
            reject(new Error(`Не удалось загрузить изображение с ${url}`));
        };

        // Устанавливаем URL изображения для загрузки
        image.src = url;
    });
}

// Через fetch
const loadImageFetch = url => {
    // Используем fetch для загрузки данных изображения
    return fetch(url)
        .then(response => {
            // Проверяем успешность запроса
            if (!response.ok) {
                throw new Error(`Не удалось загрузить изображение. Код ошибки: ${response.status}`);
            }

            // Преобразуем данные в формат Blob
            return response.blob();
        })
        .then(blob => {
            // Создаем URL из Blob
            const imageUrl = URL.createObjectURL(blob);

            // Создаем новый объект Image
            const image = new Image();

            // Устанавливаем обработчик для успешной загрузки изображения
            return new Promise((resolve, reject) => {
                image.onload = () => {
                    // Разрешаем промис с данными об изображении
                    resolve({
                        width: image.width,
                        height: image.height,
                        src: imageUrl
                    });
                };

                // Устанавливаем обработчик для ошибки загрузки изображения
                image.onerror = () => {
                    // Отклоняем промис в случае ошибки загрузки изображения
                    reject(new Error(`Не удалось загрузить изображение с ${url}`));
                };

                // Устанавливаем URL изображения для загрузки
                image.src = imageUrl;
            });
        });
}

// Альтернатива с использованием XMLHttpRequest
const loadImageXHR = url => {
    // Возвращаем новый промис, который разрешится после загрузки изображения
    return new Promise((resolve, reject) => {
        // Создаем новый объект XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Устанавливаем обработчик для успешной загрузки изображения
        xhr.onload = () => {
            // Проверяем успешность запроса
            if (xhr.status === 200) {
                // Преобразуем данные в формат Blob
                const blob = new Blob([xhr.response], { type: 'image/png' });

                // Создаем URL из Blob
                const imageUrl = URL.createObjectURL(blob);

                // Создаем новый объект Image
                const image = new Image();

                // Устанавливаем обработчик для успешной загрузки изображения
                image.onload = () => {
                    // Разрешаем промис с данными об изображении
                    resolve({
                        width: image.width,
                        height: image.height,
                        src: imageUrl
                    });
                };

                // Устанавливаем обработчик для ошибки загрузки изображения
                image.onerror = () => {
                    // Отклоняем промис в случае ошибки загрузки изображения
                    reject(new Error(`Не удалось загрузить изображение с ${url}`));
                };

                // Устанавливаем URL изображения для загрузки
                image.src = imageUrl;
            } else {
                // Отклоняем промис в случае ошибки запроса
                reject(new Error(`Не удалось загрузить изображение. Код ошибки: ${xhr.status}`));
            }
        };

        // Устанавливаем обработчик для ошибки загрузки изображения
        xhr.onerror = () => {
            // Отклоняем промис в случае ошибки загрузки изображения
            reject(new Error(`Не удалось загрузить изображение с ${url}`));
        };

        // Инициируем GET-запрос для загрузки данных изображения
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();
    });
};

// Вызываем функцию загрузки изображения и обрабатываем результаты
loadImage(imageUrl)
    .then(data => {
        // Выводим данные об изображении при успешной загрузке
        console.log('Изображение успешно загружено:', data);
    })
    .catch(error => {
        // Выводим ошибку в случае неудачной загрузки изображения
        console.error('Ошибка загрузки изображения:', error.message);
    });

loadImageFetch(imageUrl)
    .then(data => {
        // Выводим данные об изображении при успешной загрузке
        console.log('Изображение успешно загружено:', data);
    })
    .catch(error => {
        // Выводим ошибку в случае неудачной загрузки изображения
        console.error('Ошибка загрузки изображения:', error.message);
    });

loadImageXHR(imageUrl)
    .then(data => {
        // Выводим данные об изображении при успешной загрузке
        console.log('Изображение успешно загружено (XMLHttpRequest):', data);
    })
    .catch(error => {
        // Выводим ошибку в случае неудачной загрузки изображения
        console.error('Ошибка загрузки изображения (XMLHttpRequest):', error.message);
    });