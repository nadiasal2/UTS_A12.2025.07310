document.addEventListener("DOMContentLoaded", function () {

  // 1. FILTER PRODUK KUE
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".product-item");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Menghapus status aktif dari semua tombol
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Mengaktifkan tombol yang dipilih
      button.classList.add("active");

      const selectedCategory = button.getAttribute("data-filter");

      // Menampilkan produk sesuai kategori
      productItems.forEach(function (product) {
        const productCategory = product.getAttribute("data-category");

        if (
          selectedCategory === "all" ||
          selectedCategory === productCategory
        ) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    });
  });

  // 2. OTOMATIS GENERATE OPSI MENU KE DROPDOWN
  const tipeKueSelect = document.getElementById("tipeKue");
  const productTitles = document.querySelectorAll(".product-card .card-title");

  if (tipeKueSelect) {
    productTitles.forEach(function (titleElem) {
      const namaProduk = titleElem.textContent.trim();
      const option = document.createElement("option");
      option.value = namaProduk;
      option.textContent = namaProduk;
      tipeKueSelect.appendChild(option);
    });
  }


  // 3. LOGIKA KLIK TOMBOL '+' (PILIH MENU OTOMATIS)
  const orderButtons = document.querySelectorAll(".order-btn");

  orderButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const produkDipilih = this.getAttribute("data-product");
      if (tipeKueSelect && produkDipilih) {
        tipeKueSelect.value = produkDipilih;
      }
    });
  });

  // 4. FORM PEMESANAN
  const orderForm = document.getElementById("orderForm");
  const pesanSukses = document.getElementById("pesanSukses");

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Validasi input
      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      // Ambil nilai dari input
      const nama = document.getElementById("nama").value.trim();
      const tipeKue = document.getElementById("tipeKue").value;
      const jumlah = document.getElementById("jumlah").value;
      const pengambilan = orderForm.querySelector(
        'input[name="pengambilan"]:checked'
      );
      const catatan = document.getElementById("catatan").value.trim();

      if (nama === "") {
        alert("Nama pemesan harus diisi!");
        return;
      }

      if (!pengambilan) {
        alert("Silakan pilih metode pengambilan!");
        return;
      }

      // Tampilkan feedback sukses
      if (pesanSukses) {
        pesanSukses.textContent =
          "Terima kasih, " + nama +
          "! Pesanan " + tipeKue +
          " sebanyak " + jumlah +
          " berhasil dicatat. Metode pengambilan: " +
          pengambilan.value + ".";

        pesanSukses.classList.remove("d-none", "alert-danger");
        pesanSukses.classList.add("alert-success");
      } else {
        alert("Terima kasih, " + nama + "! Pesanan kamu berhasil dicatat.");
      }

      console.log("Data Pemesanan:", {
        nama: nama,
        tipeKue: tipeKue,
        jumlah: jumlah,
        pengambilan: pengambilan.value,
        catatan: catatan
      });

      // Reset form
      orderForm.reset();
    });
  }

});