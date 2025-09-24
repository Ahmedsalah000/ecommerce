# E-Commerce Backend API

A RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, password reset)
- Role-based access control (user, seller, admin)
- Product management
- Cart functionality
- Order processing
- Search functionality

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
│   ├── sendEmail.js
│   └── payment.js
│
└── server.js       # Entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Users
- `PUT /api/users/profile` - Update user profile (requires authentication)
- `DELETE /api/users/profile` - Delete user profile (requires authentication)

### Sellers
- `POST /api/sellers/products` - Create a new product (requires seller authentication)
- `GET /api/sellers/products` - Get seller's products (requires seller authentication)
- `PUT /api/sellers/products/:id` - Update a product (requires seller authentication)
- `DELETE /api/sellers/products/:id` - Delete a product (requires seller authentication)

### Products
- `GET /api/products` - Get all products (with optional search)
- `GET /api/products/:id` - Get a specific product

### Cart
- `GET /api/cart` - Get user's cart (requires authentication)
- `POST /api/cart` - Add item to cart (requires authentication)
- `PUT /api/cart` - Update cart item (requires authentication)
- `DELETE /api/cart` - Remove item from cart (requires authentication)

### Orders
- `POST /api/orders` - Create an order from cart (requires authentication)
- `GET /api/orders` - Get user's orders (requires authentication)
- `GET /api/orders/:id` - Get a specific order (requires authentication)

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start MongoDB server
5. Run the server: `npm run dev` (development) or `npm start` (production)

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Dotenv for environment variables
- Cors for Cross-Origin Resource Sharing
- Helmet for security headers
- Morgan for logging

## Role-Based Access Control

- **User**: Can view products, manage cart, place orders
- **Seller**: Can manage own products, view orders
- **Admin**: Full access to all resources

## Future Enhancements

- Implement email verification
- Add payment gateway integration
- Implement image upload for products
- Add product reviews and ratings
- Implement inventory management
- Add pagination for large datasets