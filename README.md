# WordPress Headless Starter

Starter lokal/production untuk WordPress headless: WordPress + MariaDB dengan Docker Compose, plugin `WordPressDev Core`, tema custom, Next.js, dan Caddy reverse proxy dengan HTTPS otomatis.

## Domain kustom

Konfigurasi default memakai:

- WordPress/CMS/admin: `https://wp.awdev.eu.org`
- Frontend headless: `https://awdev.eu.org`

Anda bisa mengganti keduanya dengan domain atau subdomain milik Anda melalui `.env`. Contoh: `WORDPRESS_DOMAIN=wordpress.example.com` dan `FRONTEND_DOMAIN=www.example.com`.

### Prasyarat domain/server

1. Pastikan Anda mengelola domain tersebut dan buat DNS `A` record untuk kedua hostname menuju IP publik server Docker. Tambahkan `AAAA` hanya jika server benar-benar dapat diakses melalui IPv6.
2. Buka/forward port TCP `80` dan `443` (serta UDP `443` opsional untuk HTTP/3) ke server. Pastikan firewall atau proxy DNS tidak menghalangi validasi sertifikat.
3. Siapkan Docker Engine dan Compose v2 pada server.
4. Salin `.env.example` menjadi `.env`, ubah password MariaDB menjadi rahasia kuat, dan atur hostname yang benar.
5. Jalankan `docker compose up -d --build`. Caddy akan meminta dan memperbarui sertifikat TLS otomatis setelah DNS mengarah ke server.

Jangan mengandalkan domain contoh sebelum memastikan DNS dan kepemilikannya. Saya tidak mengubah DNS atau meng-host server dari repo ini; pengaturan DNS dilakukan di penyedia domain Anda.

## Jalankan lokal

```bash
cp .env.example .env
# Untuk lokal, arahkan domain ke 127.0.0.1 di file hosts atau ubah domain dan gunakan reverse proxy lokal.
docker compose up --build
```

Di server, buka frontend pada domain yang diatur dan selesaikan instalasi WordPress melalui `https://<WORDPRESS_DOMAIN>/wp-admin/`. Aktifkan plugin **WordPressDev Core** dan tema **WordPressDev Default**. Port debug `8080` dan `3000` hanya di-bind ke loopback host.

REST API:

- `https://<WORDPRESS_DOMAIN>/wp-json/wp/v2/posts`
- `https://<WORDPRESS_DOMAIN>/wp-json/wp/v2/projects`

## Isi repo

- `docker-compose.yml`, `Caddyfile`, `.env.example`
- `wordpress/plugins/wordpressdev-core/` — plugin CPT dan admin
- `wordpress/themes/wordpressdev-default/` — tema klasik
- `frontend/` — frontend Next.js

## Keamanan produksi

Gunakan kredensial kuat dan unik, simpan `.env` di server saja, pin image ke versi/digest yang telah diuji, aktifkan backup database dan uploads, perbarui image secara terencana, dan gunakan HTTPS. Jangan commit secret ke Git.
