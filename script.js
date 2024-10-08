// Declaring variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");

const kelvin = 273.15; // More accurate to use 273.15 for Celsius conversion

// Function to fetch weather data
const fetchWeatherData = async (lat, lon) => {
  const apiKey = "6d055e39ee237af35ca066f35474e9df";
  const base = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`;

  try {
    const response = await fetch(base);
    if (!response.ok) throw new Error("Failed to fetch weather data.");
    const data = await response.json();

    // Update DOM elements
    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to update the UI with weather data
const updateWeatherUI = (data) => {
  // Current weather
  const currentWeather = data.current;

  temperature.textContent = Math.floor(currentWeather.temp - kelvin) + "°C";
  summary.textContent = currentWeather.weather[0].description;
  loc.textContent = `Latitude: ${data.lat}, Longitude: ${data.lon}`;
  const icon1 = currentWeather.weather[0].icon;
  icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png" alt="Weather Icon" />`;

  // Animating background based on temperature
  animateBackground(currentWeather.temp - kelvin);
};

// Function to animate background based on temperature
const animateBackground = (temp) => {
  const body = document.querySelector("body");
  if (temp > 30) {
    body.style.background = "linear-gradient(to bottom right, rgb(255, 123, 123), rgb(255, 87, 34))";
  } else if (temp > 20 && temp <= 30) {
    body.style.background = "linear-gradient(to bottom right, rgb(255, 206, 86), rgb(255, 152, 0))";
  } else if (temp > 10 && temp <= 20) {
    body.style.background = "linear-gradient(to bottom right, rgb(123, 184, 104), rgb(13, 87, 10))";
  } else {
    body.style.background = "linear-gradient(to bottom right, rgb(123, 160, 255), rgb(0, 87, 255))";
  }
};

// Getting user location and calling the weather data function
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      // Fetch weather data
      fetchWeatherData(lat, lon);
    });
  } else {
    console.error("Geolocation not supported by this browser.");
  }
});