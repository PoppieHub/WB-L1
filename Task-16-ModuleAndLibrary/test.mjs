import { getCurrentDateFormatted, addDaysToDate, diffDates } from './index.mjs';

// Использование функции для получения отформатированной текущей даты
const formattedDate = getCurrentDateFormatted('YYYY-MM-DD');
console.log(`Текущая дата: ${formattedDate}`);

// Использование функции для добавления дней к текущей дате
const currentDate = new Date();
const modifiedDate = addDaysToDate(currentDate, 5);
console.log(`Дата после добавления 5 дней: ${modifiedDate}`);

const endDate = new Date('2043-01-10');
// Использование функции для вычисления разницы в днях
const daysDifference = diffDates(endDate, currentDate, 'days');
console.log(`Разница в днях: ${daysDifference} days`);