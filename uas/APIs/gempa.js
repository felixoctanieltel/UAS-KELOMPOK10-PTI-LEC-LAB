function fetchEarthquakeData() {
    return fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch earthquake data');
            }
            return response.text(); // Mengambil teks dari respons
        })
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            return xmlDoc;
        })
        .catch(error => {
            console.error('Error fetching earthquake data:', error);
            document.getElementById('earthquake-info').textContent = 'Failed to load earthquake data.';
        });
}

function processRandomEarthquakeData(xmlDoc) {
    const infogempa = xmlDoc.getElementsByTagName('Infogempa')[0]; // Ambil elemen Infogempa
    const gempaList = infogempa.getElementsByTagName('gempa'); // Ambil daftar elemen gempa

    if (!gempaList || gempaList.length === 0) {
        console.error('No earthquake data available.');
        document.getElementById('earthquake-info').textContent = 'No earthquake data available.';
        return;
    }

    // Ambil informasi gempa secara acak
    const randomIndex = Math.floor(Math.random() * gempaList.length);
    const earthquake = gempaList[randomIndex];

    // Tampilkan informasi gempa
    var earthquakeInfo = `
        <p>Waktu: ${earthquake.getElementsByTagName('Tanggal')[0].textContent}</p>
        <p>Koordinat: ${earthquake.getElementsByTagName('Lintang')[0].textContent}, ${earthquake.getElementsByTagName('Bujur')[0].textContent}</p>
        <p>Magnitude: ${earthquake.getElementsByTagName('Magnitude')[0].textContent}</p>
        <p>Kedalaman: ${earthquake.getElementsByTagName('Kedalaman')[0].textContent}</p>
        <p>Wilayah: ${earthquake.getElementsByTagName('Wilayah')[0].textContent}</p>
        <p>Potensi: ${earthquake.getElementsByTagName('Potensi')[0].textContent}</p>
    `;
    document.getElementById('earthquake-info').innerHTML = earthquakeInfo;
}

function startFetching() {
    fetchEarthquakeData().then(xmlDoc => {
        processRandomEarthquakeData(xmlDoc);

        setInterval(() => {
            fetchEarthquakeData().then(xmlDoc => {
                processRandomEarthquakeData(xmlDoc);
            });
        }, 10000); // Setel interval untuk memuat data setiap 10 detik
    });
}

startFetching();
