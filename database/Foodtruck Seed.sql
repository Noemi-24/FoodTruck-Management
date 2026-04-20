-- ============================================
-- FOOD TRUCK MANAGEMENT SYSTEM - SAMPLE DATA
-- Generic test data for development and demonstration
-- ============================================

USE FoodTruckDB;

-- ============================================
-- USERS (Admin and Employees)
-- ============================================
-- Password for all accounts: "password123" 
-- (In production, these would be properly hashed with BCrypt)
INSERT INTO Users (Name, Email, Password, Phone, Role) VALUES
('John Smith', 'john.smith@foodtruck.com', '$2a$10$iGKnWve1ETbBVYWHjebIoeM9o6W/O7V9YVJixLCBBF1NWdZLGzBpq', '614-555-0100', 'ADMIN'),
('John Doe', 'john.doe@foodtruck.com', '$2a$10$iGKnWve1ETbBVYWHjebIoeM9o6W/O7V9YVJixLCBBF1NWdZLGzBpq', '614-555-0101', 'EMPLOYEE'),
('Jane Doe', 'jane.doe@foodtruck.com', '$2a$10$iGKnWve1ETbBVYWHjebIoeM9o6W/O7V9YVJixLCBBF1NWdZLGzBpq', '614-555-0102', 'EMPLOYEE');

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO Categories (Name) VALUES
('Main Dishes'),
('Sandwiches'),
('Beverages'),
('Desserts'),
('Sides');

-- ============================================
-- PRODUCTS (Menu Items)
-- ============================================
INSERT INTO Products (CategoryID, Name, Description, Price, ImageUrl, Available, IsSpecial) VALUES
-- Main Dishes
(1, 'Classic Street Taco', 'Seasoned protein with fresh toppings and salsa', 3.99, '/classic-st-taco.jpg', TRUE, TRUE),
(1, 'Signature Bowl', 'Rice bowl with protein, vegetables, and house sauce', 10.99, '/signature-bowl.jpg', TRUE, FALSE),
(1, 'Grilled Wrap', 'Grilled tortilla with protein and fresh vegetables', 8.99, '/grilled-wrap.jpg', TRUE, FALSE),
(1, 'Specialty Platter', 'Combination platter with rice, beans, and protein', 12.99, '/specialty-platter.jpg', TRUE, TRUE),

-- Sandwiches
(2, 'Premium Sandwich', 'Artisan bread with premium toppings and spread', 9.99, '/premium-sandwich.jpg', TRUE, FALSE),
(2, 'Classic Burger', 'Grilled burger with lettuce, tomato, and special sauce', 8.99, '/classic-burger.jpg', TRUE, FALSE),
(2, 'Veggie Delight', 'Plant-based sandwich with fresh vegetables', 7.99, '/veggie-delight.jpg', TRUE, FALSE),

-- Beverages
(3, 'Fresh Juice', 'House-made fresh juice', 3.50, '/fresh-juice.jpg', TRUE, FALSE),
(3, 'Specialty Drink', 'Traditional specialty beverage', 3.50, '/specialty-drink.jpg', TRUE, FALSE),
(3, 'Bottled Soda', 'Assorted sodas (Coke, Sprite, Fanta)', 2.00, '/bottled-soda.png', TRUE, FALSE),
(3, 'Bottled Water', 'Premium bottled water', 1.50, '/bottled-water.jpg', TRUE, FALSE),

-- Desserts
(4, 'Sweet Treat', 'Classic sweet treat with cinnamon sugar', 4.50, '/sweet-treat.jpg', TRUE, FALSE),
(4, 'Specialty Dessert', 'House specialty dessert', 5.00, '/specialty-dessert.jpg', TRUE, FALSE),

-- Sides
(5, 'Premium Side', 'Extra portion of premium topping', 2.50, '/premium-side.jpg', TRUE, FALSE),
(5, 'Chips & Dip', 'House-made chips with signature dip', 3.99, '/chips-dip.jpg', TRUE, FALSE),
(5, 'Extra Sauce', 'Additional sauce portion', 1.50, '/extra-sauce.jpg', TRUE, FALSE);

