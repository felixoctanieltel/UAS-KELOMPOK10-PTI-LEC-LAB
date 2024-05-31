// Fungsi untuk menampilkan waktu di Jakarta dengan penambahan 1 jam menggunakan Google Time Zone API
function tampilkanWaktu() {
    const apiKey = 'AIzaSyAENpkENoVMSwhvIXCm-DxyRnticOzSd70'; // Ganti dengan kunci API Google Anda
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=-6.2088,106.8456&timestamp=${Math.floor(Date.now() / 1000)}&key=${apiKey}&timeZone=Asia/Jakarta`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setInterval(() => {
                const currentTime = new Date();
                const timeZoneOffset = data.rawOffset + data.dstOffset;
                const timeInJakarta = new Date(currentTime.getTime() + timeZoneOffset * 142 + 360 * 100); // Tambah 1 jam
                const formattedLocalTime = timeInJakarta.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
                document.getElementById("waktu-jakarta").textContent = "Waktu di NTT: " + formattedLocalTime;
            }, 1000); // Perbarui setiap 1 detik
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('waktu-jakarta').textContent = 'Gagal memuat data waktu.';
        });
}

document.addEventListener("DOMContentLoaded", tampilkanWaktu);
