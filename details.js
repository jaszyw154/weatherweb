// Get URL parameters
const params = new URLSearchParams(window.location.search);

const lat = params.get("lat");
const lon = params.get("lon");
const city = params.get("city");

console.log("Latitude:", lat);
console.log("Longitude:", lon);
console.log("City:", city);

if (!lat || !lon) {
  alert("Location data missing!");
} else {
  fetchWeather(lat, lon, city);
}

async function fetchWeather(lat, lon, cityName) {
  try {
    const weatherURL =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;

    const res = await fetch(weatherURL);

    if (!res.ok) {
      throw new Error("API request failed");
    }

    const data = await res.json();

    document.getElementById("temp").innerHTML =
      `Temperature Today: ${data.current.temperature_2m}°C`;

    document.getElementById("wind").innerHTML =
      `Winds: ${data.current.wind_speed_10m} km/h`;

    document.getElementById("condition").innerHTML =
      `Condition: Live Data`;

  } catch (error) {
    console.error(error);
    alert("Error fetching weather data");
  }
}

