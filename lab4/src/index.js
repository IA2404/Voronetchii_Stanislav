document.getElementById('theme-toggle').addEventListener('click', function() {
    const themeStyle = document.getElementById('theme-style');
    if (themeStyle.getAttribute('href') === 'light-theme.css') {
        themeStyle.setAttribute('href', 'dark-theme.css');
        localStorage.setItem('theme', 'dark');
    } else {
        themeStyle.setAttribute('href', 'light-theme.css');
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.getElementById('theme-style').setAttribute('href', 'dark-theme.css');
}

/**
 * Главный файл приложения для учета личных финансов
 */
import { addTransaction } from './transactions.js';
import { addTransactionToTable, initEventHandlers } from './ui.js';

const transactionForm = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const descriptionInput = document.getElementById('description');

/**
 * Обработчик отправки формы
 * @param {Event} event - Событие отправки формы
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const amount = amountInput.value;
    const category = categorySelect.value;
    const description = descriptionInput.value || '(Без описания)';

    if (!amount || !category) {
        alert('Пожалуйста, заполните сумму и выберите категорию');
        return;
    }

    let finalAmount = parseFloat(amount);
    if (category !== 'Доход' && finalAmount > 0) {
        finalAmount = -finalAmount;
    }

    const transaction = addTransaction(finalAmount, category, description);
    addTransactionToTable(transaction);

    transactionForm.reset();
    amountInput.focus();
}

/**
 * Инициализация приложения при загрузке страницы
 */
function init() {
    transactionForm.addEventListener('submit', handleFormSubmit);

    initEventHandlers();

    console.log('Приложение для учета личных финансов инициализировано');
}

document.addEventListener('DOMContentLoaded', init);