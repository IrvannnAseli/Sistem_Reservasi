// Daftar ruangan dan reservasi
const rooms = [
    { number: 101, capacity: 30, available: true },
    { number: 102, capacity: 25, available: true },
    { number: 103, capacity: 35, available: false },
    { number: 104, capacity: 40, available: true },
    { number: 105, capacity: 30, available: true }
];

const reservations = [];

// Fungsi untuk memuat ruangan yang tersedia ke dropdown
function loadAvailableRooms() {
    const roomSelect = document.getElementById('room');
    roomSelect.innerHTML = ''; // Kosongkan dropdown terlebih dahulu

    rooms.forEach(room => {
        if (room.available) {
            const option = document.createElement('option');
            option.value = room.number;
            option.textContent = `Ruangan ${room.number}`;
            roomSelect.appendChild(option);
        }
    });
}

// Fungsi untuk menambah reservasi
document.getElementById('reservationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const roomNumber = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const duration = document.getElementById('duration').value;

    // Tambahkan reservasi ke tabel
    reservations.push({ name, roomNumber, date, startTime, duration });

    // Tampilkan notifikasi
    document.getElementById('message').textContent = 'Reservasi berhasil dibuat!';

    // Menambah data ke tabel reservasi
    const table = document.getElementById('reservationTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${roomNumber}</td>
        <td>${date}</td>
        <td>${startTime}</td>
        <td>${duration} jam</td>
        <td><button class="cancel-btn">Batal</button></td>
    `;

    // Reset form
    document.getElementById('reservationForm').reset();

    // Memuat ulang dropdown
    loadAvailableRooms();
});

// Menangani pembatalan reservasi
document.getElementById('reservationTable').addEventListener('click', function (event) {
    if (event.target.classList.contains('cancel-btn')) {
        const row = event.target.closest('tr');
        const roomNumber = row.cells[1].textContent;

        // Hapus reservasi dari array
        const index = reservations.findIndex(res => res.roomNumber === roomNumber);
        if (index !== -1) {
            reservations.splice(index, 1);
        }

        // Hapus baris tabel
        row.remove();
    }
});

// Inisialisasi dropdown dan tabel saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadAvailableRooms();
});
