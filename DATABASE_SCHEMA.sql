-- MySQL Database Schema for Craftuary Themes

CREATE DATABASE IF NOT EXISTS craftuary_db;
USE craftuary_db;

CREATE TABLE IF NOT EXISTS themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  technology VARCHAR(100) NOT NULL,
  thumbnail VARCHAR(500) NOT NULL,
  preview_url VARCHAR(500) NOT NULL,
  download_url VARCHAR(500) NOT NULL,
  deploy_url VARCHAR(500) NOT NULL,
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_technology (technology),
  INDEX idx_is_free (is_free)
);

-- Sample data for testing
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free) VALUES
('Modern Business', 'A sleek and professional business website template with modern design elements and smooth animations.', 'Business', 'React', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'https://example.com/preview/modern-business', 'https://example.com/download/modern-business', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/modern-business', true),

('Tech Blog', 'Beautiful blog template optimized for technical content with syntax highlighting and dark mode.', 'Blog', 'Next.js', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop', 'https://example.com/preview/tech-blog', 'https://example.com/download/tech-blog', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/tech-blog', true),

('Portfolio Pro', 'Showcase your work beautifully with this stunning portfolio template featuring smooth scrolling.', 'Portfolio', 'Vue', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop', 'https://example.com/preview/portfolio-pro', 'https://example.com/download/portfolio-pro', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/portfolio-pro', true),

('eShop Plus', 'Complete eCommerce solution with shopping cart, product pages, and checkout flow.', 'eCommerce', 'React', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop', 'https://example.com/preview/eshop-plus', 'https://example.com/download/eshop-plus', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/eshop-plus', false),

('Agency Landing', 'High-converting landing page template perfect for creative agencies and studios.', 'Agency', 'HTML', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop', 'https://example.com/preview/agency-landing', 'https://example.com/download/agency-landing', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/agency-landing', true),

('EduLearn', 'Educational platform template with course listings, student dashboard, and progress tracking.', 'Education', 'Svelte', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop', 'https://example.com/preview/edulearn', 'https://example.com/download/edulearn', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/edulearn', true),

('SaaS Starter', 'Full-featured SaaS template with authentication, billing, and admin dashboard.', 'SaaS', 'Next.js', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'https://example.com/preview/saas-starter', 'https://example.com/download/saas-starter', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/saas-starter', false),

('LaunchPad', 'Minimalist landing page template optimized for product launches and pre-launch campaigns.', 'Landing Page', 'Astro', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', 'https://example.com/preview/launchpad', 'https://example.com/download/launchpad', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/launchpad', true),

('DashBoard Pro', 'Professional admin dashboard with charts, tables, and data visualization components.', 'Dashboard', 'React', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'https://example.com/preview/dashboard-pro', 'https://example.com/download/dashboard-pro', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/dashboard-pro', false);
