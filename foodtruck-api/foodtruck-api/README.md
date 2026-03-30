# Food Truck Management API

A comprehensive RESTful API for managing food truck operations, built with Spring Boot and MySQL. This system handles products, orders, categories, expenses, and user management with enterprise-grade architecture and 100% test coverage.

## 🎯 Project Overview

**Food Truck Management API** is a production-ready food truck management system designed for real business use. The API provides complete CRUD operations for all entities with professional DTO architecture, role-based access control, and comprehensive business logic validation.

## 🏗️ Architecture

### Tech Stack
- **Framework:** Spring Boot 3.x
- **Language:** Java 17
- **Database:** MySQL 8.0
- **Security:** Spring Security 6 with JWT
- **Testing:** JUnit 5, Mockito
- **Build Tool:** Maven
- **ORM:** Hibernate/JPA

### Design Patterns
- DTO Pattern (Request/Response separation)
- Repository Pattern
- Service Layer Pattern
- Mapper Pattern for entity-DTO conversion
- Dependency Injection

## 📊 Database Schema

### Entities
1. **Users** - Employee and admin accounts
2. **Products** - Menu items with pricing and availability
3. **Categories** - Product categorization
4. **Orders** - Customer orders with line items
5. **OrderItems** - Individual items within an order (products, quantity, price)
6. **Expenses** - Business expense tracking

