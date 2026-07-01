// ===============================
// SIGN UP
// ===============================

function daftar(event) {

    event.preventDefault();

    const nama = document.getElementById("Nama").value.trim();
    const email = document.getElementById("Email").value.trim();
    const tglLahir = document.getElementById("TglLahir").value.trim();
    const bulanLahir = document.getElementById("BulanLahir").value.trim();
    const tahunLahir = document.getElementById("TahunLahir").value.trim();

    if (nama === "" || email === "") {
        alert("Nama dan Email harus diisi!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {
        users = [];
    }

    const userBaru = {
        id: Date.now(),
        nama: nama,
        email: email,
        tanggalLahir: tglLahir && bulanLahir && tahunLahir
            ? `${tglLahir}/${bulanLahir}/${tahunLahir}`
            : "-",
        umur: tahunLahir
            ? new Date().getFullYear() - parseInt(tahunLahir)
            : "-",
        status: "Free",
        paket: "-",
        tanggalBeli: "-",
        aktifHingga: "-"
    };

    users.push(userBaru);

    localStorage.setItem("users", JSON.stringify(users));

    console.log("Data yang disimpan:");
    console.log(users);


    alert("Pendaftaran berhasil!");

    window.location.href = "DataUser.html";
}



// ===============================
// MENAMPILKAN DATA USER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const tabel = document.getElementById("userTable");

    // Jika bukan halaman DataUser.html maka berhenti
    if (!tabel) return;

    let users = JSON.parse(localStorage.getItem("users"));

    console.log("Data LocalStorage:", users);

    if (!users || users.length === 0) {
        tabel.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    Belum ada data pengguna
                </td>
            </tr>
        `;
        return;
    }

    tabel.innerHTML = "";

    users.forEach((user, index) => {

        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.nama}</td>
                <td>${user.status}</td>
                <td>${user.paket}</td>
            </tr>
        `;

    });

});

// ===============================
// BELI PAKET
// ===============================

function beliPaket(durasi) {

    // Ambil user yang sedang login
    // Karena belum ada sistem login, kita ambil user terakhir yang daftar
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        alert("Kamu belum punya akun! Silakan daftar dulu.");
        window.location.href = "SignUp.html";
        return;
    }

    // Ambil user terakhir (yang baru saja daftar / sedang aktif)
    const indexAktif = users.length - 1;
    const user = users[indexAktif];

    // Hitung tanggal mulai & akhir berlangganan
    const sekarang   = new Date();
    const aktifHingga = new Date();
    aktifHingga.setMonth(aktifHingga.getMonth() + durasi);

    const formatTanggal = (d) =>
        `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;

    // Update data user
    users[indexAktif] = {
        ...user,
        status       : "Premium",
        paket        : `${durasi} Bulan`,
        tanggalBeli  : formatTanggal(sekarang),
        aktifHingga  : formatTanggal(aktifHingga)
    };

    localStorage.setItem("users", JSON.stringify(users));

    alert(`Selamat! Kamu sekarang berlangganan Premium ${durasi} Bulan!\nAktif hingga: ${formatTanggal(aktifHingga)}`);

    window.location.href = "DataUser.html";
}

// menampilkan data user
document.addEventListener("DOMContentLoaded", function () {

    const tabel = document.getElementById("userTable");
    if (!tabel) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        tabel.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; padding: 2rem; color: #666680;">
                    Belum ada data pengguna
                </td>
            </tr>
        `;
        return;
    }

    tabel.innerHTML = "";

    users.forEach((user, index) => {

        const isPremium = user.status === "Premium";

        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.nama}</td>
                <td>${user.email || "-"}</td>
                <td>${user.tanggalLahir || "-"} ${user.umur !== "-" && user.umur !== undefined ? `(${user.umur} th)` : ""}</td>
                <td>
                    <span class="badge-status ${isPremium ? 'badge-premium' : 'badge-free'}">
                        ${isPremium ? 'Premium' : 'Free'}
                    </span>
                </td>
                <td>${user.paket || "-"}</td>
                <td>${user.aktifHingga || "-"}</td>
            </tr>
        `;
    });
});