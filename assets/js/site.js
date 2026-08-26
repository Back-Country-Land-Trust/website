const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('is-open', !open);
    menuButton.querySelector('.sr-only').textContent = open ? 'Open menu' : 'Close menu';
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.matches('a') && window.matchMedia('(max-width: 900px)').matches) {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.querySelector('.sr-only').textContent = 'Open menu';
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const weatherStatus = document.querySelector('#weather-status');
const weatherContent = document.querySelector('#weather-content');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');

const WEATHER_CODE = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Heavy rain showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail'
};

function conditionFor(code) {
  return WEATHER_CODE[code] || 'Conditions unavailable';
}

function formatDay(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
  }).format(new Date(`${dateString}T12:00:00`));
}

async function loadWeather() {
  if (!weatherStatus || !weatherContent || !currentWeather || !forecast) return;

  // Alpine, California. Update these coordinates if Wright's Field needs a more precise site location.
  const latitude = 32.8351;
  const longitude = -116.7664;
  const endpoint = new URL('https://api.open-meteo.com/v1/forecast');
  endpoint.search = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    timezone: 'America/Los_Angeles',
    forecast_days: '7'
  });

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
    const data = await response.json();
    const current = data.current;
    const daily = data.daily;

    currentWeather.innerHTML = `
      <div>
        <p class="eyebrow">Alpine, California</p>
        <h3>${conditionFor(current.weather_code)}</h3>
        <span>Feels like ${Math.round(current.apparent_temperature)}°F · Wind ${Math.round(current.wind_speed_10m)} mph</span>
      </div>
      <strong aria-label="Current temperature">${Math.round(current.temperature_2m)}°F</strong>
    `;

    forecast.innerHTML = daily.time.map((date, index) => `
      <article class="forecast-day">
        <span>${formatDay(date)}</span>
        <strong>${Math.round(daily.temperature_2m_max[index])}° / ${Math.round(daily.temperature_2m_min[index])}°</strong>
        <span class="forecast-condition">${conditionFor(daily.weather_code[index])}</span>
        <span>${daily.precipitation_probability_max[index] ?? 0}% chance of rain</span>
      </article>
    `).join('');

    const updated = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/Los_Angeles'
    }).format(new Date());
    weatherStatus.textContent = `Updated ${updated}. Forecast data: Open-Meteo.`;
    weatherContent.hidden = false;
  } catch (error) {
    weatherStatus.innerHTML = 'Weather information is temporarily unavailable. <a href="https://forecast.weather.gov/MapClick.php?lat=32.8351&lon=-116.7664" target="_blank" rel="noopener">Check the National Weather Service forecast for Alpine</a>.';
    console.error('Unable to load weather', error);
  }
}

loadWeather();
