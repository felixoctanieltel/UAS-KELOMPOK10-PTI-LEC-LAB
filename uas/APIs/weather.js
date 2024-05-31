function tampilkanCuacaNusaTenggaraTimur() {
    const url = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-NusaTenggaraTimur.xml';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");

        const areas = xmlDoc.querySelectorAll('area');
        const randomIndex = Math.floor(Math.random() * areas.length);
        const selectedArea = areas[randomIndex];

        const areaName = selectedArea.getAttribute('description');

        const suhuNode = selectedArea.querySelector('parameter[id="t"] timerange value');
        const weatherNode = selectedArea.querySelector('parameter[id="weather"] timerange value');

        const suhu = suhuNode ? suhuNode.textContent : 'Data tidak tersedia';
        const weatherCode = weatherNode ? weatherNode.textContent : 'Data tidak tersedia';
        const kondisi = translateWeatherCode(weatherCode);

        const weatherIcon = document.getElementById('weather-icon');
        const weatherSuhu = document.getElementById('weather-suhu');
        const weatherArea = document.getElementById('weather-area');

        weatherIcon.innerHTML = kondisi.icon;
        weatherSuhu.textContent = `Suhu: ${suhu}°C`;
        weatherArea.textContent = `Area: ${areaName}`;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('weather-data').textContent = 'Gagal memuat data cuaca.';
      });
}

function translateWeatherCode(code) {
  const weatherCodes = {
    "0": { description: "Cerah", icon: "<i class='ri-sun-line'></i>" },
    "1": { description: "Cerah Berawan", icon: "<i class='ri-sun-cloudy-line'></i>" },
    "2": { description: "Cerah Berawan", icon: "<i class='ri-sun-cloudy-line'></i>" },
    "3": { description: "Berawan", icon: "<i class='ri-cloudy-line'></i>" },
    "4": { description: "Berawan Tebal", icon: "<i class='ri-cloudy-2-line'></i>" },
    "5": { description: "Udara Kabur", icon: "<i class='ri-mist-line'></i>" },
    "10": { description: "Asap", icon: "<i class='ri-mist-line'></i>" },
    "45": { description: "Kabut", icon: "<i class='ri-windy-line'></i>" },
    "60": { description: "Hujan Ringan", icon: "<i class='ri-rainy-line'></i>" },
    "61": { description: "Hujan Sedang", icon: "<i class='ri-drizzle-line'></i>" },
    "63": { description: "Hujan Lebat", icon: "<i class='ri-showers-line'></i>" },
    "80": { description: "Hujan Lokal", icon: "<i class='ri-showers-line'></i>" },
    "95": { description: "Hujan Petir", icon: "<i class='ri-thunderstorms-line'></i>" },
    "97": { description: "Hujan Petir", icon: "<i class='ri-thunderstorms-line'></i>" }
  };

  const weather = weatherCodes[code] || { description: "Kode cuaca tidak diketahui" };
  const weatherDescription = weather.description;
  const weatherIcon = weather.icon || "";

  return { icon: weatherIcon, description: weatherDescription };
}

// Call the function initially to display weather data
tampilkanCuacaNusaTenggaraTimur();

// Set an interval to update data every 10 seconds
setInterval(tampilkanCuacaNusaTenggaraTimur, 10000);

// Ensure the interval starts only after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  setInterval(tampilkanCuacaNusaTenggaraTimur, 10000);
});