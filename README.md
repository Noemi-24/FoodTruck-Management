# Food Truck Management System

A comprehensive full-stack application for managing food truck operations. Built with Spring Boot (backend), React (frontend - in development), and MySQL database. This production-ready system handles products, orders, categories, expenses, and user management with enterprise-grade architecture and 100% test coverage.

## 🎯 Project Overview

**Food Truck Management System** is a complete food truck management solution designed for real business use. The system provides:
- **Product & Menu Management** - Track inventory, pricing, and availability
- **Order Processing** - Handle customer orders from creation to delivery
- **Expense Tracking** - Monitor business costs and generate reports
- **User Management** - Role-based access for admins and employees
- **Category Organization** - Organize products efficiently

**Status:** Backend complete with 100% test coverage. Frontend in development.

## 🏗️ Tech Stack

### Backend
- **Framework:** Spring Boot 4.x
- **Language:** Java 17
- **Database:** MySQL 8.0
- **Security:** Spring Security 6 with JWT
- **Testing:** JUnit 5, Mockito (100% coverage)
- **Build Tool:** Maven
- **ORM:** Hibernate/JPA

### Frontend (In Development)
- **Framework:** React 18
- **State Management:** React Context / Redux (TBD)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS / Bootstrap (TBD)

### Database
- **RDBMS:** MySQL 8.0
- **Version Control:** Flyway / Liquibase (TBD)

## 📊 Database Schema

### Entities
1. **Users** - Employee and admin accounts with role-based access
2. **Products** - Menu items with pricing, descriptions, and availability status
3. **Categories** - Product categorization for menu organization
4. **Orders** - Customer orders with contact info and status tracking
5. **OrderItems** - Individual line items within orders (quantity, pricing)
6. **Expenses** - Business expense tracking with categories and receipts

### Entity Relationships
```
Categories 1──────┐
                  │
                  │ Many-to-One
                  │
                  ↓
              Products
                  ↑
                  │ Many-to-One
                  │
Users 1───────────┼─────────┐
  │               │         │
  │               │         │
  │ One-to-Many   │         │ One-to-Many
  │               │         │
  ↓               │         ↓
Expenses      OrderItems ← Orders
                  ↑         (One-to-Many)
                  │
                  └─────────┘
```

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
- Node.js 18+ (for frontend when ready)
- IDE (IntelliJ IDEA recommended)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Noemi-24/FoodTruck-Management.git
cd foodtruck-api
```

2. **Configure MySQL database**

Create database:
```sql
CREATE DATABASE foodtruckdb;
```

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodtruckdb
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. **Build and run**
```bash
# Install dependencies and build
mvn clean install

# Run application
mvn spring-boot:run

# Run with tests
mvn test

# Run with coverage report
mvn test jacoco:report
```

Application runs on `http://localhost:8081`

### Frontend Setup (Coming Soon)
Frontend development in progress. Instructions will be added once completed.

## 🔐 Security & Authentication

### User Roles
- **ADMIN:** Full system access - manage users, products, categories, expenses
- **EMPLOYEE:** Operational access - view all, create orders/expenses, update order status

### Security Features
- JWT token-based authentication
- BCrypt password encryption (strength 10)
- Role-based authorization on all endpoints
- CORS configuration for frontend integration
- SQL injection prevention via JPA/Hibernate
- XSS protection headers
- Input validation with Bean Validation API

### Authentication Flow
```
1. POST /auth/login with credentials
2. Receive JWT token
3. Include token in Authorization header: "Bearer {token}"
4. Token expires after 24 hours (configurable)
```

**Login Example:**
```json
POST /auth/login
{
  "email": "admin@cielitolindo.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "admin@cielitolindo.com",
  "role": "ADMIN"
}
```

## 📚 API Documentation

Base URL: `http://localhost:8080`

### Users API
```
GET    /api/users              - List all users (ADMIN, EMPLOYEE)
GET    /api/users/{id}         - Get user details (ADMIN, EMPLOYEE)
POST   /api/users              - Create new user (ADMIN only)
PUT    /api/users/{id}         - Update user (ADMIN only)
PUT    /api/users/{id}/deactivate - Deactivate user account (ADMIN only)
```

### Products API
```
GET    /api/products                    - List all products (ADMIN, EMPLOYEE)
GET    /api/products/{id}               - Get product details (ADMIN, EMPLOYEE)
POST   /api/products                    - Create product (ADMIN only)
PUT    /api/products/{id}               - Update product (ADMIN only)
PUT    /api/products/{id}/availability  - Toggle availability (ADMIN only)
```

