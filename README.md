Berikut adalah **README.md lengkap** yang fokus pada cara menjalankan project, tech stack, dan penjelasan arsitektur:

---

# 🔐 Next.js Authentication System

Sistem autentikasi modern dan aman dengan Next.js 15, MySQL, dan JWT-based authentication menggunakan HttpOnly cookies.

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework dengan App Router
- **React 18** - UI library dengan Server & Client Components
- **TypeScript 5** - Type safety dan better developer experience
- **Tailwind CSS 3** - Utility-first CSS framework untuk styling
- **React Hooks** - State management (useState, useEffect, useRouter)

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Node.js** - JavaScript runtime
- **jose** - JWT creation dan verification
- **bcryptjs** - Password hashing dengan bcrypt algorithm

### Database
- **MySQL 8** - Relational database
- **Prisma ORM 5** - Type-safe database client
- **Prisma Migrate** - Database schema migration tool

### Security & Additional
- **HttpOnly Cookies** - Secure token storage
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Rate Limiting** - Brute force protection (in-memory / Upstash Redis)
- **Form Validation** - Client-side dan server-side validation
- **Jest + React Testing Library** - Unit testing

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐
│   Client Side   │
│  (React + TS)   │
└────────┬────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────────────────┐
│     Next.js Middleware      │
│  (JWT Verification,         │
│   Route Protection)         │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│     API Routes (Backend)    │
│  ┌─────────────────────┐   │
│  │  /api/auth/login    │   │
│  │  /api/auth/register │   │
│  │  /api/auth/logout   │   │
│  │  /api/user          │   │
│  └──────────┬──────────┘   │
└─────────────┼───────────────┘
              │
              ▼
     ┌────────────────┐
     │  Prisma ORM    │
     └────────┬───────┘
              │
              ▼
     ┌────────────────┐
     │  MySQL Database│
     │  ┌──────────┐  │
     │  │  User    │  │
     │  │  Table   │  │
     │  └──────────┘  │
     └────────────────┘
```

### Authentication Flow

```
1. USER LOGIN
   ├─> Client: Submit email/username + password
   ├─> API: Validate input (server-side)
   ├─> Rate Limiter: Check attempt count
   ├─> Database: Query user by email/username
   ├─> Bcrypt: Compare password hash
   ├─> JWT: Create token dengan user payload
   ├─> Response: Set HttpOnly cookie dengan JWT
   └─> Client: Redirect ke /dashboard

2. PROTECTED ROUTE ACCESS
   ├─> Client: Request /dashboard
   ├─> Middleware: Intercept request
   ├─> Middleware: Extract JWT from cookie
   ├─> Middleware: Verify JWT signature & expiration
   ├─> If valid: Continue to dashboard
   └─> If invalid: Redirect to /login

3. USER LOGOUT
   ├─> Client: Click logout button
   ├─> API: DELETE HttpOnly cookie
   └─> Client: Redirect to /login
```

### Data Flow Architecture

```
┌──────────────────────────────────────┐
│          Components Layer            │
│  ┌──────────┐  ┌─────────────────┐  │
│  │LoginForm │  │  ThemeToggle    │  │
│  │Component │  │  LoadingSpinner │  │
│  └──────────┘  └─────────────────┘  │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│           Pages Layer                │
│  ┌──────┐  ┌──────────┐  ┌────────┐ │
│  │/login│  │/dashboard│  │  /api  │ │
│  └──────┘  └──────────┘  └────────┘ │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│         Business Logic Layer         │
│  ┌────────┐  ┌──────────────────┐   │
│  │lib/auth│  │lib/rateLimit.ts  │   │
│  │.ts     │  └──────────────────┘   │
│  └────────┘                          │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│        Database Access Layer         │
│  ┌─────────────┐                     │
│  │lib/prisma.ts│ ──> Prisma Client   │
│  └─────────────┘                     │
└──────────┬───────────────────────────┘
           │
           ▼
       [MySQL Database]
```

### Security Architecture

```
┌─────────────────────────────────────┐
│        Security Layers              │
├─────────────────────────────────────┤
│ 1. Input Validation                 │
│    ├─> Email format (regex)         │
│    ├─> Password length (min 6)      │
│    └─> Required fields check        │
├─────────────────────────────────────┤
│ 2. Rate Limiting                    │
│    └─> Max 5 attempts per minute/IP │
├─────────────────────────────────────┤
│ 3. Password Security                │
│    ├─> Bcrypt hashing (10 rounds)   │
│    └─> Never store plain passwords  │
├─────────────────────────────────────┤
│ 4. Token Security                   │
│    ├─> JWT with HS256 algorithm     │
│    ├─> 7 days expiration            │
│    └─> HttpOnly cookie storage      │
├─────────────────────────────────────┤
│ 5. Route Protection                 │
│    ├─> Middleware JWT verification  │
│    └─> Redirect if unauthorized     │
└─────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

