const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (navigation && !navigation.querySelector('a[href="https://bcltme.com"]')) {
  const mountainEmpireLink = document.createElement('a');
  mountainEmpireLink.href = 'https://bcltme.com';
  mountainEmpireLink.textContent = 'Mountain Empire';
  const donateLink = Array.from(navigation.querySelectorAll('a')).find((link) => new URL(link.href).pathname.replace(/\/$/, '') === '/donate');
  if (donateLink && donateLink.parentElement === navigation) {
    navigation.insertBefore(mountainEmpireLink, donateLink);
  } else {
    navigation.appendChild(mountainEmpireLink);
  }
}

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
  57: 'Freezing drizzle',
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

function weatherIcon(code, size = 40, isDay = true) {
  const sun = '<g stroke="#bd7900" fill="#ffd36a"><circle cx="16" cy="16" r="7"/><path fill="none" d="M16 3v3m0 20v3M3 16h3m20 0h3M7 7l2 2m14 14 2 2M7 25l2-2M23 9l2-2"/></g>';
  const moon = '<path d="M24 6a12 12 0 1 0 2 20A13 13 0 0 1 24 6Z" fill="#dce8f4" stroke="#64798b"/>';
  const cloud = '<path d="M10 30a7 7 0 0 1-1-14 10 10 0 0 1 19-1 7.5 7.5 0 1 1 2 15Z" fill="#e5edf1" stroke="#637b85"/>';
  const rain = '<path d="m13 34-2 5m11-5-2 5m11-5-2 5" stroke="#287bb5"/>';
  const snow = '<g stroke="#287bb5"><path d="M15 33v8m-4-4h8m-7-3 6 6m0-6-6 6M29 33v8m-4-4h8m-7-3 6 6m0-6-6 6"/></g>';
  let graphic;
  if (code === 0) {
    graphic = isDay ? '<g transform="translate(8 8)">' + sun + '</g>' : moon;
  } else if (code === 1 || code === 2) {
    graphic = (isDay ? sun : moon) + cloud;
  } else if (code === 3) {
    graphic = cloud;
  } else if (code === 45 || code === 48) {
    graphic = cloud + '<path d="M7 35h30M11 40h22" stroke="#637b85"/>';
  } else if ([56, 57, 66, 67].includes(code)) {
    graphic = cloud + rain + '<path d="M39 34v8m-4-4h8" stroke="#287bb5"/>';
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    graphic = cloud + rain;
  } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
    graphic = cloud + snow;
  } else if ([95, 96, 99].includes(code)) {
    graphic = cloud + '<path d="m25 30-7 9h6l-3 7 12-13h-7l3-3Z" fill="#ffd36a" stroke="#bd7900"/>';
  } else {
    graphic = '<circle cx="24" cy="24" r="16" fill="#e5edf1" stroke="#637b85"/><path d="M19 18a5 5 0 0 1 10 0c0 4-5 4-5 8m0 5h.01" stroke="#637b85"/>';
  }
  return `<svg class="weather-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true" focusable="false" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex-shrink:0;margin:0.35rem 0">${graphic}</svg>`;
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
    current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,is_day',
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
        ${weatherIcon(current.weather_code, 64, current.is_day !== 0)}
        <h3>${conditionFor(current.weather_code)}</h3>
        <span>Feels like ${Math.round(current.apparent_temperature)}°F · Wind ${Math.round(current.wind_speed_10m)} mph</span>
      </div>
      <strong aria-label="Current temperature">${Math.round(current.temperature_2m)}°F</strong>
    `;

    forecast.innerHTML = daily.time.map((date, index) => `
      <article class="forecast-day">
        <span>${formatDay(date)}</span>
        ${weatherIcon(daily.weather_code[index])}
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


