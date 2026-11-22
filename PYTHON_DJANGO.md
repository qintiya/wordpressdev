# Python deployment, backup, and migration tools

Requirements: Python 3.10+ and Docker Compose v2. Run commands from the repository root.

## Deploy

```bash
python3 scripts/deploy.py
```

The script validates Compose configuration, asks for confirmation, builds images, and starts/updates services. To skip the prompt in automation, pass `--yes` only after reviewing the target environment. It does not remove volumes or orphaned services.

## Backup

```bash
python3 scripts/backup.py
# Optional destination:
python3 scripts/backup.py --output-dir /secure/path/backups
```

Creates a MariaDB SQL dump and a compressed `wp-content/uploads` archive. Store backups outside the server, restrict access, and test restore procedures. The archive does not include Caddy data, plugin/theme source (tracked in Git), or other untracked WordPress content.

## Migration export

```bash
python3 scripts/migrate.py
```

Creates a ZIP containing the database dump, uploads, and SHA-256 manifest. Verify the manifest before transferring/restoring. The tool only exports; it never overwrites a destination site. Before restore, back up the destination independently. When changing domains, use a WordPress-aware serialized-data search/replace utility such as WP-CLI; do not plain-text replace SQL dumps.

## Django application

The optional Django app is an independent full-stack starter (Django admin plus a Projects page) and does not replace or automatically synchronize WordPress content.

```bash
cp .env.example .env
# Set DJANGO_SECRET_KEY to a long random secret before exposing the app.
docker compose --profile django up --build -d
docker compose exec django python manage.py migrate
docker compose exec django python manage.py createsuperuser
```

Local Django port defaults to `127.0.0.1:8000`; it is not exposed publicly by default. For production, use a strong secret, configure `DJANGO_ALLOWED_HOSTS`, use a production database and HTTPS reverse proxy, and review Django deployment checks. The included SQLite setup is suitable only as a starter/small local app.
