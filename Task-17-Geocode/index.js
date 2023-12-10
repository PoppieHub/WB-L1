// Базовый URL для запросов с Yandex API
const BASE_URL = 'https://geocode-maps.yandex.ru/1.x/?apikey=38a0413e-9a4b-477c-b2f8-c35b866b6d5b&geocode=';

// Получение элементов из DOM
const inputElement = document.getElementById('input');
const selectElement = document.getElementById('select-location');

// Функция для формирования полного URL с запросом
const getURL = request => `${BASE_URL}${request}&format=json`;

// Асинхронная функция для запроса геоданных
async function fetchGeoData(query) {
    if (!query) {
        return [];
    }

    try {
        const response = await fetch(getURL(query));

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        return data.response.GeoObjectCollection.featureMember;
    } catch (error) {
        console.error('Error fetching geocoding data:', error.message);
        return [];
    }
}

// Функция для добавления debounce асинхронным функциям
const debounceAsync = (func, delay) => {
    let timerID = null;

    return async (...args) => {
        clearTimeout(timerID);
        return new Promise(resolve => {
            timerID = setTimeout(async () => {
                const result = await func(...args);
                resolve(result);
            }, delay);
        });
    }
}

// Функция для обновления вариантов выбора в выпадающем списке
function updateOptions(addresses) {
    removeOptions(Array.from(selectElement.options), option => option.value !== 'none');

    if (!addresses || addresses.length === 0) {
        return;
    }

    addresses.forEach(address => {
        const option = document.createElement('option');
        option.value = option.textContent = `${address.GeoObject.name}, ${address.GeoObject.description}`;
        selectElement.append(option);
    });
}

// Функция для удаления опций из выпадающего списка на основе критерия
function removeOptions(options, criteria) {
    const optionsToRemove = options.filter(criteria);
    optionsToRemove.forEach(option => option.remove());
}

// Обработчик события ввода текста в поле ввода
function handleInput(event) {
    const value = event.target.value;
    debouncedFetch(value).then(updateOptions);
}

// Обработчик события выбора элемента из выпадающего списка
function handleSelectChange(event) {
    inputElement.value = event.target.value;
}

// Создание функции fetchGeoData с debounce
const debouncedFetch = debounceAsync(fetchGeoData, 300);

// Добавление слушателей событий
inputElement.addEventListener('input', handleInput);
selectElement.addEventListener('change', handleSelectChange);
