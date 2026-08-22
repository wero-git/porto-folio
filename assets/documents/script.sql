-- 1. Table Creation with Strict Business Constraints

CREATE TABLE Claim_Management (

claim_id INT PRIMARY KEY AUTO_INCREMENT,

customer_name VARCHAR(100) NOT NULL,

product_name VARCHAR(100) NOT NULL,

product_price DECIMAL(10,2) NOT NULL,

claim_date DATE NOT NULL,

process_status ENUM('Pending_Return', 'Received', 'Aborted', 'Legal_Dispute') DEFAULT 'Pending_Return',

product_condition ENUM('Good', 'Damaged', 'Very_Damaged', 'Not_Received') DEFAULT 'Not_Received',

issue_source ENUM('Production', 'Customer', 'Unknown') DEFAULT 'Unknown',

refund_percentage INT DEFAULT 0,

refund_amount DECIMAL(10,2) DEFAULT 0.00

);

-- 2. Mock Data Insertion (2026 Audit Dataset)

INSERT INTO Claim_Management (customer_name, product_name, product_price, claim_date, process_status, product_condition, issue_source)

VALUES

('Alice Johnson', 'HP PC AMD RYZEN 2025', 1200.00, '2026-05-01', 'Received', 'Very_Damaged', 'Customer'),

('Bob Smith', 'Google 10 Pixel Phone', 800.00, '2026-05-05', 'Received', 'Good', 'Customer'),

('Charlie Davis', 'Lenovo Tab M12', 500.00, '2026-05-08', 'Received', 'Damaged', 'Customer'),

('Hans Mustermann', 'Iphone 13', 1200.00, '2026-05-04', 'Received', 'Damaged', 'Production'),

('David Wilson', 'Google Pixel 8 Phone', 300.00, '2026-04-01', 'Pending_Return', 'Not_Received', 'Unknown');

-- 3. Corrected Multi-Tiered Matrix Logic Execution

UPDATE Claim_Management

SET refund_percentage = CASE

WHEN issue_source = 'Customer' AND product_condition = 'Good' THEN 100

WHEN issue_source = 'Production' AND product_condition = 'Damaged' THEN 100

WHEN issue_source = 'Customer' AND product_condition = 'Damaged' THEN 85

WHEN issue_source = 'Customer' AND product_condition = 'Very_Damaged' THEN 70

ELSE 0

END

WHERE process_status = 'Received';

-- 4. Financial Calculations Layer

UPDATE Claim_Management

SET refund_amount = (product_price * refund_percentage / 100)

WHERE process_status = 'Received';

-- 5. Final Granular Audit View Output

SELECT claim_id, customer_name, product_name,

CONCAT(product_price, ' €') AS unit_price, issue_source, product_condition,

CONCAT(refund_percentage, '%') AS rate,

CONCAT(refund_amount, ' €') AS total_refunded, process_status

FROM Claim_Management;