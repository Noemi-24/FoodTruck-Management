# FoodTruck Management System

A comprehensive full-stack web application for managing food truck operations including online ordering, inventory control, expense tracking, and sales analytics.

## 🎯 Project Overview

This system helps food truck operators streamline their business by providing:
- Customer-facing online ordering platform
- Real-time order management dashboard
- Inventory control and product availability tracking
- Business expense tracking and reporting
- Sales analytics and insights

## 🛠️ Technology Stack

**Backend (foodtruck-api):**
- Java 17
- Spring Boot 3.x
- Spring Data JPA / Hibernate
- Spring Security with JWT
- MySQL 8.0+

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

**Cloud Infrastructure:**
- AWS EC2 (Backend)
- AWS RDS (Database)
- AWS S3 (Frontend)
- AWS CodePipeline (CI/CD)
- CloudWatch (Monitoring)

## 📁 Project Structure
```
├── database/          # SQL schema and seed data
├── foodtruck-api/     # Spring Boot REST API (Coming soon)
├── frontend/          # React application (Coming soon)
└── docs/              # Documentation and diagrams (Coming soon)
```

## 🚀 Quick Start

### Database Setup
```bash
cd database
mysql -u root -p < FoodtruckSchema.sql
mysql -u root -p < FoodtruckSeed_data.sql
```

See `/database/README.md` for detailed instructions.

## 📊 Features

### Customer Features
- Browse menu with photos and prices
- Add items to cart
- Guest checkout (no account required)
- Online payment via Stripe
- Order status tracking

### Admin Features
- Real-time order dashboard
- Order status management (pending → preparing → ready → delivered)
- Product inventory control
- Expense tracking by category
- Daily sales reports

## 🔐 Security

- JWT-based authentication
- BCrypt password hashing
- Role-based access control (ADMIN, EMPLOYEE)
- Input validation and sanitization
- Secrets managed via AWS SSM Parameter Store

## 📚 Documentation

- **API Documentation:** Coming soon
- **Architecture Diagrams:** Coming soon
- **User Guide:** Coming soon

## 👥 Roles

- **ADMIN:** Full system access
- **EMPLOYEE:** Order management access
- **CUSTOMER:** Public ordering (no authentication required)

## 📄 License

This project is part of a capstone project for educational purposes.

## 🤝 Contributing

This is a capstone project. Contributions are not currently accepted.

## 📧 Contact

For questions or feedback, please contact via GitHub issues.