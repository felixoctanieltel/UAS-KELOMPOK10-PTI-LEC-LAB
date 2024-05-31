var randomCurrencies; // variabel untuk menyimpan lima mata uang yang dipilih secara acak

function fetchExchangeRates() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.floatrates.com/daily/idr.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                randomCurrencies = getRandomCurrencies(data, 5); // Ambil lima mata uang secara acak
                displayCurrencies(randomCurrencies); // Tampilkan lima mata uang secara acak
                setupSearch(data); // Tambahkan fitur pencarian
            } else {
                console.error('Error fetching exchange rates. Status:', xhr.status);
                document.getElementById('exchange-rates').textContent = 'Failed to load exchange rates.';
            }
        }
    };
    xhr.send();
}

// Fungsi untuk mengambil n mata uang secara acak dari data
function getRandomCurrencies(data, n) {
    var currencies = Object.values(data);
    var randomCurrencies = [];
    while (randomCurrencies.length < n) {
        var randomIndex = Math.floor(Math.random() * currencies.length);
        var currency = currencies[randomIndex];
        if (!randomCurrencies.includes(currency)) {
            randomCurrencies.push(currency);
        }
    }
    return randomCurrencies;
}

// Fungsi untuk menampilkan daftar mata uang
function displayCurrencies(currencies) {
    var ratesList = "<ul>";
    currencies.forEach(function(currency) {
        ratesList += "<li>Code: " + currency.code + ", Name: " + currency.name + ", Rate: " + currency.rate + "</li>";
    });
    ratesList += "</ul>";
    document.getElementById('exchange-rates').innerHTML = ratesList;
}

// Fungsi untuk menyiapkan fitur pencarian
function setupSearch(data) {
    var input = document.getElementById('search-input');
    input.addEventListener('input', function() {
        var searchQuery = input.value.toLowerCase();
        var filteredCurrencies = Object.values(data).filter(function(currency) {
            return currency.code.toLowerCase().includes(searchQuery) || currency.name.toLowerCase().includes(searchQuery);
        });
        if (searchQuery === '') {
            displayCurrencies(randomCurrencies); // Tampilkan lima mata uang secara acak ketika kolom pencarian dikosongkan
        } else {
            displayCurrencies(filteredCurrencies);
        }
    });
}

fetchExchangeRates();
