// Задаем максимальный размер хранилища в байтах
const sizeLocalStorage = 5 * 1024 * 1024;

// Добавляем слушатель события storage для отслеживания изменений в localStorage
window.addEventListener("storage", updateLocalStorageUsageInfo);

// Функция для обновления информации о занятой памяти в localStorage
function updateLocalStorageUsageInfo() {
    // Общий размер занятой памяти в localStorage
    let fullUsedLocalStorage = 0;

    // Проходим по всем ключам localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // Суммируем длину ключа и значения
        fullUsedLocalStorage += key.length + value.length;
    }

    // Выводим информацию в консоль
    console.log("Объем занятой памяти:", fullUsedLocalStorage);
    console.log("Максимальный размер хранилища:", sizeLocalStorage);
    console.log(
        "Объем занятой памяти в процентах:",
        ((fullUsedLocalStorage / sizeLocalStorage) * 100).toFixed(2) + "%"
    );
}

// Пример явного изменения данных в localStorage в текущей вкладке
const newData = { example: "data" };
localStorage.setItem("cachedPosts", JSON.stringify(newData));

// Вызываем функцию для обновления информации
updateLocalStorageUsageInfo();
