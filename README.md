# WordPress Headless Starter

Starter lokal untuk WordPress headless: WordPress + MariaDB dengan Docker Compose, plugin `WordPressDev Core` (Custom Post Type **Projects**, REST API, dan halaman admin khusus), serta frontend Next.js.

## Persyaratan

- Docker Desktop atau Docker Engine dengan Docker Compose v2
- Port `3000` dan `8080` tersedia

## Mulai

```bash
cp .env.example .env
docker compose up --build
```

Buka `http://localhost:8080` dan selesaikan instalasi WordPress. Aktifkan **WordPressDev Core** di **Plugins → Installed Plugins**. Frontend tersedia di `http://localhost:3000`.

Plugin dipasang dari folder lokal melalui bind mount, sehingga perubahan plugin langsung terlihat di WordPress. Buat beberapa Posts dan Projects untuk mengisi frontend. REST API tersedia di:

- `http://localhost:8080/wp-json/wp/v2/posts`
- `http://localhost:8080/wp-json/wp/v2/projects`

## Konfigurasi

Salin `.env.example` ke `.env` lalu ubah kredensial database sebelum digunakan. `.env` tidak dilacak Git. Jangan gunakan konfigurasi contoh atau server development ini di produksi.

Frontend membaca `WORDPRESS_API_URL` (URL internal Docker, default `http://wordpress/wp-json/wp/v2`). Untuk mengarahkannya ke WordPress lain, atur variabel tersebut di `docker-compose.yml`, lalu rebuild frontend.

## Struktur

```text
.
├── docker-compose.yml
├── .env.example
├── wordpress/plugins/wordpressdev-core/  # Plugin CPT dan admin
└── frontend/                             # Next.js headless frontend
```

## Catatan produksi

Gunakan HTTPS, kredensial kuat dan unik, secret yang dikelola di luar Git, image yang dipin ke versi/ digest yang telah diuji, backup database dan uploads, serta web server/reverse proxy yang sesuai. Batasi akses admin WordPress. Endpoint REST untuk konten publik memang terbuka; jangan menaruh data rahasia dalam post publik.
