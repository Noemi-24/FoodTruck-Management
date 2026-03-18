# Database Setup

This directory contains SQL scripts for setting up the FoodTruck Managment System database.

## Files

- `FoodtruckSchema.sql` - Database schema(tables, indexes, views)
- `FoodtruckSeed.sql` - Sample data for development and testing

## Prerequisites

- MySQL 8.0 or higher
- MySQL client or MySQL Workbench 

## Setup Instructions

### Option 1: Command Line

``` bash
# Create database and tables 
mysql -u root -p < FoodtruckSchema.sql

# Load sample data
mysql -u root -p < FoodtruckSeed.sql
```

### Option 2: MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Run SQL Script
4. Select `FoodtruckSchema.sql` and execute
5. Repeat with `FoodtruckSeed.sql`

## Verification
```sql
USE FoodTruckDB;

-- Check tables were created
SHOW TABLES;

-- Verify data was loaded
SELECT COUNT(*) FROM Products;
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Orders;
```

You should see:
- 6 tables created
- 16 products
- 3 users
- 4 sample orders

## Database Schema

### Tables

- **Users** - Admin and employee accounts
- **Categories** - Menu item categories
- **Products** - Menu items
- **Orders** - Customer orders (guest checkout)
- **OrderItems** - Line items for each order
- **Expenses** - Business expense tracking

### Sample Credentials

**Admin:**
- Email: `admin@foodtruck.com`
- Password: `password123` (hashed with BCrypt)

**Employee:**
- Email: `john.smith@foodtruck.com`
- Password: `password123` (hashed with BCrypt)

## Configuration for Spring Boot

Add this to your `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/FoodTruckDB
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
```

## Troubleshooting

### Error: "Access denied for user"
- Check your MySQL username and password
- Verify MySQL server is running

### Error: "Unknown database"
- Run `FoodtruckSchema.sql` first to create the database
- Verify the database name matches in both scripts

### Error: "Table already exists"
- Drop the database and recreate:
```sql
  DROP DATABASE IF EXISTS FoodTruckDB;
```
  Then run `FoodtruckSchema.sql` again