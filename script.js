const searchButton = document.querySelector("#search-button");
const cityInput = document.querySelector("#city-input");
const resultsDiv = document.querySelector("#results");
const apiKey = "0094401e4124414b94f20544232002";

searchButton.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=no&alerts=no`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const today = data.forecast.forecastday[0];
      const week = data.forecast.forecastday.slice(1);

      let forecastHtml = `
        <h2>Today's Weather in ${data.location.name}</h2>
        <p>Temperature: ${today.day.avgtemp_c} &#8451;</p>
        <p>Condition: ${today.day.condition.text}</p>
        <p>Humidity: ${today.day.avghumidity}%</p>
      `;

      forecastHtml += "<h2>7-Day Forecast</h2> <div id='class1'>";

      week.forEach((day) => {
        forecastHtml += `
          <div>
            <p><strong>Date:</strong><br>${day.date}</p>
            <p><strong>Temperature:</strong><br>${day.day.avgtemp_c} &#8451</p>
            <p><strong>Condition:</strong><br>${day.day.condition.text}</p>
          </div>
        `;
      });
      forecastHtml += "</div>"
      resultsDiv.innerHTML = forecastHtml;
    })
    .catch((error) => {
      console.log(error)
      resultsDiv.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
    });
});
