# SEO Implementation Guide

This document outlines all the SEO features implemented in your Craftuary website and how to customize them.

## 📋 What's Been Implemented

### 1. **Global SEO Configuration** (`src/config.ts`)
All SEO settings are centralized in the config file:
- `WebsiteName`: Your site name
- `WebsiteBaseUrl`: Your production URL (update to your actual domain)
- `WebsiteDescription`: Site-wide description
- `WebsiteKeywords`: Main keywords for your site
- `WebsiteAuthor`: Your name/company
- `WebsiteTwitterHandle`: Your Twitter handle (e.g., @craftuary)
- `WebsiteOgImage`: Path to your Open Graph image (1200x630px recommended)

**Action Required:** Update these values in `src/config.ts` to match your brand.

### 2. **Reusable SEO Component** (`src/lib/components/SEO.svelte`)
A powerful component that handles:
- ✅ Title tags
- ✅ Meta descriptions
- ✅ Keywords
- ✅ Canonical URLs
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ Article metadata (for blog posts)
- ✅ Robots directives

**Usage Example:**
```svelte
<SEO 
  title="Your Page Title"
  description="Page description for search engines"
  url="{WebsiteBaseUrl}/your-page"
  type="website"
  keywords="keyword1, keyword2, keyword3"
/>
```

### 3. **Page-Specific SEO**

#### **Homepage** (`src/routes/(marketing)/+page.svelte`)
- Title: Site name
- Description: Main site description
- Type: website
- Structured data: WebSite schema with SearchAction

#### **Pricing Page** (`src/routes/(marketing)/pricing/+page.svelte`)
- Title: "Pricing | Craftuary"
- Custom description about pricing plans
- Relevant keywords
- Type: website

#### **Blog Index** (`src/routes/(marketing)/blog/+page.svelte`)
- Title: Blog name
- Description: About your blog content
- Type: website

#### **Blog Posts** (`src/routes/(marketing)/blog/(posts)/+layout.svelte`)
- Title: Article title
- Description: Article description
- Type: article
- Published/Modified dates
- Author information
- BlogPosting structured data

### 4. **Sitemap** (`src/routes/sitemap.xml/+server.ts`)
Automatically generates XML sitemap with:
- ✅ Homepage (priority: 1.0, daily updates)
- ✅ Pricing page (priority: 0.8, weekly updates)
- ✅ Blog index (priority: 0.9, daily updates)
- ✅ All blog posts (priority: 0.7, monthly updates)

**Access:** `https://yoursite.com/sitemap.xml`

### 5. **robots.txt** (`static/robots.txt`)
Configured to:
- Allow all crawlers
- Disallow /api/ and /.svelte-kit/
- Reference sitemap location
- Set crawl-delay

**Action Required:** Update the sitemap URL in `static/robots.txt` to match your domain.

### 6. **Enhanced HTML Head** (`src/app.html`)
Added global meta tags:
- Theme color
- Apple touch icon
- Viewport settings
- Format detection

## 🎯 SEO Checklist & Next Steps

### Required Actions:
- [ ] **Update `src/config.ts`** with your actual domain, social handles, and branding
- [ ] **Create Open Graph image** (1200x630px) and save to `static/images/og-image.png`
- [ ] **Update `static/robots.txt`** sitemap URL to your actual domain
- [ ] **Verify sitemap** works: Visit `yoursite.com/sitemap.xml` after deployment
- [ ] **Add Google Analytics** or tracking code (optional)
- [ ] **Set up Google Search Console** and submit your sitemap
- [ ] **Test meta tags** using:
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Recommended Enhancements:
- [ ] Add schema.org Organization markup for your company
- [ ] Create FAQ structured data for common questions
- [ ] Add breadcrumb schema for better navigation
- [ ] Set up 404 page with proper meta tags
- [ ] Add `rel="noopener noreferrer"` to external links (security)
- [ ] Optimize images with alt text and WebP format
- [ ] Add internal linking between blog posts
- [ ] Create pillar content and topic clusters

## 📊 How to Add SEO to New Pages

When creating a new page, import and use the SEO component:

```svelte
<script lang="ts">
  import { WebsiteBaseUrl } from "../../config"
  import SEO from "$lib/components/SEO.svelte"
</script>

<SEO 
  title="Your Page Title"
  description="A compelling description (150-160 characters)"
  url="{WebsiteBaseUrl}/your-page-url"
  type="website"
  keywords="relevant, keywords, here"
/>

<!-- Your page content -->
```

## 🔍 Testing Your SEO

### 1. **Local Testing**
```bash
npm run build
npm run preview
```
Visit the preview URL and:
- Check `<head>` in browser DevTools
- Test `/sitemap.xml`
- Verify meta tags appear

### 2. **Production Testing**
After deployment:
1. **Google Search Console**: Submit sitemap and check indexing
2. **PageSpeed Insights**: Test performance (affects SEO)
3. **Mobile-Friendly Test**: Ensure mobile compatibility
4. **Structured Data Testing Tool**: Validate JSON-LD markup

## 🎨 Customizing Meta Tags

### Per-Page Customization
Each page can override defaults:

```svelte
<SEO 
  title="Custom Title"
  description="Custom description"
  keywords="custom, keywords"
  image="{WebsiteBaseUrl}/images/custom-og-image.png"
  noindex={false}  <!-- Set true to prevent indexing -->
/>
```

### Adding New Pages to Sitemap
Edit `src/routes/sitemap.xml/+server.ts`:

```typescript
const pages: SitemapPage[] = [
  // ... existing pages
  {
    url: "/your-new-page",
    changefreq: "weekly",
    priority: 0.7,
  },
]
```

## 📈 SEO Best Practices

1. **Titles**: 50-60 characters, include primary keyword
2. **Descriptions**: 150-160 characters, compelling call-to-action
3. **URLs**: Use clean, descriptive URLs with hyphens
4. **Headings**: Use H1-H6 hierarchy properly
5. **Images**: Always include alt text
6. **Internal Links**: Link related content together
7. **Mobile**: Ensure responsive design
8. **Speed**: Optimize images and minimize JavaScript
9. **Content**: Write for humans first, search engines second
10. **Updates**: Keep content fresh and relevant

## 🚀 Advanced SEO Features

### Adding Blog Post Schema
The blog post layout already includes BlogPosting schema. To enhance it:

```typescript
const ldJson = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  datePublished: post.parsedDate?.toISOString(),
  dateModified: post.parsedDate?.toISOString(),
  author: {
    "@type": "Person",
    name: "Your Name"
  },
  publisher: {
    "@type": "Organization",
    name: "Craftuary",
    logo: {
      "@type": "ImageObject",
      url: `${WebsiteBaseUrl}/images/logo.png`
    }
  },
  image: `${WebsiteBaseUrl}/images/blog-image.png`,
  description: post.description
}
```

### Adding FAQ Schema
For FAQ sections:

```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Question here?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Answer here"
    }
  }]
}
```

## 📝 Summary

Your website now has:
- ✅ Complete meta tag coverage (title, description, OG, Twitter)
- ✅ Reusable SEO component for easy page optimization
- ✅ Automatic sitemap generation
- ✅ Proper robots.txt configuration
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Canonical URLs to prevent duplicate content
- ✅ Mobile and social media optimization

**Next:** Update the config values and create your OG image to complete the setup!
