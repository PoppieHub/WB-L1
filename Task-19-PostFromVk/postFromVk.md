# Задача на виджет, отображающий список постов из любого паблика в VK

## [Реализация](./index.js)

## Постановка 
- Виджет должен иметь фиксированные размеры и возможность прокрутки. 
- При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
- Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
- При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.


## Реализованные функции
- `callbackFunc(result)`
  - Функция **callback**, вызываемая после получения данных от сервера VK.
  - Принимает объект `result` с полем `response`, содержащим массив постов.
  - Вызывает функции `createPost` для создания html-элементов и `saveData` для сохранения данных.


- `getPosts()`
  - Функция для запроса новых постов с сервера VK.
  - Использует параметры API VK, создает скрипт и добавляет его в head документа.
  - Увеличивает смещение для следующего запроса.


- `createPost(data)`
  - Функция для создания html-элементов постов на основе полученных данных.
  - Использует массив данных `data` для создания html-элементов и добавляет их в массив `posts`.
  - Обновляет содержимое списка постов на странице.


- `loadCachedData()`
  - Функция для загрузки кэшированных данных при запуске виджета.
  - Получает данные из `localStorage` и отображает их при их наличии, в противном случае запускает запрос новых данных.


- `saveData(data)`
  - Функция для кэширования данных в `localStorage`.
  - Обновляет массив `arrSave` данными из `data`.
  - При переполнении `localStorage` вытесняет старые данные.
  - Обновляет `localStorage` с новыми данными.


- `EventListener для scroll на виджете`
  - Слушатель события прокрутки виджета.
  - При достижении конца виджета подгружает новые посты.