### Key Relationships
- Products belong to Categories (Many-to-One)
- Orders contain OrderItems (One-to-Many)
- OrderItems reference Products (Many-to-One)
- OrderItems belong to Orders (Many-to-One)
- Expenses are recorded by Users (Many-to-One)

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6+
- IDE (IntelliJ IDEA recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Noemi-24/FoodTruck-Management.git
cd foodtruck-api
```

2. **Configure database**

Create MySQL database:
```sql
CREATE DATABASE foodtruckdb;
```

Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodtruckdb
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. **Build the project**
```bash
mvn clean install
```

4. **Run the application**
```bash
mvn spring-boot:run
```

Application runs on `http://localhost:8081`

## 🔐 Authentication & Authorization

### Roles
- **ADMIN:** Full access to all operations
- **EMPLOYEE:** Can view all, create orders/expenses, update order status

### Security
- JWT-based authentication
- Password encryption with BCrypt
- Role-based access control on all endpoints

### Login Endpoint
```
POST /auth/login
Body: { "email": "user@example.com", "password": "password" }
Response: { "token": "jwt-token-here" }
```

## 📚 API Endpoints

### Users
```
GET    /api/users              - List all users (ADMIN, EMPLOYEE)
GET    /api/users/{id}         - Get user by ID (ADMIN, EMPLOYEE)
POST   /api/users              - Create user (ADMIN)
PUT    /api/users/{id}         - Update user (ADMIN)
PUT    /api/users/{id}/deactivate - Deactivate user (ADMIN)
```

### Products
```
GET    /api/products           - List all products (ADMIN, EMPLOYEE)
GET    /api/products/{id}      - Get product by ID (ADMIN, EMPLOYEE)
POST   /api/products           - Create product (ADMIN)
PUT    /api/products/{id}      - Update product (ADMIN)
PUT    /api/products/{id}/availability - Toggle availability (ADMIN)
```

### Categories
```
GET    /api/categories         - List all categories (ADMIN, EMPLOYEE)
GET    /api/categories/{id}    - Get category by ID (ADMIN, EMPLOYEE)
POST   /api/categories         - Create category (ADMIN)
PUT    /api/categories/{id}    - Update category (ADMIN)
DELETE /api/categories/{id}    - Delete category (ADMIN) *requires no products
```

### Orders
```
GET    /api/orders             - List all orders (ADMIN, EMPLOYEE)
GET    /api/orders/{id}        - Get order by ID (ADMIN, EMPLOYEE)
POST   /api/orders             - Create order (ADMIN, EMPLOYEE)
PUT    /api/orders/{id}/status - Update order status (ADMIN, EMPLOYEE)
```

### Expenses
```
GET    /api/expenses           - List all expenses (ADMIN, EMPLOYEE)
GET    /api/expenses/{id}      - Get expense by ID (ADMIN, EMPLOYEE)
POST   /api/expenses           - Create expense (ADMIN, EMPLOYEE)
PUT    /api/expenses/{id}      - Update expense (ADMIN)
DELETE /api/expenses/{id}      - Delete expense (ADMIN)
```

## 📋 Request/Response Examples

### Create Product
**Request:**
```json
POST /api/products
{
  "categoryId": 1,
  "name": "Tacos al Pastor",
  "description": "Traditional pork tacos with pineapple",
  "price": 12.99,
  "imageUrl": "https://example.com/tacos.jpg",
  "isSpecial": false
}
```

**Response:**
```json
{
  "productId": 1,
  "categoryId": 1,
  "categoryName": "Main Dishes",
  "name": "Tacos al Pastor",
  "description": "Traditional pork tacos with pineapple",
  "price": 12.99,
  "imageUrl": "https://example.com/tacos.jpg",
  "available": true,
  "isSpecial": false
}
```

### Create Order
**Request:**
```json
POST /api/orders
{
  "customerName": "John Doe",
  "customerPhone": "555-123-4567",
  "customerEmail": "john@example.com",
  "status": "PENDING",
  "paymentMethod": "CASH",
  "notes": "Extra hot sauce",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "notes": "No onions"
    }
  ]
}
```

**Response:**
```json
{
  "orderId": 1,
  "customerName": "John Doe",
  "customerPhone": "555-123-4567",
  "customerEmail": "john@example.com",
  "status": "PENDING",
  "paymentMethod": "CASH",
  "total": 25.98,
  "notes": "Extra hot sauce",
  "items": [
    {
      "orderItemId": 1,
      "productId": 1,
      "productName": "Tacos al Pastor",
      "quantity": 2,
      "priceAtOrder": 12.99,
      "subtotal": 25.98,
      "notes": "No onions"
    }
  ],
  "createdAt": "2026-03-30T14:30:00"
}
```

## 🎨 Business Logic

### Soft Deletes
- **Users:** Deactivated (active flag set to false)
- **Products:** Availability toggled (available flag set to false)
- **Orders:** Immutable - can only update status, no deletion

### Hard Deletes
- **Categories:** Only if no products associated
- **Expenses:** Admin-only for error correction

### Validations
- Email uniqueness for users
- Product availability check before order creation
- Category deletion blocked if products exist
- Order total automatically calculated
- Price and amount validation (positive values)

### Order Workflow
```
PENDING → IN_PREPARATION → READY → DELIVERED
```

## 🧪 Testing

### Coverage
- **100% line coverage** across all service layer implementations
- 40+ unit tests with Mockito
- Comprehensive edge case and exception handling

### Run Tests
```bash
# All tests
mvn test

# With coverage report
mvn test jacoco:report
```

### Test Structure
```
src/test/java/
├── service/
│   ├── UserServiceImplTest.java       (100% coverage)
│   ├── ProductServiceImplTest.java    (100% coverage)
│   ├── OrderServiceImplTest.java      (100% coverage)
│   ├── CategoryServiceImplTest.java   (100% coverage)
│   └── ExpenseServiceImplTest.java    (100% coverage)
```

## 📦 Project Structure
```
src/main/java/com/foodtruck/foodtruckapi/
├── config/              # Security and app configuration
├── controller/          # REST API endpoints
├── dto/
│   ├── request/        # Request DTOs
│   └── response/       # Response DTOs
├── entity/             # JPA entities
├── enums/              # Enumerations (OrderStatus, ExpenseCategory, etc.)
├── exception/          # Custom exceptions and global handler
├── mapper/             # Entity-DTO mappers
├── repository/         # JPA repositories
├── security/           # JWT and authentication
└── service/
    ├── impl/          # Service implementations
    └── [interfaces]   # Service interfaces
```

## 🔒 Security Features

- JWT token-based authentication
- BCrypt password hashing
- Role-based access control
- Input validation with Bean Validation
- SQL injection prevention (JPA/Hibernate)
- XSS protection
- CORS configuration

## 🚀 Production Deployment

### Environment Variables
```properties
DB_URL=jdbc:mysql://production-host:3306/foodtruckdb
DB_USERNAME=prod_user
DB_PASSWORD=secure_password
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
```

### Deployment Checklist
- [ ] Configure production database
- [ ] Set environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS for frontend domain
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Set up monitoring

## 📈 Future Enhancements (v2.0)

- [ ] Customer accounts and authentication
- [ ] Order tracking for customers
- [ ] Real-time order notifications (WebSocket)
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Loyalty program
- [ ] Multiple payment methods (Stripe, PayPal)
- [ ] Email notifications
- [ ] Report generation (sales, expenses)

## 👥 Team

**Developer:** Noemi Delgadillo Roldan
**Program:** Per Scholas Full-Stack Java Development
**Company:** Accenture/PeopleShores Apprenticeship

## 📝 License

Copyright © 2026 Noemi Delgadillo Roldan. All rights reserved.

This project was developed as a capstone project for the Per Scholas Full-Stack Java Development program. The code and intellectual property belong solely to the developer.

This software is provided for educational and portfolio purposes. Unauthorized copying, modification, distribution, or commercial use of this software is strictly prohibited without explicit written permission from the owner.

## 🤝 Contributing

This is a personal capstone project and is **not open for contributions**.

The codebase is maintained solely by the developer for portfolio and business purposes.

## 📧 Contact

**Developer:** Noemi Delgadillo Roldan

For inquiries regarding this project or potential collaborations:
- **GitHub:** Noemi-24

*Developed during Per Scholas Full-Stack Java Development Program*
*Apprenticeship with Accenture/PeopleShores*

---

