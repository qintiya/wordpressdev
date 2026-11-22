# WordPress Headless Starter

Starter lokal/production untuk WordPress headless: WordPress + MariaDB dengan Docker Compose, plugin `WordPressDev Core`, tema custom, Next.js, dan Caddy reverse proxy dengan HTTPS otomatis.

Dokumentasi tambahan: [opsi hosting](HOSTING.md), [Python deploy/backup/migrasi dan aplikasi Django](PYTHON_DJANGO.md), serta [dokumentasi frontend](docs/frontends.mdx).

## Domain kustom

Konfigurasi default memakai WordPress/CMS `https://wp.awdev.eu.org` dan frontend `https://awdev.eu.org`. Ubah `WORDPRESS_DOMAIN` dan `FRONTEND_DOMAIN` di `.env` untuk memakai hostname milik Anda. Arahkan DNS ke server Docker dan buka port TCP 80/443 agar Caddy dapat mengurus HTTPS.

## Mulai

```bash
cp .env.example .env
# Ubah kredensial database sebelum penggunaan server.
docker compose up --build
```

Buka domain frontend dan selesaikan instalasi WordPress melalui `https://<WORDPRESS_DOMAIN>/wp-admin/`. Aktifkan plugin **WordPressDev Core** dan tema **WordPressDev Default**. Untuk penggunaan lokal, backend WordPress dan frontend hanya terikat ke loopback host pada port 8080 dan 3000.

REST API: `https://<WORDPRESS_DOMAIN>/wp-json/wp/v2/posts` dan `https://<WORDPRESS_DOMAIN>/wp-json/wp/v2/projects`.

## Python dan Django

Jalankan `python3 scripts/deploy.py`, `python3 scripts/backup.py`, atau `python3 scripts/migrate.py` untuk operasi deployment, backup, dan ekspor migrasi. Lihat [PYTHON_DJANGO.md](PYTHON_DJANGO.md) untuk petunjuk dan batasan.

Django tersedia sebagai aplikasi opsional terpisah: `docker compose --profile django up --build -d`. Ia memiliki admin dan model Projects sendiri; belum tersinkron otomatis dengan WordPress.

## Produksi

Gunakan kredensial kuat, `DJANGO_SECRET_KEY` acak bila mengaktifkan Django, simpan `.env` hanya di server, pin image ke versi yang diuji, aktifkan backup off-site, dan uji pemulihan. Jangan commit secret ke Git.
