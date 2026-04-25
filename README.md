# JTEC — E-commerce Frontend & Backend

Modern, production-ready e-commerce platform built with **Next.js 15**, **TypeScript**, **Django REST Framework**, and **PostgreSQL**.

**Live:** [https://jotatec.netlify.app](https://jotatec.netlify.app)  
**Backend API:** [https://jtec-backend.onrender.com](https://jtec-backend.onrender.com)  
**API Docs:** [https://jtec-backend.onrender.com/swagger/](https://jtec-backend.onrender.com/swagger/)

---

## 📦 Features

### Frontend (Next.js)
- ✅ Product catalog with search, filtering, and sorting
- ✅ Shopping cart (localStorage-based, survives OAuth redirects)
- ✅ Google OAuth authentication (NextAuth v5)
- ✅ Secure checkout flow with email/name form fallback
- ✅ **PIX payment** with real EMV QR code generation
- ✅ 60-second countdown with "still here?" prompt
- ✅ Order confirmation with digital delivery message
- ✅ Responsive design (mobile-first, Tailwind v4)
- ✅ TypeScript for type safety

### Backend (Django)
- ✅ REST API with DRF (Django REST Framework)
- ✅ PostgreSQL database (Neon serverless)
- ✅ Customer upsert with Google OAuth data
- ✅ Order creation with auto-generated order number (`JTEC######`)
- ✅ **PIX payload generation** (EMV format, CRC16-CCITT)
- ✅ Order status tracking (pending → awaiting_payment → paid → delivered)
- ✅ Full Swagger/ReDoc documentation
- ✅ CORS enabled for frontend integration
- ✅ WhiteNoise static file serving
- ✅ Production-ready (Gunicorn + SSL)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 20+ & pnpm 10+
- Python 3.11+
- PostgreSQL 15+ (or use Neon for free)

### Frontend Setup

```bash
cd JTec
pnpm install
cp .env.local.example .env.local  # Configure API_URL, OAuth, etc.
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**Environment variables** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
AUTH_SECRET=your-random-secret-min-32-chars
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
AUTH_URL=http://localhost:3000
```

### Backend Setup

```bash
cd JTec-BACKEND
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
cp .env.example .env

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Access [http://localhost:8000/swagger/](http://localhost:8000/swagger/) for full API documentation.

**Environment variables** (`.env`):
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/jtec_db
```

---

## 📐 Architecture

### Frontend

**Tech Stack:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- NextAuth v5 (OAuth)
- qrcode.react (PIX QR generation)
- React Context (cart state)

**Key Flows:**

1. **Product Browsing** → Add to cart (localStorage) → Open cart drawer
2. **Checkout** → Auth (Google OAuth or email form) → Review order
3. **Payment** → PIX QR code display → 60s countdown → "Já paguei!" confirmation
4. **Confirmation** → Order number badge → Delivery message → Back to store

**Folder Structure:**
```
app/
  (default)/          # Landing page
  loja/              # Product catalog & store
  checkout/          # Checkout flow (auth → payment → confirmation)
components/
  store/             # ProductCard, CartDrawer, etc.
  checkout/          # CheckoutSteps, AuthStep, PixStep, etc.
lib/
  api.ts             # Backend API calls
  cart-context.tsx   # Global cart state
  cart.ts            # Types & localStorage
```

### Backend

**Tech Stack:**
- Django 6.0.4
- Django REST Framework
- PostgreSQL (Neon)
- drf-yasg (Swagger/ReDoc)
- Gunicorn (production WSGI)
- WhiteNoise (static files)

**API Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders/create/` | Create order & generate PIX |
| `POST` | `/api/orders/{order_number}/confirm/` | Confirm PIX payment |
| `GET` | `/api/orders/{order_number}/` | Get order details |

**Database Schema:**

```sql
Customer(email, name, google_id, google_picture)
Order(order_number, customer_id, total, status, pix_payload, created_at)
OrderItem(order_id, product_id, product_name, price)
```

**Folder Structure:**
```
core/
  models.py          # Customer, Order, OrderItem
  views.py           # CreateOrderView, ConfirmOrderView, GetOrderView
  serializers.py     # OrderSerializer
  pix.py             # PIX payload generation
JTEC/
  settings.py        # Django config (CORS, DRF, Swagger, DB)
  urls.py            # URL routing + Swagger schema
```

---

## 🔐 Authentication

### Google OAuth 2.0

**Flow:**
1. User clicks "Sign in with Google" → redirects to Google
2. Google redirects back to `https://jotatec.netlify.app/api/auth/callback/google`
3. NextAuth exchanges code for token, stores session
4. User continues to checkout with pre-filled email/name

**Setup:**
1. Create OAuth app at [console.cloud.google.com](https://console.cloud.google.com)
2. Add authorized redirect URIs:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://jotatec.netlify.app/api/auth/callback/google`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in environment

---

## 💳 Payment (PIX)

**PIX Flow:**
1. Create order → backend generates EMV QR code payload
2. Frontend renders QR code with `qrcode.react`
3. User scans & pays via banking app
4. User clicks "Já paguei!" after payment
5. Backend marks order as `awaiting_payment` (admin handles fulfillment)

**PIX Payload:**
- **Format:** EMV (CRC16-CCITT)
- **Key:** `+5531985975200` (João Vitor's personal PIX key)
- **Merchant:** `JTEC` / `BELO HORIZONTE`
- **TxID:** Order number (for traceability)

Backend generates payload via standard CRC16 algorithm matching [Brazilian Central Bank specs](https://www.bcb.gov.br/).

---

## 📊 Order Status Lifecycle

```
pending (user hasn't paid yet)
    ↓
awaiting_payment (user clicked "Já paguei!", admin reviewing)
    ↓
paid (admin confirmed payment received)
    ↓
delivered (products sent to customer)
```

---

## 🌐 Deployment

### Frontend (Netlify)

**Auto-deploy:** Push to `init-project` branch → Netlify builds & deploys  
**Build command:** `pnpm run build`  
**Publish directory:** `.next`

**Environment variables** (set in Netlify dashboard):
```env
NEXT_PUBLIC_API_URL=https://jtec-backend.onrender.com
AUTH_SECRET=jtec-prod-secret-2026-changeme
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
AUTH_URL=https://jotatec.netlify.app
```

**Steps:**
1. Connect GitHub repo to Netlify
2. Set build command & env vars
3. Push to `init-project` → auto-deploy

### Backend (Render)

**Auto-deploy:** Push to `main` branch → Render builds & deploys  
**Buildpack:** Python  
**Build command:** 
```bash
pip install -r requirements.txt && \
python manage.py collectstatic --noinput && \
python manage.py migrate
```
**Start command:** 
```bash
gunicorn JTEC.wsgi:application --bind 0.0.0.0:$PORT --workers 2
```

**Environment variables** (set in Render dashboard):
```env
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://neon...  # from Neon
ALLOWED_HOSTS=jtec-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://jotatec.netlify.app
```

**Steps:**
1. Connect GitHub repo to Render
2. Select Python environment
3. Set build/start commands & env vars
4. Push to `main` → auto-deploy

### Database (Neon PostgreSQL)

**Setup:**
1. Create account at [neon.tech](https://neon.tech)
2. Create project → database → get connection string
3. Add `DATABASE_URL` to Render env vars
4. Backend auto-runs migrations on deploy

---

## 🧪 Testing the Full Flow

### Local (with mock data)
```bash
# Terminal 1: Backend
cd JTec-BACKEND
python manage.py runserver

# Terminal 2: Frontend
cd JTec
pnpm dev
```

Visit `http://localhost:3000/loja` → add product → checkout → test PIX

### Production
Visit `https://jotatec.netlify.app/loja` → test real PIX payment

---

## 📚 API Documentation

### Swagger UI
**Live:** [https://jtec-backend.onrender.com/swagger/](https://jtec-backend.onrender.com/swagger/)

Full interactive documentation with "Try it out" for all endpoints.

### Example Request

```bash
curl -X POST http://localhost:8000/api/orders/create/ \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "email": "user@example.com",
      "name": "João Silva",
      "google_id": "1234567890"
    },
    "items": [
      {
        "product_id": "starter-next-15",
        "product_name": "Starter Kit Next.js 15",
        "price": 297.00
      }
    ]
  }'
```

---

## 🛠️ Troubleshooting

### `redirect_uri_mismatch` on Google login
→ Add your redirect URI to Google Console authorized list (local & production)

### `CORS errors` on API calls
→ Check `CORS_ALLOWED_ORIGINS` in Django settings matches frontend domain

### `PIX payload not generating`
→ Verify `PIX_KEY`, `MERCHANT_NAME`, `MERCHANT_CITY` in `core/views.py`

### Build fails on Netlify
→ Check `netlify.toml` has correct build command, all env vars set

### `ModuleNotFoundError` on Render
→ Ensure `requirements.txt` includes all dependencies, run `pip freeze > requirements.txt`

---

## 📄 License & Credits

- Frontend template based on [Open by Cruip](https://github.com/cruip/open-react-template)
- Built with ❤️ by JTEC — João Vitor C. Varella
- **Contact:** jvvarella@hotmail.com | [(31) 98597-5200](tel:+5531985975200) | [jotatec.netlify.app](https://jotatec.netlify.app)

---

## 📝 Development Notes

### Cart Persistence Through OAuth
Cart state is stored in `localStorage` and hydrated on app init. When user is redirected to Google and back, cart survives because it's restored from storage.

### PIX & Order Numbers
- Order number format: `JTEC` + 6-digit random (e.g., `JTEC482019`)
- PIX `txid` = order number (for manual reconciliation)
- CRC16-CCITT checksum validates QR code integrity

### Hydration Safety
- Components using `new Date()` initialize to `null`, set in `useEffect` to prevent server/client mismatch
- All client-side initialization deferred to first render

---

**Status:** ✅ Production ready | Last updated: April 2026
