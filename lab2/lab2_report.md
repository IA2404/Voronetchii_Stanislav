# Лабораторная работа №2: Анализ транзакций на JavaScript

## Описание
В рамках данной лабораторной работы было разработано консольное приложение для анализа транзакций. Реализованы функции для обработки массива транзакций, включая фильтрацию, подсчет сумм, поиск по датам и другим параметрам.

## Цель работы
Изучить основы работы с массивами и функциями в JavaScript, а также применить их для обработки и анализа данных о транзакциях.

---

## Реализация

### Шаг 1. Создание массива транзакций
Для работы использовался массив транзакций, импортированный из файла `transactions.js`. Каждая транзакция содержит следующие свойства:
- `transaction_id` — уникальный идентификатор транзакции.
- `transaction_date` — дата транзакции.
- `transaction_amount` — сумма транзакции.
- `transaction_type` — тип транзакции (`debit` или `credit`).
- `transaction_description` — описание транзакции.
- `merchant_name` — название магазина или сервиса.
- `card_type` — тип карты (кредитная или дебетовая).

Также были созданы вспомогательные массивы:
- `zeroTransactions` — пустой массив для тестирования функций на пустых данных.
- `oneTransaction` — массив с одной транзакцией для тестирования функций на минимальных данных.

---

### Шаг 2. Реализация функций для анализа транзакций
Были реализованы следующие функции:

1. **`getUniqueTransactionTypes(transactions)`**  
   Возвращает уникальные типы транзакций с использованием `Set`.

2. **`calculateTotalAmount(transactions)`**  
   Вычисляет общую сумму всех транзакций.

3. **`calculateTotalAmountByDate(transactions, year, month, day)`**  
   Вычисляет сумму транзакций за указанный год, месяц и день (параметры необязательные).

4. **`getTransactionByType(transactions, type)`**  
   Возвращает транзакции указанного типа (`debit` или `credit`).

5. **`getTransactionsInDateRange(transactions, startDate, endDate)`**  
   Возвращает транзакции в указанном диапазоне дат.

6. **`getTransactionsByMerchant(transactions, merchantName)`**  
   Возвращает транзакции по названию магазина.

7. **`calculateAverageTransactionAmount(transactions)`**  
   Вычисляет среднюю сумму транзакций.

8. **`getTransactionsByAmountRange(transactions, minAmount, maxAmount)`**  
   Возвращает транзакции с суммой в указанном диапазоне.

9. **`calculateTotalDebitAmount(transactions)`**  
   Вычисляет общую сумму дебетовых транзакций.

10. **`findMostTransactionsMonth(transactions)`**  
    Возвращает месяц с наибольшим количеством транзакций.

11. **`findMostDebitTransactionMonth(transactions)`**  
    Возвращает месяц с наибольшим количеством дебетовых транзакций.

12. **`mostTransactionTypes(transactions)`**  
    Возвращает тип транзакций, которых больше всего (`debit`, `credit` или `equal`).

13. **`getTransactionsBeforeDate(transactions, date)`**  
    Возвращает транзакции, совершенные до указанной даты.

14. **`findTransactionById(transactions, id)`**  
    Возвращает транзакцию по её уникальному идентификатору.

15. **`mapTransactionDescriptions(transactions)`**  
    Возвращает массив описаний транзакций.

