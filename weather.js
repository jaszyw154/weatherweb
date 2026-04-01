// =============================
// SEARCH BY CITY NAME
// =============================
async function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const geoURL =
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    const geoResponse = await fetch(geoURL);

    if (!geoResponse.ok) {
      throw new Error("Failed to fetch location data");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    // Redirect to details page
    window.location.href =
      `details.html?lat=${lat}&lon=${lon}&city=${encodeURIComponent(city)}`;

  } catch (error) {
    console.error("Error:", error);
    alert("Error finding city. Please try again.");
  }
}


// =============================
// LIVE LOCATION FUNCTION
// =============================
function useLiveLocation() {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Redirect directly to details page
      window.location.href =
        `details.html?lat=${lat}&lon=${lon}&city=Your Location`;

    }, (error) => {
      alert("Location access denied.");
      console.log(error);
    });

  } else {
    alert("Geolocation not supported.");
  }
}
