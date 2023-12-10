let depth = 0;

// Функция для оценки максимальной возможной вложенности document.write
function writeNestedScripts() {
    // Выводим текущий уровень вложенности
    depth++;
    document.write('<p>Depth: ' + depth + '</p>');

    // Выводим script, в котором запускаем эту же функцию
    document.write('<script>writeNestedScripts();<\/script>');
}

// Инициирующий запуск
writeNestedScripts();