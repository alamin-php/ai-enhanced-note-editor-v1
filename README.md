
# 🚀 Basic Setup Process (After Cloning from GitHub)

## 1. Clone the Repository

```bash
git clone https://github.com/alamin-php/ai-enhanced-note-editor-v1.git
cd ai-enhanced-note-editor-v1
```

## 2. Backend (Laravel) Setup

### Install PHP dependencies:
```bash
composer install
```

### Copy `.env` file and generate the app key:
```bash
cp .env.example .env
php artisan key:generate
```

### Configure `.env` for your local environment:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

GOOGLE_CLIENT_ID="394317443023-kk53b6lim0eb10romlva2jrp0bgjgl1p.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
```
### Run database migrations:
```bash
php artisan migrate
```

## 3. Frontend (React.js with Inertia.js) Setup

### Install Node.js dependencies:
```bash
npm install
```

### Run Vite development server:
```bash
npm run dev
```

## 4. Serve the Laravel Backend

```bash
php artisan serve
```

## 5. Access the Application

Open your browser:

```
Local Server: http://127.0.0.1:8000
Live Project: https://notes.advancesoftbd.com
```

## 6. Optional: Build for Production

```bash
npm run build
php artisan optimize:clear
php artisan config:cache
```

## 7. Note: Extra featurs for RAW PHP code

```bash
Added raw code php featurs for Export Notes.
```

---

✅ **You are all set!** Your Laravel + React.js (Inertia.js) project is ready to use.
