# Задача на пагинацию страниц с таблицами данных приходящих с сервера.
## [Реализация](./index.js)

## Постановка
- Разработайте страницу, отображающую таблицу с данными. 
- Данные необходимо подгружать из [этого источника](http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true).
- Данные должны загружаться при загрузке страницы.
- Необходимо реализовать сортировку по убыванию и по возрастания для всех колонок.
- Необходимо реализовать клиентскую пагинацию (50 элементов на странице).


## Реализованные функции

- `fetchItems`: Асинхронная функция для загрузки данных с сервера.


- `createPagination(parent)`: Функция для создания кнопок пагинации.


- `createTable(items, parent)`: Функция для создания таблицы.


- `createRow(item, cell = 'td')`: Функция для создания строк таблицы.


- `createSortButton(key)`: Функция для создания кнопки сортировки.


- `updateBody(tbody, items)`: Функция для обновления содержимого tbody таблицы.


- `init(items)`: Инициализация при загрузке страницы.


- `changePage(event)`: Обработчик события для переключения страницы.


- `sort(sortMode, property)`: Функция для сортировки таблицы по одному полю.


- `changeSortingMode(event)`: Обработчик события для изменения режима сортировки.


- `changeSortingIcon(button, sortMode)`: Функция для смены иконки сортировки.


- `resetPreviousSorting(currentButton)`: Функция для сброса иконок предыдущих сортировок.