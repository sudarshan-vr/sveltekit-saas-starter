-- MySQL Database Schema Update for Multi-Category Support
-- Adds support for themes to belong to multiple categories

USE u190097430_fapp;

-- Add a new column for storing multiple categories as JSON
ALTER TABLE themes 
ADD COLUMN categories JSON DEFAULT NULL COMMENT 'Array of categories: ["Business", "Agency", "Portfolio"]';

-- Migrate existing single category to categories array
UPDATE themes 
SET categories = JSON_ARRAY(category)
WHERE categories IS NULL AND category IS NOT NULL;

-- Keep the old category column for backward compatibility (optional)
-- You can remove it later with: ALTER TABLE themes DROP COLUMN category;

-- Create index for better performance on JSON searches
-- Note: MySQL 5.7+ supports JSON, but indexing is limited
-- For better performance, consider using generated columns

-- Add a generated column for easier filtering (MySQL 5.7.8+)
ALTER TABLE themes
ADD COLUMN category_list VARCHAR(500) AS (JSON_UNQUOTE(JSON_EXTRACT(categories, '$'))) STORED;

CREATE INDEX idx_categories ON themes(category_list(255));

-- Example queries after migration:
-- 
-- Find themes in "Business" category:
-- SELECT * FROM themes WHERE JSON_CONTAINS(categories, '"Business"');
-- 
-- Find themes in multiple categories:
-- SELECT * FROM themes WHERE JSON_CONTAINS(categories, '"Business"') OR JSON_CONTAINS(categories, '"Agency"');
--
-- Get all themes with their categories:
-- SELECT id, name, categories FROM themes;