---
### Код работы
```javascript

/**
 * Возвращает массив уникальных типов транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Set} - массив уникальных типов транзакций
 */
function getUniqueTransactionTypes(transactions) {
    return new Set(transactions.map(transaction => transaction.transaction_type));
}

/**
 * Считаем сумму всех транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Number} - общая сумма транзакций
 */
function calculateTotalAmount (transactions) {
    let total = 0;
    transactions.forEach(transaction => total += transaction.transaction_amount);
    return total;
}

/**
 * * Рассчет общей суммы транзакций по дате в формате YYYY-MM-DD
 * @param {Array} transactions - массив транзакций
 * @param {Number} [year] - год (необязательный)
 * @param {Number} [month] - месяц (необязательный)
 * @param {Number} [day] - день (необязательный)
 * @returns {Number} - общая сумма транзакций за указанный период
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    let total = 0;
    transactions.forEach(transaction => {
        const [transactionYear, transactionMonth, transactionDay] = transaction.transaction_date.split('-');
        const yearMatch = !year || transactionYear === year;
        const monthMatch = !month || transactionMonth === month;
        const dayMatch = !day || transactionDay === day;

        if (yearMatch && monthMatch && dayMatch) {
            total += transaction.transaction_amount;
        }
    });
    return total;
}

/**
 * Возвращает транзакции указанного типа
 * @param {Array} transactions - массив транзакций
 * @param {String} type - тип транзакции ('debit' или 'credit')
 * @returns {Array} - массив транзакций указанного типа
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type);
}

/**
 * Фильтрация транзакций по диапазону дат
 * @param {Array} transactions - массив транзакций
 * @param {String} startDate - начальная дата диапазона (в формате 'YYYY-MM-DD')
 * @param {String} endDate - конечная дата диапазона (в формате 'YYYY-MM-DD')
 * @returns {Array} - массив транзакций в указанном диапазоне дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions.filter(transaction => {
        const transDate = new Date(transaction.transaction_date);
        return transDate >= start && transDate <= end;
    });
}

/**
 * Фильтрация транзакций по названию магазина (merchantname)
 * @param {Array} transactions - массив транзакций
 * @param {String} merchantName - название магазина или сервиса
 * @returns {Array} - массив транзакций с указанным merchantName
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
}

/**
 * Рассчет средней суммы транзакций в массиве
 * @param {Array} transactions - массив транзакций
 * @returns {Number} - среднее значение транзакций
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) {
        return 0;
    }

    const totalAmount = calculateTotalAmount(transactions);
    return totalAmount / transactions.length;
}

/**
 * Фильтрация транзакций по диапазону сумм
 * @param {Array} transactions - массив транзакций
 * @param {Number} minAmount - минимальная сумма
 * @param {Number} maxAmount - максимальная сумма
 * @returns {Array} - массив транзакций с суммой в указанном диапазоне
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => {
        const amount = transaction.transaction_amount;
        return amount >= minAmount && amount <= maxAmount;
    });
}

/**
 * Рассчет общей суммы дебетовых транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Number} - общая сумма дебетовых транзакций
 */
function calculateTotalDebitAmount(transactions) {
    const debitTransactions = getTransactionByType(transactions, "debit");
    return calculateTotalAmount(debitTransactions);
}

/**
 * Возвращает месяц, в котором было больше всего транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Number} - номер месяца (1-12), в котором было больше всего транзакций
 */
function findMostTransactionsMonth(transactions) {
    if (transactions.length === 0) {
        return null;
    }

    const monthCount = {};

    transactions.forEach(transaction => {
        const date = new Date(transaction.transaction_date);
        const month = date.getMonth() + 1;

        if (monthCount[month]) {
            monthCount[month]++;
        } else {
            monthCount[month] = 1;
        }
    });

    let maxCount = 0;
    let mostActiveMonth = null;

    for (const month in monthCount) {
        if (monthCount[month] > maxCount) {
            maxCount = monthCount[month];
            mostActiveMonth = parseInt(month);
        }
    }

    return mostActiveMonth;
}

/**
 * Возвращает месяц, в котором было больше дебетовых транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Number} - номер месяца (1-12), в котором было больше дебетовых транзакций
 */
function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = getTransactionByType(transactions, "debit");

    return findMostTransactionsMonth(debitTransactions);
}

/**
 * Возвращает тип транзакций, которых больше всего
 * @param {Array} transactions - массив транзакций
 * @returns {String} - тип транзакций ('debit', 'credit' или 'equal')
 */
function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, "debit").length;
    const creditCount = getTransactionByType(transactions, "credit").length;

    if (debitCount > creditCount) {
        return "debit";
    } else if (creditCount > debitCount) {
        return "credit";
    } else {
        return "equal";
    }
}

/**
 * Возвращает массив транзакций, совершенных до указанной даты
 * @param {Array} transactions - массив транзакций
 * @param {String} date - дата в формате 'YYYY-MM-DD'
 * @returns {Array} - массив транзакций до указанной даты
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);

    return transactions.filter(transaction => {
        const transDate = new Date(transaction.transaction_date);
        return transDate < targetDate;
    });
}

/**
 * Возвращает транзакцию по ее уникальному идентификатору
 * @param {Array} transactions - массив транзакций
 * @param {String} id - уникальный идентификатор транзакции
 * @returns {Object|null} - объект транзакции или null, если транзакция не найдена
 */
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id) || null;
}

/**
 * Возвращает новый массив, содержащий только описания транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Array} - массив описаний транзакций
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
}
```

### Шаг 3. Тестирование функций
Все функции были протестированы на различных данных:
- Основной массив транзакций.
- Пустой массив (`zeroTransactions`).
- Массив с одной транзакцией (`oneTransaction`).


### Контрольные вопросы
1. Какие методы массивов можно использовать для обработки объектов в JavaScript?
   map(), filter(), reduce(), forEach(), find(), some(), every(), sort(), includes(), indexOf(), flatMap()


2. Как сравнивать даты в строковом формате в JavaScript?
   В JavaScript для сравнения дат в строковом формате необходимо,
   чтобы даты были представлены в одном стандартном формате,
   который можно корректно сравнивать. Наиболее удобный — YYYY-MM-DD,
   даты в этом формате можно сравнивать как обычные строки,


3. В чем разница между map(), filter() и reduce() при работе с массивами объектов?
   Метод map() используется для преобразования каждого элемента массива
   и создания нового массива на основе результатов.

Метод filter() используется для фильтрации элементов массива.
Он создает новый массив, включающий только те элементы, которые
удовлетворяют условию.

Метод reduce() используется для сведения массива к одному значению.
Он принимает функцию-аккумулятор, которая на каждом шаге преобразует текущий
элемент в новый результат, и возвращает итоговое значение
после обработки всех элементов массива.

