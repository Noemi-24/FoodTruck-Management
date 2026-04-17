# Food Truck Management System (FTMS)

A comprehensive full-stack application for managing food truck operations. Built with Spring Boot (backend), React + TypeScript (frontend), and MySQL database. This production-ready system handles products, orders, categories, expenses, and user management with enterprise-grade architecture and 97% test coverage(line coverage across all service implementations).

## 🎯 Project Overview

**Food Truck Management System** is a complete food truck POS and management solution designed for real business use. The system provides:

- **Product & Menu Management** — Track inventory, pricing, and availability
- **Order Processing** — Handle customer orders from creation to delivery, with Cash and Stripe payment support
- **Expense Tracking** — Monitor business costs and generate reports
- **User Management** — Role-based access for admins and employees
- **Category Organization** — Organize products efficiently
- **Sales Reports & Analytics** — Charts for monthly expenses, popular items, and daily sales

**Status:** Complete — backend and frontend fully functional.

---

## 🏗️ Tech Stack

### Backend
- **Framework:** Spring Boot 4.x
- **Language:** Java 17
- **Database:** MySQL 8.0
- **Security:** Spring Security 6 with JWT
- **Testing:** JUnit 5, Mockito (97% service coverage)
- **Build Tool:** Maven
- **ORM:** Hibernate/JPA
- **Payments:** Stripe Java SDK

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context, useReducer
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Payments:** Stripe.js + React Stripe.js
- **i18n:** react-i18next (English / Spanish)

### Database
- **RDBMS:** MySQL 8.0
- **Views:** `daily_sales`, `monthly_expenses`, `popular_items`

---

## 📊 Database Schema

### Entities
1. **Users** — Employee and admin accounts with role-based access
2. **Products** — Menu items with pricing, descriptions, and availability status
3. **Categories** — Product categorization for menu organization
4. **Orders** — Customer orders with contact info and status tracking
5. **OrderItems** — Individual line items within orders (quantity, pricing)
6. **Expenses** — Business expense tracking with categories and receipts

### Entity Relationships
```
Categories 1──────────────────────────┐
                                      │ Many-to-One
                                      ↓
                                  Products
                                      ↑
                                      │ Many-to-One
                                      │
Users 1───────────────────────────────┼─────────────┐
  │                                   │             │
  │ One-to-Many                       │             │ One-to-Many
  ↓                                   │             ↓
Expenses                          OrderItems ← Orders
                                  (One-to-Many)
```

---

## 💳 Payment Integration
- **Cash** — direct order creation
- **Stripe** — card payment via Stripe.js PaymentIntent flow
- Test mode supported with Stripe sandbox keys

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6+
- Node.js 18+
- IntelliJ IDEA (recommended) or any Java IDE
- Stripe account (sandbox keys for testing)

---

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Noemi-24/FoodTruck-Management.git
cd foodtruck-api
```

2. **Create MySQL database**
```sql
CREATE DATABASE foodtruckdb;
```

3. **Configure `src/main/resources/application.properties`**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodtruckdb
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

4. **Configure Stripe secret key**

Create `src/main/resources/application-local.properties` (gitignored):
```properties
stripe.secret.key=sk_test_your_key_here
```

Or set as an environment variable in IntelliJ:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

5. **Build and run**
```bash
mvn clean install
mvn spring-boot:run
```

Application runs on `http://localhost:8081`

---

### Frontend Setup

1. **Navigate to the frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** (gitignored)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

4. **Start the development server**
```bash
npm run dev
```

Application runs on `http://localhost:3000`

---

## 🔐 Security & Authentication

### User Roles
| Role | Access |
|------|--------|
| **ADMIN** | Full access — manage users, products, categories, expenses, reports |
| **EMPLOYEE** | Operational access — view products/categories, create and update orders |

### Security Features
- JWT token-based authentication
- BCrypt password encryption
- Role-based authorization on all endpoints
- CORS configuration
- Input validation with Bean Validation API

### Authentication Flow
```
1. POST /api/auth/login with credentials
2. Receive JWT token
3. Include token in all requests: Authorization: Bearer {token}
4. Token expires after 24 hours
```

**Login example:**
```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "yourPassword"
}

Response:
{
  "token": "eyJhbGci...",
  "userId": 1,
  "email": "admin@example.com",
  "role": "ADMIN"
}
```

---

## 📚 API Documentation

Base URL: `http://localhost:8081`

### Auth
```
POST   /api/auth/login           - Login and receive JWT token
POST   /api/auth/register        - Register new user
```

### Users
```
GET    /api/users                - List all users (ADMIN)
GET    /api/users/{id}           - Get user details (ADMIN)
POST   /api/users                - Create user (ADMIN)
PUT    /api/users/{id}           - Update user (ADMIN)
PUT    /api/users/{id}/deactivate  - Deactivate user (ADMIN)
PUT    /api/users/{id}/reactivate  - Reactivate user (ADMIN)
```

### Products
```
GET    /api/products                       - List all products (ADMIN, EMPLOYEE)
GET    /api/products/{id}                  - Get product details (ADMIN, EMPLOYEE)
POST   /api/products                       - Create product (ADMIN)
PUT    /api/products/{id}                  - Update product (ADMIN)
PUT    /api/products/{id}/availability     - Toggle availability (ADMIN, EMPLOYEE)
```

