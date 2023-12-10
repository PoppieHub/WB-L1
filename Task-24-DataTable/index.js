// URL для загрузки данных с сервера
const URL = 'http://www.filltext.com/?rows=1000&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&pretty=true';

// Получаем элементы DOM
const tableWrapper = document.querySelector('.table-wrapper');
const pagination = document.querySelector('.pagination');

// Режимы сортировки
const sortModes = {
    none: 'none',
    ascending: 'ascending',
    descending: 'descending'
};

// Переменные состояния
let sortMode = sortModes.none;
let activeSortingID = '';
let itemsAll = [];
let itemsShown = [];
const itemsShownNumber = 50;

// Асинхронная функция для загрузки данных с сервера
const fetchItems = async () => {
    try {
        const result = await fetch(URL);
        return await result.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Инициализация приложения после загрузки данных
fetchItems().then(res => {
    itemsAll = res;
    itemsShown = itemsAll.slice(0, itemsShownNumber);
    init(itemsShown);
});

// Функция для создания кнопок пагинации
const createPagination = (parent) => {
    // Количество страниц
    const pages = Math.ceil(itemsAll.length / itemsShownNumber);

    for (let i = 1; i <= pages; i++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.page = i;
        button.textContent = i;
        button.className = i === 1 ? 'pagination-button active' : 'pagination-button';

        parent.append(button);
    }
};

// Функция для создания таблицы
const createTable = (items, parent) => {
    const table = document.createElement('table');
    table.className = 'table';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Создаем заголовок таблицы
    const headRow = createRow(items[0], 'th');
    updateBody(tbody, items);

    thead.append(headRow);
    table.append(thead);
    table.append(tbody);

    parent.append(table);
};

// Функция для создания строк таблицы
const createRow = (item, cell = 'td') => {
    const row = document.createElement('tr');

    for (const key in item) {
        const cellHTML = document.createElement(cell);
        if (cell === 'th') {
            const button = createSortButton(key);
            cellHTML.append(button);
        } else {
            cellHTML.textContent = item[key];
        }
        row.append(cellHTML);
    }

    return row;
};

// Функция для создания кнопки сортировки
const createSortButton = (key) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = key;
    button.className = 'sort-none';
    button.textContent = key;
    button.append(document.createElement('span'));
    return button;
};

// Функция для обновления содержимого tbody таблицы
const updateBody = (tbody, items) => {
    // Очищаем текущие значения
    tbody.innerHTML = '';

    for (const item of items) {
        // Создаем новые строки и добавляем их в tbody
        const row = createRow(item);
        tbody.append(row);
    }
};

// Инициализация при загрузке страницы
const init = (items) => {
    createPagination(pagination);
    createTable(items, tableWrapper);

    // Добавляем обработчики событий для кнопок сортировки
    const sortButtons = document.querySelectorAll('th button');
    sortButtons.forEach(button => {
        button.addEventListener('click', changeSortingMode);
    });

    // Добавляем обработчики событий для кнопок пагинации
    const pageButtons = document.querySelectorAll('.pagination-button');
    pageButtons.forEach(button => {
        button.addEventListener('click', changePage);
    });
};

// Обработчик события для переключения страницы
const changePage = (event) => {
    const button = event.currentTarget;
    const page = button.dataset.page;
    itemsShown = itemsAll.slice(itemsShownNumber * (page - 1), itemsShownNumber * page);
    updateBody(document.querySelector('tbody'), itemsShown);
    resetPreviousSorting();

    // Обновляем классы активных кнопок пагинации
    document.querySelectorAll('.pagination-button').forEach(btn => {
        btn.classList.toggle('active', btn === button);
    });
};

// Функция для сортировки таблицы по одному полю
const sort = (sortMode, property) => {
    itemsShown.sort((a, b) => {
        // В порядке возрастания
        if (sortMode === 'ascending') {
            // Если свойство, по которому сортируем, является числом, сортируем стандартным образом
            return typeof a[property] === 'number' ? a[property] - b[property] : a[property].localeCompare(b[property]);
        }
        // В порядке убывания
        else if (sortMode === 'descending') {
            return typeof a[property] === 'number' ? b[property] - a[property] : b[property].localeCompare(a[property]);
        }
    });
};

// Обработчик события для изменения режима сортировки
const changeSortingMode = (event) => {
    const button = event.currentTarget;

    // Если по выбранному полю уже стоит сортировка, то меняем способ сортировки на следующий из списка sortModes
    if (activeSortingID === button.id) {
        // Получаем значения режимов сортировки из объекта sortModes
        const modeValues = Object.values(sortModes);
        const currentModeIndex = modeValues.indexOf(sortMode);
        // Используем остаток от деления для циклического перехода к следующему режиму
        sortMode = modeValues[(currentModeIndex + 1) % modeValues.length];
    }
    // Если по выбранному полю сортировка не стоит, устанавливаем значение сортировки в ascending
    else {
        sortMode = sortModes.ascending;
        activeSortingID = button.id;
    }

    // Выполняем сортировку
    sort(sortMode, activeSortingID);
    // Обновляем таблицу с учетом сортировки
    updateBody(document.querySelector('tbody'), itemsShown);
    // Обновляем иконку сортировки
    changeSortingIcon(button, sortMode);
};

// Функция для смены иконки сортировки
const changeSortingIcon = (button, sortMode) => {
    resetPreviousSorting(button);
    button.className = `sort-${sortMode}`;
};

// Функция для сброса иконок предыдущих сортировок
const resetPreviousSorting = (currentButton) => {
    const buttonsToReset = document.querySelectorAll('th button:not(.sort-none)');

    if (buttonsToReset.length > 0) {
        buttonsToReset.forEach(button => {
            if (!currentButton || button.id !== currentButton.id) {
                button.className = 'sort-none';
            }
        });
    }
};
