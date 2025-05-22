/**
 * Модуль для работы с массивом транзакций
 */
import { generateId } from './utils.js';

// Массив для хранения транзакций
let transactions = [];

/**
 * Добавляет новую транзакцию в массив
 * @param {number} amount - Сумма транзакции
 * @param {string} category - Категория транзакции
 * @param {string} description - Описание транзакции
 * @returns {Object} Объект созданной транзакции
 */
export function addTransaction(amount, category, description) {
    const transaction = {
        id: generateId(),
        date: new Date(),
        amount: parseFloat(amount),
        category: category,
        description: description
    };

    transactions.push(transaction);
    return transaction;
}

/**
 * Удаляет транзакцию по идентификатору
 * @param {string} id - Идентификатор транзакции для удаления
 * @returns {boolean} Результат операции удаления
 */
export function removeTransaction(id) {
    const initialLength = transactions.length;
    transactions = transactions.filter(transaction => transaction.id !== id);

    return transactions.length < initialLength;
}

/**
 * Возвращает массив всех транзакций
 * @returns {Array} Массив транзакций
 */
export function getTransactions() {
    return transactions;
}

/**
 * Возвращает транзакцию по идентификатору
 * @param {string} id - Идентификатор транзакции
 * @returns {Object|null} Объект транзакции или null, если транзакция не найдена
 */
export function getTransactionById(id) {
    return transactions.find(transaction => transaction.id === id) || null;
}

/**
 * Вычисляет общую сумму всех транзакций
 * @returns {number} Общая сумма
 */
export function calculateTotal() {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}