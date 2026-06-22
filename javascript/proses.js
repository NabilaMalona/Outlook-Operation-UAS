// ===============================
// SIGN UP
// ===============================

function daftar(event) {

    event.preventDefault();

    const nama = document.getElementById("Nama").value.trim();
    const email = document.getElementById("Email").value.trim();

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
        status: "Free",
        paket: "-"
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