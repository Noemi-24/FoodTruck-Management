-- ============================================
-- FOOD TRUCK MANAGEMENT SYSTEM - DATABASE SCHEMA
-- Generic version for capstone project
-- ============================================

CREATE SCHEMA IF NOT EXISTS FoodTruckDB;
USE FoodTruckDB;

-- Drop tables in reverse order (to handle foreign keys)
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Expenses;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;

-- ============================================
-- TABLE: Users
-- Admin and employee accounts (NOT customers)
-- ============================================
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    Role ENUM('ADMIN', 'EMPLOYEE') NOT NULL,
    Active BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: Categories
-- Menu item categories
-- ============================================
CREATE TABLE IF NOT EXISTS Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: Products
-- Menu items
-- ============================================
CREATE TABLE IF NOT EXISTS Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    ImageUrl VARCHAR(255),
    Available BOOLEAN DEFAULT TRUE,
    IsSpecial BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- ============================================
-- TABLE: Orders
-- Customer orders (guest checkout - no customer accounts)
-- ============================================
CREATE TABLE IF NOT EXISTS Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    ProcessedByUserID INT,
    CustomerName VARCHAR(100) NOT NULL,
    CustomerPhone VARCHAR(20) NOT NULL,
    CustomerEmail VARCHAR(100),
    Total DECIMAL(10,2) NOT NULL,
    Status ENUM('PENDING', 'IN_PREPARATION', 'READY', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
	PaymentMethod ENUM('CASH', 'STRIPE') DEFAULT 'CASH',
    Notes TEXT,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProcessedByUserID) REFERENCES Users(UserID)
);

-- ============================================
-- TABLE: OrderItems
-- Line items for each order
-- ============================================
CREATE TABLE IF NOT EXISTS OrderItems (
    OrderItemID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    PriceAtOrder DECIMAL(10,2) NOT NULL,
    Subtotal DECIMAL(10,2),
    Notes TEXT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- ============================================
-- TABLE: Expenses
-- Business expense tracking
-- ============================================
CREATE TABLE IF NOT EXISTS Expenses (
    ExpenseID INT AUTO_INCREMENT PRIMARY KEY,
    RecordedByUserID INT NOT NULL,
    Date DATE NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Category ENUM('INGREDIENTS', 'FUEL', 'MAINTENANCE', 'PERMITS', 'SALARIES', 'MARKETING', 'SUPPLIES', 'OTHER') NOT NULL,
    Description TEXT NOT NULL,
    ReceiptUrl VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RecordedByUserID) REFERENCES Users(UserID)
);

-- ============================================
-- INDEXES for performance optimization
-- ============================================
CREATE INDEX idx_orders_status ON Orders(Status);
CREATE INDEX idx_orders_date ON Orders(OrderDate);
CREATE INDEX idx_products_category ON Products(CategoryID);
CREATE INDEX idx_products_available ON Products(Available);
CREATE INDEX idx_expenses_date ON Expenses(Date);
CREATE INDEX idx_expenses_category ON Expenses(Category);

-- ============================================
-- VIEWS for common queries
-- ============================================

-- Daily sales summary
CREATE VIEW daily_sales AS
SELECT 
    DATE(OrderDate) as sale_date,
    COUNT(*) as total_orders,
    SUM(Total) as total_revenue
FROM Orders
WHERE Status != 'CANCELLED'
GROUP BY DATE(OrderDate);

-- Popular menu items
CREATE VIEW popular_items AS
SELECT 
    p.ProductID,
    p.Name,
    c.Name as CategoryName,
    COUNT(oi.OrderItemID) as times_ordered,
    SUM(oi.Subtotal) as total_revenue
FROM Products p
JOIN Categories c ON p.CategoryID = c.CategoryID
JOIN OrderItems oi ON p.ProductID = oi.ProductID
JOIN Orders o ON oi.OrderID = o.OrderID
WHERE o.Status != 'CANCELLED'
GROUP BY p.ProductID, p.Name, c.Name
ORDER BY times_ordered DESC;

-- Monthly expenses by category
CREATE VIEW monthly_expenses AS
SELECT 
    DATE_FORMAT(Date, '%Y-%m') as month,
    Category,
    COUNT(*) as expense_count,
    SUM(Amount) as total_amount
FROM Expenses
GROUP BY DATE_FORMAT(Date, '%Y-%m'), Category;