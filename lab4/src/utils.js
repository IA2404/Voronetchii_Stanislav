/**
 * Модуль для вспомогательных функций
 */

/**
 * Генерирует уникальный идентификатор
 * @returns {string} Уникальный идентификатор
 */
export function generateId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
}

/**
 * Форматирует дату для отображения в таблице
 * @param {Date} date - Объект даты для форматирования
 * @returns {string} Отформатированная строка даты и времени
 */
export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Возвращает первые 4 слова из текста для краткого описания
 * @param {string} text - Текст для сокращения
 * @returns {string} Краткое описание (первые 4 слова)
 */
export function getShortenedDescription(text) {
    const words = text.split(' ');
    if (words.length <= 4) {
        return text;
    }
    return words.slice(0, 4).join(' ') + '...';
}

/**
 * Форматирует сумму для отображения
 * @param {number} amount - Сумма для форматирования
 * @returns {string} Отформатированная сумма с символом валюты
 */
export function formatAmount(amount) {
    return amount.toFixed(2) + ' MDL';
}