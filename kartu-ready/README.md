# Kartu Dilema Digital — Vercel Ready

Media pembelajaran interaktif **Kartu Dilema Digital: Algorithm Quest** untuk Informatika Kelas X/Fase E.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build produksi

```bash
npm run build
npm run start
```

## Deploy ke Vercel

### Cara 1 — GitHub (disarankan)
1. Buat repository GitHub baru.
2. Upload seluruh isi folder project ini ke repository tersebut.
3. Di Vercel pilih **Add New → Project**.
4. Import repository GitHub tadi.
5. Framework akan terdeteksi sebagai **Next.js**.
6. Klik **Deploy**.

### Cara 2 — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Untuk production:

```bash
vercel --prod
```

## Catatan

Aplikasi ini menyimpan progres permainan di `localStorage` browser. Tidak membutuhkan database atau environment variable untuk fitur permainan utama.
