-- Run this in your Hostinger phpMyAdmin
-- No need to create database, use your existing one

-- Create themes table
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

-- Insert sample themes (customize these with your actual themes)
INSERT INTO themes (name, description, category, technology, thumbnail, preview_url, download_url, deploy_url, is_free) VALUES
('Modern Business Pro', 'A sleek and professional business website template with modern design elements, smooth animations, and responsive layout perfect for startups and enterprises.', 'Business', 'React', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'https://preview.craftuary.com/modern-business', 'https://github.com/craftuary/modern-business/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/modern-business', true),

('Tech Blog Minimalist', 'Beautiful minimalist blog template optimized for technical content with syntax highlighting, dark mode support, and lightning-fast performance.', 'Blog', 'Next.js', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop', 'https://preview.craftuary.com/tech-blog', 'https://github.com/craftuary/tech-blog/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/tech-blog', true),

('Portfolio Pro', 'Showcase your creative work beautifully with this stunning portfolio template featuring smooth scrolling, image galleries, and modern animations.', 'Portfolio', 'Vue', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop', 'https://preview.craftuary.com/portfolio-pro', 'https://github.com/craftuary/portfolio-pro/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/portfolio-pro', true),

('eShop Commerce', 'Complete eCommerce solution with shopping cart, product pages, checkout flow, and payment integration. Perfect for online stores.', 'eCommerce', 'React', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop', 'https://preview.craftuary.com/eshop', 'https://github.com/craftuary/eshop/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/eshop', false),

('Agency Landing', 'High-converting landing page template perfect for creative agencies, studios, and marketing teams. Includes testimonials and case studies.', 'Agency', 'HTML', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop', 'https://preview.craftuary.com/agency-landing', 'https://github.com/craftuary/agency-landing/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/agency-landing', true),

('EduLearn Platform', 'Educational platform template with course listings, student dashboard, progress tracking, and quiz functionality for online learning.', 'Education', 'Svelte', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop', 'https://preview.craftuary.com/edulearn', 'https://github.com/craftuary/edulearn/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/edulearn', true),

('SaaS Starter Kit', 'Full-featured SaaS template with authentication, billing integration, user dashboard, and admin panel. Production-ready.', 'SaaS', 'Next.js', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'https://preview.craftuary.com/saas-starter', 'https://github.com/craftuary/saas-starter/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/saas-starter', false),

('LaunchPad Minimal', 'Minimalist landing page template optimized for product launches and pre-launch campaigns. Email capture and countdown timer included.', 'Landing Page', 'Astro', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', 'https://preview.craftuary.com/launchpad', 'https://github.com/craftuary/launchpad/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/launchpad', true),

('Dashboard Analytics', 'Professional admin dashboard with charts, tables, data visualization components, and real-time analytics. Fully customizable.', 'Dashboard', 'React', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'https://preview.craftuary.com/dashboard', 'https://github.com/craftuary/dashboard/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/dashboard', false),

('Restaurant Menu', 'Beautiful restaurant website with menu showcase, online ordering, reservations, and gallery. Mobile-friendly and fast.', 'Business', 'WordPress', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', 'https://preview.craftuary.com/restaurant', 'https://github.com/craftuary/restaurant/archive/refs/heads/main.zip', 'https://vercel.com/new/clone?repository-url=https://github.com/craftuary/restaurant', true);
