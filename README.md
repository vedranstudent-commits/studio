# Marisha Studio – Starter (Next.js + Supabase)

## 1) Setup
- Kopiraj `.env.example` u `.env.local` i popuni:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
- Pokreni:
```
npm install
npm run dev
```
- Otvori http://localhost:3000

## 2) Deploy (Vercel)
- Pushaj projekt na GitHub → Vercel → New Project → Import
- Dodaj iste env varijable u Vercel Project Settings → Environment Variables
- Deploy

## 3) Što je uključeno
- Dashboard s brzim metrikama, **Chat** na naslovnici
- **Dodavanje klijenta** (modal se zatvara nakon spremanja)
- **Admin: Usluge & Paketi** (samo za admina prema RLS pravilima)
- **Zadaci** s **Checklist** komponentom i progresom
- **Notifikacije** (🔔 bell) – broj nepročitanih

> Obavezno prethodno pokreni SQL skripte u Supabaseu: schema, policies, seed.
