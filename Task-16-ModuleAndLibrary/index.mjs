// dateUtils.js
import moment from 'moment.js';

// Функция для форматирования текущей даты
export function getCurrentDateFormatted(format) {
    const currentDate = moment();
    return currentDate.format(format);
}

// Функция для добавления определенного количества дней к переданной дате
export function addDaysToDate(date, days) {
    const modifiedDate = moment(date).add(days, 'days');
    return modifiedDate.toDate();
}

// Функция для вычисления разницы между двумя датами
export function diffDates(date1, date2, unit) {
    return moment(date1).diff(date2, unit);
}