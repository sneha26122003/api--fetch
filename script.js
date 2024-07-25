const button = document.getElementById("search-button");
const input = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

async function getData(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=d14870edf7e94ee992b155714241107&q=${cityName}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to retrieve data. Please check the city name and try again.');
  }
}

button.addEventListener("click", async () => {
  const value = input.value.trim();
  
  if (value) {
    const result = await getData(value);

    if (result) {
      cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
      cityTime.innerText = result.location.localtime;
      cityTemp.innerText = `${result.current.temp_c}°C`;
    }
  } else {
    alert('Please enter a city name.');
  }
});

