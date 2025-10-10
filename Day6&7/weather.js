const API_KEY = 'c773223cb00c297a7316e8aea460e29c';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherIconContainer = document.getElementById('weatherIconContainer');

async function fetchWeather(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = 'Loading...';
    hideError();

    
    clearWeatherData();

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('API authentication failed. Please check your API key.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }

        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
        clearWeatherData();
    } finally {
    
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconContainer.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// Clear weather data
function clearWeatherData() {
    cityName.textContent = '';
    temperature.textContent = '';
    humidity.textContent = '';
    weatherIconContainer.innerHTML = '';
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        fetchWeather(city);
    }
});

