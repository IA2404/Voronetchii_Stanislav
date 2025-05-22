/**
 * Weather - Приложение для просмотра погоды
 * Использует Open-Meteo API для получения данных о погоде
 */

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('error-message');
const loadingIndicator = document.getElementById('loading');
const weatherSection = document.getElementById('weather-section');
const cityNameElement = document.getElementById('city-name');
const currentDateElement = document.getElementById('current-date');
const currentTempElement = document.getElementById('current-temp');
const weatherIconElement = document.getElementById('weather-icon');
const weatherDescriptionElement = document.getElementById('weather-description');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const pressureElement = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');

const weatherIcons = {
    0: '☀️', // Ясно
    1: '🌤️', // Преимущественно ясно
    2: '⛅', // Переменная облачность
    3: '☁️', // Пасмурно
    45: '🌫️', // Туман
    48: '🌫️', // Туман с инеем
    51: '🌧️', // Легкая морось
    53: '🌧️', // Умеренная морось
    55: '🌧️', // Сильная морось
    56: '🌧️', // Легкая ледяная морось
    57: '🌧️', // Сильная ледяная морось
    61: '🌦️', // Легкий дождь
    63: '🌧️', // Умеренный дождь
    65: '🌧️', // Сильный дождь
    66: '🌧️', // Легкий ледяной дождь
    67: '🌧️', // Сильный ледяной дождь
    71: '❄️', // Легкий снегопад
    73: '❄️', // Умеренный снегопад
    75: '❄️', // Сильный снегопад
    77: '❄️', // Снежные зерна
    80: '🌦️', // Легкие ливни
    81: '🌧️', // Умеренные ливни
    82: '🌧️', // Сильные ливни
    85: '🌨️', // Легкий снежный ливень
    86: '🌨️', // Сильный снежный ливень
    95: '⛈️', // Гроза
    96: '⛈️', // Гроза с легким градом
    99: '⛈️'  // Гроза с сильным градом
};

const weatherDescriptions = {
    0: 'Ясно',
    1: 'Преимущественно ясно',
    2: 'Переменная облачность',
    3: 'Пасмурно',
    45: 'Туман',
    48: 'Туман с инеем',
    51: 'Легкая морось',
    53: 'Умеренная морось',
    55: 'Сильная морось',
    56: 'Легкая ледяная морось',
    57: 'Сильная ледяная морось',
    61: 'Легкий дождь',
    63: 'Умеренный дождь',
    65: 'Сильный дождь',
    66: 'Легкий ледяной дождь',
    67: 'Сильный ледяной дождь',
    71: 'Легкий снегопад',
    73: 'Умеренный снегопад',
    75: 'Сильный снегопад',
    77: 'Снежные зерна',
    80: 'Легкие ливни',
    81: 'Умеренные ливни',
    82: 'Сильные ливни',
    85: 'Легкий снежный ливень',
    86: 'Сильный снежный ливень',
    95: 'Гроза',
    96: 'Гроза с легким градом',
    99: 'Гроза с сильным градом'
};

const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function initApp() {
    searchButton.addEventListener('click', searchWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        searchWeather();
    }
}

function formatDate(date) {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const weekday = weekdays[date.getDay()];

    return `${weekday}, ${day} ${month} ${date.getFullYear()}`;
}

async function getCoordinates(cityName) {
    try {
        const response = await fetch(`${GEO_API_URL}?name=${encodeURIComponent(cityName)}&count=1`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('Город не найден');
        }

        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            name: data.results[0].name,
            country: data.results[0].country
        };
    } catch (error) {
        throw error;
    }
}

async function getWeatherData(latitude, longitude) {
    try {
        const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

function updateWeatherUI(weatherData, locationData) {
    const now = new Date();
    currentDateElement.textContent = formatDate(now);

    cityNameElement.textContent = `${locationData.name}, ${locationData.country}`;

    const currentTemp = Math.round(weatherData.current.temperature_2m);
    currentTempElement.textContent = `${currentTemp}°C`;

    const weatherCode = weatherData.current.weather_code;
    weatherIconElement.textContent = weatherIcons[weatherCode] || '🌈';
    weatherDescriptionElement.textContent = weatherDescriptions[weatherCode] || 'Неизвестно';

    feelsLikeElement.textContent = `${Math.round(weatherData.current.apparent_temperature)}°C`;
    humidityElement.textContent = `${weatherData.current.relative_humidity_2m}%`;
    windElement.textContent = `${Math.round(weatherData.current.wind_speed_10m)} м/с`;
    pressureElement.textContent = `${Math.round(weatherData.current.pressure_msl)} гПа`;

    updateForecastUI(weatherData.daily);

    weatherSection.style.display = 'block';
}

function updateForecastUI(dailyData) {
    forecastContainer.innerHTML = '';

    for (let i = 0; i < dailyData.time.length; i++) {
        if (i === 0) continue;

        const date = new Date(dailyData.time[i]);
        const maxTemp = Math.round(dailyData.temperature_2m_max[i]);
        const minTemp = Math.round(dailyData.temperature_2m_min[i]);
        const weatherCode = dailyData.weather_code[i];
        const precipitation = dailyData.precipitation_sum[i];

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';

        const weekday = weekdays[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];

        forecastCard.innerHTML = `
            <div class="forecast-date">${weekday}, ${day} ${month}</div>
            <div class="forecast-icon">${weatherIcons[weatherCode] || '🌈'}</div>
            <div class="forecast-temp">${maxTemp}° / ${minTemp}°</div>
            <div class="forecast-desc">${weatherDescriptions[weatherCode] || 'Неизвестно'}</div>
            <div class="forecast-precip">${precipitation > 0 ? `Осадки: ${precipitation} мм` : 'Без осадков'}</div>
        `;

        forecastContainer.appendChild(forecastCard);
    }
}

async function searchWeather() {
    const cityName = cityInput.value.trim();

    if (!cityName) {
        showError('Пожалуйста, введите название города');
        return;
    }

    try {
        showLoading(true);

        const locationData = await getCoordinates(cityName);

        const weatherData = await getWeatherData(locationData.latitude, locationData.longitude);

        updateWeatherUI(weatherData, locationData);

        localStorage.setItem('lastCity', cityName);

        hideError();
    } catch (error) {
        showError('Город не найден. Пожалуйста, проверьте название и попробуйте снова.');
        console.error('Ошибка поиска погоды:', error);
    } finally {
        // Скрываем индикатор загрузки
        showLoading(false);
    }
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherSection.style.display = 'none';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function showLoading(show) {
    loadingIndicator.style.display = show ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', initApp);