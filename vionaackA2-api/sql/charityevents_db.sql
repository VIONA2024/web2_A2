-- Drop & create database
DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE charityevents_db;

-- Organisations
CREATE TABLE organisations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  address TEXT,
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  full_description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255) NOT NULL,
  city VARCHAR(120) NOT NULL,
  address TEXT,
  category_id INT,
  organisation_id INT,
  ticket_price DECIMAL(10,2) DEFAULT 0.00,
  goal_amount DECIMAL(12,2) DEFAULT 0.00,
  progress_amount DECIMAL(12,2) DEFAULT 0.00,
  image_url VARCHAR(500),
  suspended TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT fk_org FOREIGN KEY (organisation_id) REFERENCES organisations(id)
);

-- Seed data
INSERT INTO organisations (name, description, contact_email, contact_phone, address, website) VALUES
('City Care Foundation', 'Supporting community welfare programs across the city.', 'contact@citycare.org', '555-1001', '123 Main St, Downtown', 'https://citycare.example'),
('Green Future Trust', 'Environmental protection and urban greening initiatives.', 'hello@greenfuture.org', '555-2002', '500 Park Ave, Riverside', 'https://greenfuture.example');

INSERT INTO categories (name, description) VALUES
('Fun Run', 'Charity fun runs and walks'),
('Gala', 'Formal dinners and gala events'),
('Auction', 'Silent/online auctions for charity'),
('Concert', 'Benefit concerts and performances');

-- Today for reference
-- SELECT CURDATE();

INSERT INTO events (name, description, full_description, event_date, event_time, location, city, address, category_id, organisation_id, ticket_price, goal_amount, progress_amount, image_url, suspended) VALUES
('Riverfront 5K Fun Run', 'Join our 5K along the river!', 'A family-friendly 5K with water stations and medals. Strollers welcome.', DATE_ADD(CURDATE(), INTERVAL 7 DAY), '08:30:00', 'Riverside Park', 'Springfield', '1 River Rd, Springfield', 1, 1, 20.00, 10000.00, 2500.00, 'https://picsum.photos/seed/run/800/500', 0),
('Autumn Charity Gala', 'Black-tie dinner to support shelters.', 'Cocktails, three-course meal, keynote speakers, and live band.', DATE_ADD(CURDATE(), INTERVAL 21 DAY), '18:30:00', 'Grand Ballroom', 'Springfield', '99 Center St, Springfield', 2, 1, 150.00, 50000.00, 18000.00, 'https://picsum.photos/seed/gala/800/500', 0),
('Art & Antiques Silent Auction', 'Bid on donated art and antiques.', 'Preview from 4pm, silent bidding closes at 7pm sharp.', DATE_ADD(CURDATE(), INTERVAL 14 DAY), '16:00:00', 'Heritage Hall', 'Riverside', '12 Old Town Ln, Riverside', 3, 1, 0.00, 20000.00, 3500.00, 'https://picsum.photos/seed/auction/800/500', 0),
('Green Beats Benefit Concert', 'Live music to plant trees.', 'Local bands unite to raise funds for urban tree planting.', DATE_ADD(CURDATE(), INTERVAL 28 DAY), '19:00:00', 'City Amphitheatre', 'Springfield', '300 Music Ave, Springfield', 4, 2, 35.00, 30000.00, 7200.00, 'https://picsum.photos/seed/concert/800/500', 0),
('Winter Warmth Drive', 'Coat and blanket collection.', 'Bring gently used coats/blankets; on-site soup station.', DATE_ADD(CURDATE(), INTERVAL -10 DAY), '10:00:00', 'Community Center', 'Hillview', '5 Hope St, Hillview', 1, 1, 0.00, 5000.00, 4800.00, 'https://picsum.photos/seed/winter/800/500', 0),
('Harbor Lights Gala', 'Seaside formal evening.', 'Dinner, auction, and fireworks finale by the harbor.', DATE_ADD(CURDATE(), INTERVAL 45 DAY), '18:00:00', 'Harbor Pavilion', 'Bayview', '77 Marina Blvd, Bayview', 2, 2, 180.00, 60000.00, 15500.00, 'https://picsum.photos/seed/harbor/800/500', 0),
('Vintage Vinyl Auction', 'Rare records up for grabs.', 'From jazz classics to rock legends—proceeds to music education.', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '17:00:00', 'Soundscape HQ', 'Springfield', '44 Groove St, Springfield', 3, 2, 5.00, 12000.00, 2200.00, 'https://picsum.photos/seed/vinyl/800/500', 0),
('Sunset Acoustic Concert', 'Chill acoustic sets at dusk.', 'Bring a picnic blanket; support urban gardens.', DATE_ADD(CURDATE(), INTERVAL 60 DAY), '18:30:00', 'Lakeside Green', 'Riverside', '2 Lakeview Dr, Riverside', 4, 2, 15.00, 15000.00, 1200.00, 'https://picsum.photos/seed/acoustic/800/500', 0),
('Policy-Violating Test Event', 'Should not appear on home/search.', 'Flagged for policy violation; suspended=1.', DATE_ADD(CURDATE(), INTERVAL 10 DAY), '12:00:00', 'Unknown', 'Nowhere', 'Hidden', 1, 1, 0.00, 0.00, 0.00, 'https://picsum.photos/seed/suspended/800/500', 1);
