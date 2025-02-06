function refreshWeather(response) {
  let currentTempElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let currentCityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  currentCityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  currentTempElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"
  class="current-weather-temp-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
  let day = days[date.getDay()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8e3acea414f74ff0de5f0fboa8fbt362";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(refreshWeather);
}

function submitSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearchForm);

function getForecast(city) {
  let apiKey = "8e3acea414f74ff0de5f0fboa8fbt362";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {  
let forecastHtml = "";

response.data.daily.forEach(function (day, index){
  if (index < 5) {
  forecastHtml = forecastHtml +
    `
    <div class="weather-forecast-day-wrap">
    <div class="weather-forecast-day">${formatDay(day.time)}</div>
    <div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
    </div>
    <div class="weather-forecast-temps">
      <div class="weather-forecast-temp"><strong>${Math.round(day.temperature.maximum)}º</strong></div>
      <div class="weather-forecast-temp"> ${Math.round(day.temperature.minimum)}º</div>
    </div>
    </div>
    `;
  }
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

searchCity("Iron River");