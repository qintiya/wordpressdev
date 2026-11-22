# Profile Admin dan Member

Stack profil dibangun dari WordPress sebagai sumber data identitas:

- Role `admin_profile_client` untuk Admin/Staff
- Role `wordpressdev_member` untuk Member
- REST endpoints publik terbatas
- Meta profil: phone, bio, company, website, avatar
- Halaman Next.js untuk daftar member dan detail profil

## Endpoint profil

```text
GET /wp-json/wp/v2/users/me
GET /wp-json/wordpressdev/v1/profile/{id}
GET /wp-json/wordpressdev/v1/members
```

Endpoint `me` memerlukan cookie autentikasi WordPress atau Application Password pada request backend. Jangan gunakan secret WordPress di browser Next.js.

## Cara memakai

1. Jalankan `docker compose up --build`.
2. Aktifkan plugin `WordPressDev Core`.
3. Buat/ubah pengguna di WordPress dan tetapkan role `Member` atau `Client/Staff`.
4. Tambah Company, Website, Phone, dan Bio pada halaman profil WordPress.