-- ============================================
-- SAMPLE ORDERS
-- ============================================
INSERT INTO Orders (ProcessedByUserID, CustomerName, CustomerPhone, CustomerEmail, Total, Status, PaymentMethod, Notes) VALUES
(1, 'Alice Johnson', '614-555-1234', 'alice.j@email.com', 42.46, 'DELIVERED', 'STRIPE', 'Extra sauce on the side'),
(2, 'Bob Martinez', '614-555-5678', 'bob.m@email.com', 21.98, 'READY', 'CASH', NULL),
(3, 'Carol White', '614-555-9012', 'carol.w@email.com', 13.99, 'IN_PREPARATION', 'STRIPE', 'No onions please'),
(1, 'David Chen', '614-555-3456', NULL, 8.99, 'PENDING', 'CASH', NULL);

-- ============================================
-- ORDER ITEMS (Line items for each order)
-- ============================================

-- Order 1: Alice Johnson (Total: $42.46)
INSERT INTO OrderItems (OrderID, ProductID, Quantity, PriceAtOrder, Subtotal, Notes) VALUES
(1, 1, 4, 3.99, 15.96, NULL),           -- 4 Classic Street Tacos
(1, 2, 2, 10.99, 21.98, NULL),          -- 2 Signature Bowls
(1, 8, 1, 3.50, 3.50, 'No ice'),        -- 1 Fresh Juice
(1, 14, 1, 2.50, 2.50, 'Extra spicy');  -- 1 Premium Side

-- Order 2: Bob Martinez (Total: $21.98)
INSERT INTO OrderItems (OrderID, ProductID, Quantity, PriceAtOrder, Subtotal, Notes) VALUES
(2, 1, 2, 3.99, 7.98, NULL),            -- 2 Classic Street Tacos
(2, 5, 1, 9.99, 9.99, NULL),            -- 1 Premium Sandwich
(2, 10, 2, 2.00, 4.00, NULL);           -- 2 Bottled Sodas

-- Order 3: Carol White (Total: $13.99)
INSERT INTO OrderItems (OrderID, ProductID, Quantity, PriceAtOrder, Subtotal, Notes) VALUES
(3, 3, 1, 8.99, 8.99, 'No onions'),     -- 1 Grilled Wrap
(3, 12, 1, 4.50, 4.50, NULL),           -- 1 Sweet Treat
(3, 11, 1, 1.50, 1.50, NULL);           -- 1 Bottled Water

-- Order 4: David Chen (Total: $8.99)
INSERT INTO OrderItems (OrderID, ProductID, Quantity, PriceAtOrder, Subtotal, Notes) VALUES
(4, 6, 1, 8.99, 8.99, NULL);            -- 1 Classic Burger

-- ============================================
-- SAMPLE EXPENSES
-- ============================================
INSERT INTO Expenses (RecordedByUserID, Date, Amount, Category, Description, ReceiptUrl) VALUES
(1, '2026-03-10', 350.00, 'INGREDIENTS', 'Weekly food supplies from restaurant supplier', '/receipt.jpg'),
(1, '2026-03-10', 60.00, 'FUEL', 'Propane tank refill', '/receipt.jpg'),
(1, '2026-03-11', 120.00, 'INGREDIENTS', 'Fresh produce from local market', '/receipt.jpg'),
(1, '2026-03-11', 45.00, 'SUPPLIES', 'Disposable plates, cups, and napkins', '/receipt.jpg'),
(1, '2026-03-12', 200.00, 'PERMITS', 'Monthly health permit renewal', '/receipt.jpg'),
(2, '2026-03-12', 75.00, 'MAINTENANCE', 'Equipment repair and maintenance', '/receipt.jpg'),
(1, '2026-03-13', 50.00, 'MARKETING', 'Social media advertising budget', '/receipt.jpg');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Uncomment these to verify data was inserted correctly

-- SELECT * FROM Users;
-- SELECT * FROM Categories;
-- SELECT * FROM Products;
-- SELECT * FROM Orders;
-- SELECT * FROM OrderItems;
-- SELECT * FROM Expenses;

-- View complete orders with items
-- SELECT 
--     o.OrderID,
--     o.CustomerName,
--     o.Total,
--     o.Status,
--     p.Name AS ProductName,
--     oi.Quantity,
--     oi.PriceAtOrder
-- FROM Orders o
-- JOIN OrderItems oi ON o.OrderID = oi.OrderID
-- JOIN Products p ON oi.ProductID = p.ProductID
-- ORDER BY o.OrderID;

-- View daily sales
-- SELECT * FROM daily_sales;

-- View popular items
-- SELECT * FROM popular_items;

-- View monthly expenses
-- SELECT * FROM monthly_expenses;