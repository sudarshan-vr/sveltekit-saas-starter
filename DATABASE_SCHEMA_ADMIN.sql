-- MySQL Database Schema Update for Admin Theme Management
-- Add metrics tracking fields to themes table

USE u190097430_fapp;

-- Add new columns for metrics tracking
ALTER TABLE themes
ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS downloads INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS views INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS stock_quantity INT DEFAULT NULL COMMENT 'NULL means unlimited',
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status ENUM('active', 'draft', 'archived') DEFAULT 'active';

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_featured ON themes(featured);
CREATE INDEX IF NOT EXISTS idx_status ON themes(status);
CREATE INDEX IF NOT EXISTS idx_price ON themes(price);

-- Update existing records to have default values
UPDATE themes SET price = 0.00 WHERE price IS NULL AND is_free = true;
UPDATE themes SET price = 29.99 WHERE price IS NULL AND is_free = false;
UPDATE themes SET downloads = 0 WHERE downloads IS NULL;
UPDATE themes SET views = 0 WHERE views IS NULL;
UPDATE themes SET status = 'active' WHERE status IS NULL;

-- Create a table for tracking theme analytics
CREATE TABLE IF NOT EXISTS theme_analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  theme_id INT NOT NULL,
  action_type ENUM('view', 'download', 'preview', 'deploy') NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE,
  INDEX idx_theme_id (theme_id),
  INDEX idx_action_type (action_type),
  INDEX idx_created_at (created_at)
);