### Categories API
```
GET    /api/categories         - List all categories (ADMIN, EMPLOYEE)
GET    /api/categories/{id}    - Get category details (ADMIN, EMPLOYEE)
POST   /api/categories         - Create category (ADMIN only)
PUT    /api/categories/{id}    - Update category (ADMIN only)
DELETE /api/categories/{id}    - Delete category* (ADMIN only)
                                 *Only if no products associated
```

### Orders API
```
GET    /api/orders             - List all orders (ADMIN, EMPLOYEE)
GET    /api/orders/{id}        - Get order details (ADMIN, EMPLOYEE)
POST   /api/orders             - Create new order (ADMIN, EMPLOYEE)
PUT    /api/orders/{id}/status - Update order status (ADMIN, EMPLOYEE)
```

**Order Status Flow:**
```
PENDING → IN_PREPARATION → READY → DELIVERED
```

### Expenses API
```
GET    /api/expenses           - List all expenses (ADMIN, EMPLOYEE)
GET    /api/expenses/{id}      - Get expense details (ADMIN, EMPLOYEE)
POST   /api/expenses           - Create expense (ADMIN, EMPLOYEE)
PUT    /api/expenses/{id}      - Update expense (ADMIN only)
DELETE /api/expenses/{id}      - Delete expense (ADMIN only)
```

## 📋 API Request/Response Examples

### Create Product
**Request:**
```json
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "categoryId": 1,
  "name": "Tacos al Pastor",
  "description": "Traditional pork tacos with pineapple and cilantro",
  "price": 12.99,
  "imageUrl": "https://example.com/images/tacos-pastor.jpg",
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
  "description": "Traditional pork tacos with pineapple and cilantro",
  "price": 12.99,
  "imageUrl": "https://example.com/images/tacos-pastor.jpg",
  "available": true,
  "isSpecial": false
}
```

### Create Order
**Request:**
```json
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerName": "Maria Garcia",
  "customerPhone": "555-123-4567",
  "customerEmail": "maria@example.com",
  "status": "PENDING",
  "paymentMethod": "CASH",
  "notes": "Extra hot sauce on the side",
  "items": [
    {
      "productId": 1,
      "quantity": 3,
      "notes": "No onions"
    },
    {
      "productId": 5,
      "quantity": 2,
      "notes": ""
    }
  ]
}
```

**Response:**
```json
{
  "orderId": 1,
  "customerName": "Maria Garcia",
  "customerPhone": "555-123-4567",
  "customerEmail": "maria@example.com",
  "status": "PENDING",
  "paymentMethod": "CASH",
  "total": 48.97,
  "notes": "Extra hot sauce on the side",
  "items": [
    {
      "orderItemId": 1,
      "productId": 1,
      "productName": "Tacos al Pastor",
      "quantity": 3,
      "priceAtOrder": 12.99,
      "subtotal": 38.97,
      "notes": "No onions"
    },
    {
      "orderItemId": 2,
      "productId": 5,
      "productName": "Horchata",
      "quantity": 2,
      "priceAtOrder": 5.00,
      "subtotal": 10.00,
      "notes": ""
    }
  ],
  "createdAt": "2026-03-30T14:30:00"
}
```

### Create Expense
**Request:**
```json
POST /api/expenses
Authorization: Bearer {token}
Content-Type: application/json

{
  "recordedByUserId": 1,
  "date": "2026-03-30",
  "amount": 150.00,
  "category": "FUEL",
  "description": "Gas fill-up for food truck",
  "receiptUrl": "https://example.com/receipts/fuel-03-30.pdf"
}
```

**Response:**
```json
{
  "expenseId": 1,
  "recordedByUserId": 1,
  "recordedByUserName": "Admin User",
  "date": "2026-03-30",
  "amount": 150.00,
  "category": "FUEL",
  "description": "Gas fill-up for food truck",
  "receiptUrl": "https://example.com/receipts/fuel-03-30.pdf"
}
```

## 🎨 Business Logic & Rules

### Soft Deletes
- **Users:** Deactivated via `active` flag (preserves employment history)
- **Products:** Availability toggled via `available` flag (maintains order history)
- **Orders:** Immutable after creation - status updates only

