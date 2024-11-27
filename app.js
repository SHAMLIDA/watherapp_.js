

const apiKey = "a698b79e0ec5bc65749a7c67d1a6b68f"; 
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name!");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found!");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
});

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherCondition.textContent = `${data.weather[0].description}`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} km/h`;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
