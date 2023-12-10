// Получаем ссылку на элемент списка постов и виджет
const postList = document.querySelector(".post-list");
const widget = document.querySelector(".widget");

// Массив для хранения HTML-элементов постов и кэшированных данных
let posts = [];
let arrSave = [];

// Флаг для отслеживания состояния запроса данных
let isLoading = false;

// Смещение для запроса новых постов
let offset = 0;

// Ключ для доступа к данным в localStorage
const localStorageKey = "cachedPosts";

// Максимальный размер localStorage для кэшированных постов
const sizeLocalStorage = 5 * 1024 * 1024;

// Функция обратного вызова при получении данных от сервера
const callbackFunc = (result) => {
    // Создаем посты и отображаем их
    createPost(result.response.items);
    // Устанавливаем флаг загрузки в false
    isLoading = false;
    // Сохраняем полученные данные в localStorage
    saveData(result.response.items);
};

// Функция для запроса новых постов
const getPosts = () => {
    // Проверяем, не выполняется ли запрос уже
    if (!isLoading) {
        // Устанавливаем флаг загрузки в true
        isLoading = true;

        // Параметры запроса к API VK
        const owner_id = -1;
        const v = 5.131;
        const access_token =
            "0522010205220102052201028e0634960500522052201026057bdaedbfbb6254717fc38";
        const count = 20;
        const callback = "callbackFunc";

        // Создаем и добавляем скрипт в head документа
        const script = document.head.appendChild(document.createElement("script"));
        script.src = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&v=${v}&access_token=${access_token}&count=${count}&offset=${offset}&callback=${callback}`;

        // Увеличиваем смещение для следующего запроса
        offset += count;
    }
};

// Функция для создания HTML-элементов постов и их отображения
const createPost = (data) => {
    // Опции форматирования даты
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    // Итерируем по данным и создаем HTML-элементы для каждого поста
    data.forEach((item) => {
        const postElement = `<li class="post-list__item">
          <div class="post-list__item__text">${item.text}</div>
          <div class="post-list__item__subText">
            <div class="post-list__item__date">${new Date(
            item.date * 1000
        ).toLocaleString("ru", options)}</div>
            <div class="post-list__item__subInfo">
              <div class="post-list__item__likes"><p>Лайки</p>${item.likes?.count}</div>
              <div class="post-list__item__reposts"><p>Репосты</p>${item.reposts?.count}</div>
              <div class="post-list__item__views"><p>Просмотры</p>${item.views?.count}</div>
              <div class="post-list__item__comments"><p>Комментарии</p>${item.comments?.count}</div>
            </div>
          </div>
        </li>`;
        // Добавляем HTML-элемент поста в массив
        posts.push(postElement);
    });

    // Обновляем содержимое списка постов
    postList.innerHTML = posts.join("");
};

// Функция для загрузки кэшированных данных при запуске виджета
const loadCachedData = () => {
    // Получаем данные из localStorage
    const cachedData = localStorage.getItem(localStorageKey);

    // Если данные есть, отображаем их
    if (cachedData) {
        // Парсим данные из localStorage в массив постов
        const saveData = JSON.parse(cachedData);
        // Устанавливаем смещение на количество кэшированных постов
        offset = saveData.length;
        // Рендерим сохраненные данные
        createPost(saveData);
    } else {
        // Если нет, запрашиваем новые данные
        getPosts();
    }
};

// Слушаем событие прокрутки виджета и подгружаем новые посты
widget.addEventListener("scroll", () => {
    // Получаем размеры виджета
    const documentRect = postList.getBoundingClientRect();
    // Проверяем, долистал ли пользователь до конца
    if (documentRect.bottom <= widget.clientHeight + 150) {
        // Подгружаем новые посты
        getPosts();
    }
});

// Функция для кэширования данных в localStorage
const saveData = (data) => {
    // Обновляем массив сохраненных данных
    arrSave = [...arrSave, ...data];

    // Получаем текущий размер localStorage
    let currentStorageSize = (localStorage.getItem(localStorageKey) || "").length;

    // Пока размер новых данных с учетом текущего размера localStorage больше максимального размера,
    // удаляем старые данные
    while (JSON.stringify(posts).length + currentStorageSize > sizeLocalStorage) {
        // Удаляем самые старые данные из массива
        const newPosts = JSON.parse(localStorage.getItem(localStorageKey));
        newPosts.shift();
        // Пересчитываем размер localStorage после удаления поста
        currentStorageSize = (JSON.stringify(localStorage.getItem("data")) || "").length;
    }

    // Обновляем localStorage с новыми данными
    localStorage.setItem(localStorageKey, JSON.stringify(arrSave));
};

// Запускаем загрузку кэшированных данных при старте виджета
loadCachedData();
