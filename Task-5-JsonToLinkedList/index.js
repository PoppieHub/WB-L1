// Класс для удобного создания узлов связного списка
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const jsonToLinkedList = (json) => {
    // Преобразуем JSON
    const parsedJSON = JSON.parse(json);

    // Если полученные данные не являются массивом или длина этого массива равна нулю, останавливаем выполнение
    if (!Array.isArray(json) || parsedJSON.length === 0) {
        throw new Error('Пустой входной массив или объект не является массивом');
    }

    // Создаем первый узел списка
    const head = new ListNode(parsedJSON[0]);

    // Проходим по массиву и создаем связанные узлы
    let current = head;
    for (let i = 1; i < parsedJSON.length; i++) {
        // Создаем новый узел с соответствующими данными
        const newNode = new ListNode(parsedJSON[i]);
        // Для текущего узла указываем ссылку на новый узел
        current.next = newNode;
        // В качестве текущего узла сохраняем только что созданный узел
        current = newNode;
    }

    return head;
};