### Hard Deletes (with validation)
- **Categories:** Only if no associated products exist (throws ConflictException)
- **Expenses:** Admin-only for error correction

### Automatic Calculations
- Order totals calculated from line items
- OrderItem subtotals = quantity × price at order time
- Price locked at order creation (price changes don't affect existing orders)

### Validations
- **Email uniqueness** for user accounts
- **Product availability** checked before order creation
- **Category deletion** blocked if products exist
- **Price validation** - must be positive, max 9999.99
- **Phone format** - 555-123-4567 pattern
- **Required fields** enforced via Bean Validation

### Order Workflow
```
PENDING           - Customer places order
    ↓
IN_PREPARATION    - Kitchen preparing food
    ↓
READY             - Order ready for pickup/delivery
    ↓
DELIVERED         - Order completed
```

**Orders cannot be deleted** - only status can be updated. To cancel: set status to CANCELLED.

### Enums
**OrderStatus:** PENDING, IN_PREPARATION, READY, DELIVERED, CANCELLED
**PaymentMethod:** CASH, CARD, DIGITAL_WALLET
**ExpenseCategory:** FUEL, SUPPLIES, MAINTENANCE, PERMITS, OTHER
**UserRole:** ADMIN, EMPLOYEE

## 🧪 Testing

### Test Coverage
- **100% line coverage** across all service layer implementations
- 162/162 lines covered
- 40+ comprehensive unit tests
- All edge cases and exceptions tested

### Coverage by Service
```
UserServiceImpl      100% (36/36 lines)   ✅
ProductServiceImpl   100% (37/37 lines)   ✅
OrderServiceImpl     100% (39/39 lines)   ✅
CategoryServiceImpl  100% (21/21 lines)   ✅
ExpenseServiceImpl   100% (29/29 lines)   ✅
```

### Run Tests
```bash
# All tests
mvn test

# With coverage report
mvn test jacoco:report

# Coverage report location
target/site/jacoco/index.html

# Run specific test class
mvn test -Dtest=ProductServiceImplTest

# Run single test method
mvn test -Dtest=ProductServiceImplTest#testCreateProduct_Success
```

### Test Structure
```
src/test/java/com/foodtruck/foodtruckapi/
└── service/
    ├── UserServiceImplTest.java       - 5 tests, 100% coverage
    ├── ProductServiceImplTest.java    - 12 tests, 100% coverage
    ├── OrderServiceImplTest.java      - 5 tests, 100% coverage
    ├── CategoryServiceImplTest.java   - 8 tests, 100% coverage
    └── ExpenseServiceImplTest.java    - 10 tests, 100% coverage
```

### Testing Patterns Used
- **Arrange-Act-Assert** pattern
- **Mockito** for dependency mocking
- **@ExtendWith(MockitoExtension.class)** for test setup
- **Exception testing** with assertThrows
- **Verify interactions** with mock objects
- **Edge case coverage** (not found, conflicts, validation failures)

## 📦 Project Structure
```
foodtruck-api/
├── src/
│   ├── main/
│   │   ├── java/com/foodtruck/foodtruckapi/
│   │   │   ├── config/              # Security, CORS, app configuration
│   │   │   ├── controller/          # REST API endpoints
│   │   │   ├── dto/
│   │   │   │   ├── request/        # Request DTOs (CreateXRequest, UpdateXRequest)
│   │   │   │   └── response/       # Response DTOs (XResponse)
│   │   │   ├── entity/             # JPA entities (database models)
│   │   │   ├── enums/              # Enumerations (OrderStatus, UserRole, etc.)
│   │   │   ├── exception/          # Custom exceptions + GlobalExceptionHandler
│   │   │   ├── mapper/             # Entity ↔ DTO conversion
│   │   │   ├── repository/         # Spring Data JPA repositories
│   │   │   ├── security/           # JWT utilities, UserDetailsService
│   │   │   └── service/
│   │   │       ├── impl/          # Service implementations
│   │   │       └── [interfaces]   # Service interfaces
│   │   └── resources/
│   │       ├── application.properties   # Application configuration
│   │       └── schema.sql              # Optional database schema
│   └── test/
│       └── java/com/foodtruck/foodtruckapi/
│           └── service/            # Service layer tests (100% coverage)
├── target/                         # Compiled classes and build artifacts
├── .gitignore
├── pom.xml                        # Maven dependencies and build config
└── README.md                      # This file
```

## 🔧 Architecture Patterns

### DTO Pattern
- **Separation of concerns** - internal entities vs external API contracts
- **Security** - sensitive fields (passwords, internal IDs) never exposed
- **Flexibility** - API changes don't require entity changes

### Repository Pattern
- **Data access abstraction** via Spring Data JPA
- **Query methods** generated from method names
- **Custom queries** with @Query when needed

### Service Layer
- **Business logic** centralized in service layer
- **Transaction management** with @Transactional
- **Validation** before database operations

### Mapper Pattern
- **Clean conversion** between entities and DTOs
- **Centralized mapping logic** in dedicated mapper classes
- **Testable** conversion logic

### Exception Handling
- **Global exception handler** (@ControllerAdvice)
- **Custom exceptions** (ResourceNotFoundException, ConflictException, etc.)
- **Consistent error responses** across all endpoints

## 🚀 Deployment

### Environment Variables (Production)
```properties
# Database
DB_URL=jdbc:mysql://production-host:3306/foodtruckdb
DB_USERNAME=prod_user
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your-production-secret-key-min-256-bits
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Production Checklist
- [ ] Configure production database with SSL
- [ ] Set strong JWT secret (min 256 bits)
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS for frontend domain only
- [ ] Set up automated database backups
- [ ] Configure application logging (ELK stack / CloudWatch)
- [ ] Set up monitoring and alerts
- [ ] Enable rate limiting
- [ ] Review security headers
- [ ] Perform security audit
- [ ] Load testing

### Build for Production
```bash
# Create production JAR
mvn clean package -DskipTests

# Run production JAR
java -jar target/foodtruck-api-0.0.1-SNAPSHOT.jar

# With environment variables
java -jar target/foodtruck-api.jar \
  --spring.profiles.active=prod \
  --spring.datasource.url=${DB_URL} \
  --spring.datasource.username=${DB_USERNAME} \
  --spring.datasource.password=${DB_PASSWORD}
```

### Docker Deployment (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 📈 Future Enhancements

### Version 2.0 Roadmap
- [ ] **Customer Portal**
    - Customer account creation and authentication
    - Order history and tracking
    - Favorite orders and reordering
    - Saved payment methods

- [ ] **Real-time Features**
    - WebSocket integration for live order updates
    - Kitchen display system
    - Customer order status notifications (SMS/Email)

- [ ] **Analytics & Reporting**
    - Sales dashboard with charts
    - Expense reports by category and time period
    - Popular products analysis
    - Revenue forecasting

- [ ] **Inventory Management**
    - Stock tracking and alerts
    - Automatic reorder notifications
    - Ingredient-level tracking
    - Waste management

- [ ] **Payment Integration**
    - Stripe payment processing
    - PayPal integration
    - Digital wallet support (Apple Pay, Google Pay)
    - Split payment options

- [ ] **Marketing Features**
    - Loyalty program with points
    - Promotional codes and discounts
    - Email marketing integration
    - Push notifications

- [ ] **Mobile App**
    - Native iOS/Android apps
    - QR code ordering
    - Location-based notifications
    - Mobile payment

- [ ] **Advanced Features**
    - Multi-location support
    - Delivery zone management
    - Scheduled orders
    - Catering orders
    - Recipe management

## 👥 Team

**Developer:** Noemi Roldan  
**Program:** Per Scholas Full-Stack Java Development  
**Apprenticeship:** Accenture/PeopleShores

**Project Type:** Capstone Project  
**Timeline:** March 2026  
**Status:** Backend Complete, Frontend In Development

## 📝 License

Copyright © 2026 Noemi Roldan. All rights reserved.

This project was developed as a capstone project for the Per Scholas Full-Stack Java Development program. The code and intellectual property belong solely to the developer.

This software is provided for educational and portfolio purposes. Unauthorized copying, modification, distribution, or commercial use of this software is strictly prohibited without explicit written permission from the owner.

## 🤝 Contributing

This is a personal capstone project and is **not open for contributions**.

The codebase is maintained solely by the developer for portfolio and business purposes.

## 📧 Contact

**Developer:** Noemi Roldan

This project is part of my professional portfolio. For business inquiries or collaboration opportunities, please connect via GitHub or LinkedIn.

**GitHub:** Noemi-24  

*Capstone Project - Per Scholas Full-Stack Java Development Program*  
*Accenture/PeopleShores Apprenticeship*

---

*"Delicious food, powered by great technology"*