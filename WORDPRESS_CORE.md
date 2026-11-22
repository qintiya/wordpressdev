# WordPress Core Source Strategy

Repository ini tidak menyalin seluruh source `wp-admin/`, `wp-includes/`, atau root WordPress ke Git. WordPress core dibuat otomatis oleh image Docker resmi dan disimpan pada volume bernama `wordpress_data`.

Alasan:

- WordPress menyediakan pembaruan core resmi melalui Docker image.
- Menyalin core dapat membuat perubahan manual dan pembaruan menjadi bertentangan.
- Menjaga core terpisah mengurangi ukuran Git dan risiko memasukkan file upstream yang tidak perlu.

Folder yang dipantau dalam repository:

- `wordpress/plugins/` — plugin custom
- `wordpress/themes/` — tema custom
- `frontend/` — Next.js
- `docker-compose.yml` — layanan backend

Saat container berjalan, core tersedia pada `/var/www/html`, sedangkan data kustom ada pada:

- `/var/www/html/wp-content/plugins/`
- `/var/www/html/wp-content/themes/`
- `/var/www/html/wp-content/uploads/`
