/**
 * Модуль для работы с пользовательским интерфейсом
 */
import { formatDate, getShortenedDescription, formatAmount } from './utils.js';
import { removeTransaction, getTransactionById, calculateTotal } from './transactions.js';

// Получаем ссылки на элементы DOM
const transactionsTable = document.getElementById('transactions-table');
const transactionsBody = document.getElementById('transactions-body');
const totalAmount = document.getElementById('total-amount');
const transactionDetails = document.getElementById('transaction-full-info');

/**
 * Создает строку в таблице для транзакции
 * @param {Object} transaction - Объект транзакции
 * @returns {HTMLTableRowElement} Созданная строка таблицы
 */
export function createTransactionRow(transaction) {
    const row = document.createElement('tr');
    row.dataset.id = transaction.id;

    // Устанавливаем класс строки в зависимости от категории и суммы
    if (transaction.category === 'Доход') {
        row.classList.add('positive');
    } else {
        row.classList.add('negative');
    }

    // Создаем ячейки таблицы
    row.innerHTML = `
    <td>${formatDate(transaction.date)}</td>
    <td>${transaction.category}</td>
    <td>${getShortenedDescription(transaction.description)}</td>
    <td>${formatAmount(transaction.amount)}</td>
    <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
  `;

    return row;
}

/**
 * Добавляет транзакцию в таблицу
 * @param {Object} transaction - Объект транзакции
 */
export function addTransactionToTable(transaction) {
    const row = createTransactionRow(transaction);
    transactionsBody.appendChild(row);
    updateTotal();
}

/**
 * Обновляет отображение общей суммы
 */
export function updateTotal() {
    const total = calculateTotal();
    totalAmount.textContent = formatAmount(total);

    // Меняем цвет в зависимости от баланса
    if (total > 0) {
        totalAmount.style.color = '#2e7d32';
    } else if (total < 0) {
        totalAmount.style.color = '#c62828';
    } else {
        totalAmount.style.color = '#333';
    }
}

/**
 * Отображает полную информацию о транзакции
 * @param {string} id - Идентификатор транзакции
 */
export function showTransactionDetails(id) {
    const transaction = getTransactionById(id);

    if (transaction) {
        transactionDetails.innerHTML = `
      <p><strong>Дата и время:</strong> ${formatDate(transaction.date)}</p>
      <p><strong>Категория:</strong> ${transaction.category}</p>
      <p><strong>Сумма:</strong> ${formatAmount(transaction.amount)}</p>
      <p><strong>Полное описание:</strong> ${transaction.description}</p>
    `;
    } else {
        transactionDetails.innerHTML = '<p>Транзакция не найдена</p>';
    }
}

/**
 * Удаляет транзакцию из таблицы
 * @param {string} id - Идентификатор транзакции
 */
export function removeTransactionFromTable(id) {
    const row = transactionsBody.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        row.remove();

        // Если удаленная транзакция сейчас отображается в деталях, очищаем детали
        const detailId = transactionDetails.dataset.id;
        if (detailId === id) {
            transactionDetails.innerHTML = '<p>Нажмите на транзакцию для просмотра деталей</p>';
            transactionDetails.dataset.id = '';
        }

        updateTotal();
    }
}

/**
 * Инициализирует обработчики событий
 */
export function initEventHandlers() {
    // Обработчик клика по таблице (делегирование событий)
    transactionsTable.addEventListener('click', (event) => {
        // Если нажата кнопка удаления
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.dataset.id;
            if (removeTransaction(id)) {
                removeTransactionFromTable(id);
            }
            // Останавливаем всплытие, чтобы не сработал клик по строке
            event.stopPropagation();
        }
        // Если нажата строка таблицы (но не заголовок)
        else if (event.target.closest('tr') && event.target.closest('tbody')) {
            const row = event.target.closest('tr');
            const id = row.dataset.id;

            // Выделяем активную строку
            const activeRow = transactionsBody.querySelector('tr.active');
            if (activeRow) {
                activeRow.classList.remove('active');
            }
            row.classList.add('active');

            // Отображаем детали транзакции
            showTransactionDetails(id);
            transactionDetails.dataset.id = id;
        }
    });
}