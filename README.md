# WordPress Headless Starter

Starter headless WordPress dengan **WordPress + MariaDB**, plugin dan tema kustom, **Next.js**, serta **Caddy** untuk reverse proxy dan HTTPS otomatis. Repository ini juga menyediakan aplikasi **Django opsional** dan katalog referensi framework frontend.

<div align="center">
  <a href="HOSTING.md"><img alt="Deploy guide" src="https://img.shields.io/badge/Deploy-panduan%20hosting-315c45?style=for-the-badge"></a>
  <a href="https://github.com/qintiya/wordpressdev/commits/main"><img alt="Commit history" src="https://img.shields.io/badge/Lihat-commit-172321?style=for-the-badge"></a>
  <a href="https://github.com/qintiya/wordpressdev/archive/refs/heads/main.zip"><img alt="Download ZIP" src="https://img.shields.io/badge/Download-source%20ZIP-c9f36b?style=for-the-badge"></a>
  <a href="LICENSE"><img alt="License GPL-3.0" src="https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge"></a>
</div>

> Tombol **Deploy** membuka panduan deployment; tombol **Download** mengunduh source ZIP dari branch `main`. Sesuaikan URL branch bila Anda menggunakan branch lain.

## Fitur

- WordPress headless dengan REST API dan custom post type Projects.
- Next.js frontend, halaman portal demo Admin/Member, dan katalog framework di `/frameworks`.
- MariaDB untuk penyimpanan WordPress, dikelola melalui Docker Compose.
- Caddy reverse proxy dengan HTTPS otomatis untuk domain yang dikonfigurasi.
- Django opsional dengan admin dan model Projects terpisah.
- Script Python untuk deploy, backup, dan ekspor migrasi.

**Penting:** portal Admin/Member saat ini hanya UI demo. Pemilihan role disimpan di `sessionStorage` dan bukan autentikasi atau kontrol akses. Jangan gunakan untuk melindungi data atau operasi produksi. Integrasi Firebase/AWS/Cloudflare/Netlify juga belum dikonfigurasi.

## Domain

Default domain yang disiapkan:

| Layanan | URL default |
| --- | --- |
| Frontend | `https://awdev.eu.org` |
| WordPress / CMS | `https://wp.awdev.eu.org` |

Ubah `WORDPRESS_DOMAIN` dan `FRONTEND_DOMAIN` di `.env` untuk memakai domain Anda sendiri. Arahkan DNS ke server Docker dan izinkan koneksi masuk TCP `80`/`443` agar Caddy dapat mengurus HTTPS.

## Mulai lokal

Persyaratan: Docker Engine dan Docker Compose plugin.

```bash
cp .env.example .env
```

Sebelum menjalankan server, ubah password database di `.env`. Untuk penggunaan lokal, periksa juga nilai domain dan port yang tersedia.

```bash
docker compose up --build
```

Buka frontend di `http://localhost:3000` dan WordPress di `http://localhost:8080`. Selesaikan instalasi WordPress, lalu aktifkan plugin **WordPressDev Core** dan tema **WordPressDev Default**.

REST API WordPress:

- Posts: `https://<WORDPRESS_DOMAIN>/wp-json/wp/v2/posts`
- Projects: `https://<WORDPRESS_DOMAIN>/wp-json/wp/v2/projects`

Frontend membaca API melalui jaringan internal Docker. Variabel `WORDPRESS_API_URL` dapat disesuaikan untuk lingkungan deployment lain.

## Aplikasi Django opsional

Jalankan service Django dengan profile berikut:

```bash
docker compose --profile django up --build -d
```

Operasi deploy, backup, dan ekspor migrasi juga tersedia melalui script:

```bash
python3 scripts/deploy.py
python3 scripts/backup.py
python3 scripts/migrate.py
```

Django memiliki admin dan model Projects sendiri; datanya belum tersinkron otomatis dengan WordPress. Lihat [panduan Python dan Django](PYTHON_DJANGO.md) untuk detail serta batasan penggunaan.

## Struktur repository

| Path | Keterangan |
| --- | --- |
| `frontend/app/` | Next.js App Router, portal demo, dashboard, artikel, dan katalog framework |
| `frontend/public/` | Aset publik frontend, termasuk file ads.txt |
| `wordpress/plugins/wordpressdev-core/` | Plugin custom WordPress dan content type Projects |
| `wordpress/themes/wordpressdev-default/` | Tema WordPress kustom |
| `django_app/` | Aplikasi Django opsional |
| `scripts/` | Script Python untuk deploy, backup, dan migrasi |
| `docs/` | Dokumentasi proyek |
| `docker-compose.yml` | Definisi service WordPress, MariaDB, frontend, Caddy, dan Django |
| `Caddyfile` | Konfigurasi reverse proxy dan domain |
| `.env.example` | Template konfigurasi environment |
| `HOSTING.md` | Panduan hosting/deployment |
| `PYTHON_DJANGO.md` | Panduan aplikasi Django dan script Python |
| `LICENSE` | GNU General Public License versi 3 |

## Dokumentasi

- [Panduan hosting dan deployment](HOSTING.md)
- [Python, Django, backup, dan migrasi](PYTHON_DJANGO.md)
- [Dokumentasi frontend](docs/frontends.mdx)
- [Arsitektur](ARCHITECTURE.md)
- [Fitur profil](PROFILE_FEATURES.md)
- [Panduan tema](THEME.md)
- [Panduan WordPress Core](WORDPRESS_CORE.md)

## Produksi dan keamanan

- Gunakan password kuat dan nilai acak untuk `DJANGO_SECRET_KEY` jika Django diaktifkan.
- Simpan `.env` hanya di server dan jangan pernah commit rahasia ke Git.
- Gunakan image yang versinya sudah diuji, aktifkan backup off-site, dan uji proses pemulihan.
- Pasang autentikasi serta authorization server-side sebelum menyediakan area Admin/Member produksi.
- Tinjau konfigurasi domain, HTTPS, akses database, dan kebijakan backup sebelum go-live.

## Lisensi

Proyek ini dilisensikan di bawah **GNU General Public License v3.0 (GPL-3.0)**. Baca teks lengkap pada [`LICENSE`](LICENSE). Dependensi dan komponen pihak ketiga dapat memiliki lisensi masing-masing.

---

<div align="center">
  <sub>© 2026 AWDEV · <a href="https://awdev.eu.org">awdev.eu.org</a> · Designed for WordPressDev</sub>
</div>