### Categories
```
GET    /api/categories           - List all categories (ADMIN)
GET    /api/categories/{id}      - Get category details (ADMIN)
POST   /api/categories           - Create category (ADMIN)
PUT    /api/categories/{id}      - Update category (ADMIN)
DELETE /api/categories/{id}      - Delete category (ADMIN — only if no products linked)
```

### Orders
```
GET    /api/orders               - List all orders (ADMIN, EMPLOYEE)
GET    /api/orders/{id}          - Get order details (ADMIN, EMPLOYEE)
POST   /api/orders               - Create order (ADMIN, EMPLOYEE)
PUT    /api/orders/{id}/status   - Update order status (ADMIN, EMPLOYEE)
```

**Order Status Flow:**
```
PENDING → IN_PREPARATION → READY → DELIVERED
                                 → CANCELLED (only during PENDING stage)
```

### Expenses
```
GET    /api/expenses             - List all expenses (ADMIN)
GET    /api/expenses/{id}        - Get expense details (ADMIN)
POST   /api/expenses             - Create expense (ADMIN)
PUT    /api/expenses/{id}        - Update expense (ADMIN)
DELETE /api/expenses/{id}        - Delete expense (ADMIN)
```

### Dashboard
```
GET    /api/dashboard/stats      - Get today's stats (ADMIN, EMPLOYEE)
```

### Reports
```
GET    /api/reports/monthly-expenses   - Monthly expenses by category (ADMIN)
GET    /api/reports/popular-items      - Most ordered products (ADMIN)
GET    /api/reports/daily-sales        - Daily sales history (ADMIN)
```

### Payments
```
POST   /api/payments/create-intent     - Create Stripe PaymentIntent (ADMIN, EMPLOYEE)
```

---

## 🧪 Testing

### Test Coverage
- **100% line coverage** across all service implementations
- JUnit 5 + Mockito
- Both success and failure scenarios covered

### Run Tests
```bash
# All tests
mvn test

# With coverage report
mvn test jacoco:report

# Coverage report location
target/site/jacoco/index.html
```

---

## 📦 Project Structure

```
FoodTruck-Management/
├── foodtruck-api/               # Spring Boot backend
│   └── src/
│       ├── main/java/com/foodtruck/foodtruckapi/
│       │   ├── config/          # Security, Stripe, CORS config
│       │   ├── controller/      # REST endpoints
│       │   ├── dto/             # Request & Response DTOs
│       │   ├── entity/          # JPA entities
│       │   ├── enums/           # OrderStatus, UserRole, etc.
│       │   ├── exception/       # Custom exceptions + GlobalExceptionHandler
│       │   ├── mapper/          # Entity ↔ DTO conversion
│       │   ├── repository/      # Spring Data JPA repositories
│       │   ├── security/        # JWT utilities
│       │   └── service/         # Business logic
│       └── test/                # JUnit tests (100% coverage)
│
└── frontend/                    # React + TypeScript frontend
    └── src/
        ├── components/          # Reusable UI components
        ├── context/             # AuthContext, ThemeContext, LanguageContext
        ├── lib/                 # Stripe configuration
        ├── locales/             # Translation files (en.json, es.json)
        ├── pages/               # Page components
        ├── reducers/            # cartReducer (useReducer)
        ├── services/            # API service layer (Axios)
        └── types/               # TypeScript interfaces & types
```

---

## 🔧 Business Logic

### Soft Deletes
- **Users:** Deactivated via `active` flag
- **Products:** Availability toggled via `available` flag
- **Orders:** Status updates only — never deleted

### Hard Deletes (with validation)
- **Categories:** Only if no associated products exist
- **Expenses:** Admin-only

### Automatic Behavior
- Order totals calculated from line items at order time
- Price locked at order creation
- `processedByUser` set automatically from authenticated user
- `recordedByUser` on expenses set from authenticated user

### Enums
- **OrderStatus:** PENDING, IN_PREPARATION, READY, DELIVERED, CANCELLED
- **PaymentMethod:** CASH, STRIPE
- **ExpenseCategory:** INGREDIENTS, FUEL, MAINTENANCE, PERMITS, SALARIES, MARKETING, SUPPLIES, OTHER
- **UserRole:** ADMIN, EMPLOYEE

---

## 🌐 Frontend Features

- **Dark mode** — persisted in localStorage
- **Multi-language** — English / Spanish (react-i18next)
- **Responsive design** — mobile-first with Tailwind CSS
- **Skeleton screens** — for all loading states
- **ARIA labels** — accessibility compliance
- **Role-based UI** — admin and employee views differ
- **Search** — filter products and menu in real time (useMemo)
- **Cart** — managed with useReducer
- **Charts** — Recharts (BarChart, PieChart, LineChart) for reports

---

## 🚀 Environment Variables

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodtruckdb
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your-jwt-secret
stripe.secret.key=${STRIPE_SECRET_KEY}
```

### Frontend (`.env`)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

---

## 👩‍💻 Developer

**Noemi Roldan**
Program: Per Scholas Full-Stack Java Development
Apprenticeship: Accenture / PeopleShores
Capstone Project — 2026

**GitHub:** [Noemi-24](https://github.com/Noemi-24)

---

*"Delicious food, powered by great technology"* 🌮