const getCallstackSize = () => {
    // Получаем максимальное число вызовов для функции без переменных и для функции с 3 переменными
    const [funcWithoutArgsCount, funcWithArgsCount] = getCallstackExecutionCount();
    /* Рассчитываем размер Execution Context, зная, что размер функции складывается из размера ее
       контекста вызова и каждой переменной внутри нее (FunctionSize = ExecutionContextSize + NumberOfVars * SizeOfVar),
       а размер коллстека можно найти как размер всех вызванных функций (CallstackSize = FunctionSize * FunctionExecutionCount) */
    const executionContextSize = (3 * 8 * funcWithArgsCount) / (funcWithoutArgsCount - funcWithArgsCount);
    /* Т.к. одна из функций не имеет в себе переменных, используем для подсчета ее, т.к.
       ее размер равен размеру ее контекста вызова */
    return executionContextSize * funcWithoutArgsCount;
}

const getCallstackExecutionCount = () => {
    let count = 0;

    // Функция для вычисления максимального количества вызовов функции без переменных
    const funcWithoutArguments = () => {
        count++;

        try {
            return funcWithoutArguments();
        } catch (error) {
            const temp = count;
            count = 0;
            return temp;
        }
    }

    // Функция для вычисления максимального количества вызовов функции с 3 переменными
    const funcWithArguments = () => {
        let a = count;
        let b = count;
        let c = count;
        count++;

        try {
            return funcWithArguments();
        } catch (error) {
            const temp = count;
            count = 0;
            return temp;
        }
    }

    return [funcWithoutArguments(), funcWithArguments()];
}

console.log(getCallstackSize())