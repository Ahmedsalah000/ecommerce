# E-Commerce Backend API

A RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. This backend supports user authentication, role-based access, product management, cart, orders, search, and email notifications. Deployed for serverless use on Vercel with MongoDB Atlas.

## Features

- User authentication (register, login, forgot/reset password)
- Role-based access control (user, seller, admin)
- Product management (CRUD for sellers, public viewing)
- Product search by name or seller store name (registered users only)
- Cart functionality (add, update, remove items; admin can manage any user's cart)
- Order processing (create from cart, view orders)
- Email notifications for password reset using Nodemailer with Gmail
- Security: JWT authentication, bcrypt hashing, helmet, CORS
- Deployment-ready for Vercel with MongoDB Atlas

## Project Structure

```
├── config/         # Configuration files (DB, JWT)
│   ├── db.js
│   └── jwt.js
│
├── models/         # Mongoose Schemas
│   ├── User.js
│   ├── Seller.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
│
├── controllers/    # Business Logic
│   ├── authController.js
│   ├── userController.js
│   ├── sellerController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
│
├── routes/         # Express Routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── sellerRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
├── middlewares/    # Middleware (auth, error handling)
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── utils/          # Helper functions (email, payments)
│   ├── sendEmail.js  # Nodemailer for emails
│   └── payment.js
│
├── vercel.json     # Vercel deployment config
├── server.js       # Entry point (Vercel-compatible)
└── README.md       # This file
```

## API Endpoints

All endpoints under `/api/`. Protected routes require `Authorization: Bearer <token>` header (from login/register).

### Authentication
- `POST /api/auth/register` - Register new user (body: name, email, password, role optional 'user'/'seller'/'admin')
- `POST /api/auth/login` - Login (body: email, password)
- `GET /api/auth/profile` - Get profile (protected)
- `POST /api/auth/forgot-password` - Send reset token email (body: email)
- `POST /api/auth/reset-password` - Reset password (body: token, password)

### Users
- `PUT /api/users/profile` - Update profile (protected, body: name/email/password optional)
- `DELETE /api/users/profile` - Delete profile (protected)

### Sellers (role: 'seller' required)
- `POST /api/sellers/products` - Create product (body: name, description, price, photo, category)
- `GET /api/sellers/products` - Get own products
- `PUT /api/sellers/products/:id` - Update product (body optional fields)
- `DELETE /api/sellers/products/:id` - Delete product

### Products (public viewing)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?query=<search_term>` - Search by product name or seller storeName (protected, registered users only)

### Cart (protected)
- `GET /api/cart` - Get/create own cart
- `POST /api/cart` - Add item (body: productId, quantity)
- `PUT /api/cart` - Update item (body: productId, quantity; admin: +userId for any user)
- `DELETE /api/cart` - Remove item (body: productId; admin: +userId for any user)

### Orders (protected)
- `POST /api/orders` - Create order from cart (body: paymentMethod e.g. 'cash')
- `GET /api/orders` - Get own orders
- `GET /api/orders/:id` - Get order by ID

## Setup Instructions (Local Development)

1. Clone the repository: `git clone https://github.com/Ahmedsalah000/ecommerce.git`
2. Install dependencies: `npm install`
3. Create `.env` file (see Environment Variables below)
4. Set up MongoDB (local or Atlas, see Deployment)
5. Run the server: `npm run dev` (with nodemon) or `npm start`

## Environment Variables

Copy `.env.example` to `.env` and fill:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce  # Local or Atlas URI
JWT_SECRET=your_jwt_secret_key_here  # Generate a strong secret

# Email (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password  # See Gmail setup below
```

**Gmail Setup for Emails**:
- Enable 2-Step Verification on your Gmail.
- Generate App Password at https://myaccount.google.com/apppasswords (select "Mail" app).
- Use the 16-character code as EMAIL_PASS (no spaces).

## Role-Based Access Control

- **User**: View products (with search), manage own cart, place orders, edit profile.
- **Seller**: Manage own products (CRUD), view own orders.
- **Admin**: Full access + manage any user's cart (include `userId` in body for PUT/DELETE /api/cart).

## Deployment to Vercel

1. **Set up MongoDB Atlas** (required for cloud DB):
   - Sign up at https://www.mongodb.com/atlas.
   - Create free cluster (M0 tier).
   - Add database user (username/password).
   - Get connection string: Network Access > Add IP "0.0.0.0/0" (for Vercel).
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority`
   - Use this as MONGO_URI in Vercel env vars.

2. **Deploy on Vercel**:
   - Go to https://vercel.com, sign up/login (GitHub account).
   - Click "New Project" > Import your GitHub repo (Ahmedsalah000/ecommerce).
   - Framework: "Other" (Node.js detected).
   - Root Directory: Leave empty.
   - Build Command: Leave empty (uses npm install).
   - Output Directory: Leave empty.
   - Install Command: Leave empty.
   - Add Environment Variables in Vercel dashboard (Settings > Environment Variables):
     - MONGO_URI (from Atlas)
     - JWT_SECRET (same as local)
     - EMAIL_* vars (if using emails)
     - NODE_ENV=production
   - Deploy! Vercel will build and give URL like https://your-project.vercel.app.


## Technologies Used

- Node.js / Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- Bcryptjs for hashing
- Nodemailer for emails
- Vercel for deployment
- MongoDB Atlas for cloud DB

## Testing

Use Postman or similar. Start with register/login to get token, then test protected endpoints.

## Future Enhancements

- Payment gateway integration (Stripe/PayPal in utils/payment.js)
- Image upload (Multer/Cloudinary for products)
- Product reviews/ratings
- Inventory management
- Pagination/sorting for products/orders
- Frontend integration (React/Vue)


