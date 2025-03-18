import {transactions} from "./files/transactions.js";
const zeroTransactions = [];
const oneTransaction = [transactions[0]];

/**
 * Возвращает массив уникальных типов транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Set} - мас сив уникальных типов транзакций
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
        const yearMatch = !year || transactionYear === year.toString();
        const monthMatch = !month || transactionMonth === month.toString().padStart(2, '0');
        const dayMatch = !day || transactionDay === day.toString().padStart(2, '0');

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

// Тестирование функций

console.log(" -------- Тестирование функций анализа транзакций -------- ");

console.log("\n1. Уникальные типы транзакций:");
console.log(getUniqueTransactionTypes(transactions));

console.log("\n2. Общая сумма всех транзакций:");
console.log(calculateTotalAmount(transactions));

console.log("\n3. Общая сумма транзакций за 2019 год:");
console.log(calculateTotalAmountByDate(transactions, 2019));

console.log("\n4. Общая сумма транзакций за январь 2019:");
console.log(calculateTotalAmountByDate(transactions, 2019, 1));

console.log("\n5. Дебетовые транзакции:");
console.log(getTransactionByType(transactions, "debit"));

console.log("\n6. Транзакции с 1 января по 1 февраля 2019:");
console.log(getTransactionsInDateRange(transactions, "2019-01-01", "2019-02-01"));

console.log("\n7. Транзакции в магазине SuperMart:");
console.log(getTransactionsByMerchant(transactions, "SuperMart"));

console.log("\n8. Средняя сумма транзакций:");
console.log(calculateAverageTransactionAmount(transactions));

console.log("\n9. Транзакции с суммой от 50 до 100:");
console.log(getTransactionsByAmountRange(transactions, 50, 100));

console.log("\n10. Общая сумма дебетовых транзакций:");
console.log(calculateTotalDebitAmount(transactions));

console.log("\n11. Месяц с наибольшим количеством транзакций:");
console.log(findMostTransactionsMonth(transactions));

console.log("\n12. Месяц с наибольшим количеством дебетовых транзакций:");
console.log(findMostDebitTransactionMonth(transactions));

console.log("\n13. Тип транзакций, которых больше всего:");
console.log(mostTransactionTypes(transactions));

console.log("\n14. Транзакции до 1 февраля 2019:");
console.log(getTransactionsBeforeDate(transactions, "2019-02-01"));

console.log("\n15. Транзакция с ID = 3:");
console.log(findTransactionById(transactions, "3"));

console.log("\n16. Описания всех транзакций:");
console.log(mapTransactionDescriptions(transactions));

console.log("\nТестирование на пустом массиве");
console.log("\nСредняя сумма транзакций (пустой массив):");
console.log(calculateAverageTransactionAmount(zeroTransactions));

console.log("\nМесяц с наибольшим количеством транзакций (пустой массив):");
console.log(findMostTransactionsMonth(zeroTransactions));

console.log("\nТестирование на массиве с одной транзакцией");

console.log("\nСредняя сумма транзакций (один элемент):");
console.log(calculateAverageTransactionAmount(oneTransaction));

console.log("\nМесяц с наибольшим количеством транзакций (один элемент):");
console.log(findMostTransactionsMonth(oneTransaction));