Pastikan sudah terinstall:

- **Node.js** >= 18.17.0
- **npm** / **yarn** / **pnpm**
- **MySQL** >= 8.0

### Installation Steps

#### 1. Clone Repository

```bash
git clone https://github.com/yourusername/nextjs-auth-app.git
cd nextjs-auth-app
```

#### 2. Install Dependencies

```bash
npm install
```

**Dependencies yang akan terinstall:**
- `@prisma/client` - Prisma ORM client
- `bcryptjs` - Password hashing
- `jose` - JWT operations
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM renderer

#### 3. Environment Configuration

Buat file `.env` di root directory:

```env
# Database Configuration
DATABASE_URL="mysql://root:password@localhost:3306/auth_app"

# JWT Secret (WAJIB diganti di production!)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# Optional: Rate Limiting (jika pakai Upstash Redis)
UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
```

**⚠️ PENTING:** Ganti `DATABASE_URL` sesuai konfigurasi MySQL kamu!

#### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migration (buat tabel di database)
npx prisma migrate dev --name init

# Seed database dengan data dummy (opsional)
npx prisma db seed
```

**Output yang diharapkan:**
```
✔ Generated Prisma Client
✔ The following migration(s) have been applied:
  migrations/
    └─ 20231021_init/
        └─ migration.sql
🌱 Seeding completed!
```

#### 5. Start Development Server

```bash
npm run dev
```

Aplikasi berjalan di: **http://localhost:3000**

### Default Test Accounts

Setelah seeding, gunakan akun ini untuk login:

| Email | Username | Password |
|-------|----------|----------|
| admin@example.com | admin | password |


## 📁 Project Structure

```
nextjs-auth-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes (Backend)
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts      # POST /api/auth/login
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts      # POST /api/auth/logout
│   │   │   │   └── register/
│   │   │   │       └── route.ts      # POST /api/auth/register
│   │   │   └── user/
│   │   │       └── route.ts          # GET /api/user (protected)
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard page (protected)
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/                # React Components
│   │   ├── LoginForm.tsx             # Login form dengan validation
│   │   ├── ThemeToggle.tsx           # Dark mode toggle
│   │   └── LoadingSpinner.tsx        # Loading animation
│   ├── lib/                       # Utility Functions
│   │   ├── prisma.ts                 # Prisma client instance
│   │   ├── auth.ts                   # JWT functions (create, verify)
│   │   └── rateLimit.ts              # Rate limiting logic
│   └── middleware.ts              # Route protection middleware
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Database seeding script
├── __tests__/
│   └── validation.test.ts         # Unit tests
├── .env                           # Environment variables (TIDAK di-commit!)
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies & scripts
└── README.md                      # Documentation
```

### Key Files Explanation

#### `src/lib/auth.ts` - Authentication Logic
```typescript
// Functions:
- createToken()     // Buat JWT token
- verifyToken()     // Verify JWT validity
- getSession()      // Get current user session
- setAuthCookie()   // Set HttpOnly cookie
- clearAuthCookie() // Delete cookie
```

#### `src/middleware.ts` - Route Protection
```typescript
// Proteksi route /dashboard
// Redirect ke /login jika tidak ada JWT valid
// Verify token sebelum akses protected pages
```

#### `prisma/schema.prisma` - Database Schema
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  username  String   @unique
  password  String   // Bcrypt hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Test Coverage

```bash
npm test -- --coverage
```

## 🗄️ Database Management

### Open Prisma Studio

```bash
npx prisma studio
```

Buka browser: **http://localhost:5555**

### Reset Database

```bash
npx prisma migrate reset
```

Ini akan:
1. Drop semua tabel
2. Re-run migrations
3. Auto-run seed script

### Manual SQL Query

```bash
# Login MySQL
mysql -u root -p

# Pilih database
USE auth_app;

# Lihat users
SELECT * FROM User;
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build untuk production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run seed         # Run database seeder
```

## 🚀 Deployment

### Deploy ke Vercel

1. Push code ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Deploy!

### Environment Variables Production

```env
DATABASE_URL="mysql://user:pass@host:3306/db"
JWT_SECRET="production-secret-minimum-32-chars"
NODE_ENV="production"
```

## 📝 License

MIT License


