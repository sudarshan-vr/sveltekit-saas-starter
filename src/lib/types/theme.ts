export interface Theme {
  id: number
  name: string
  description: string
  category: string
  technology: string
  thumbnail: string
  preview_url: string
  download_url: string
  deploy_url: string
  is_free: boolean
  created_at?: string
}

export const technologies = [
  "All",
  "HTML",
  "React",
  "Vue",
  "Svelte",
  "WordPress",
  "Next.js",
  "Nuxt",
  "Astro",
] as const

export const categories = [
  "All",
  "Business",
  "Blog",
  "Portfolio",
  "eCommerce",
  "Agency",
  "Education",
  "SaaS",
  "Landing Page",
  "Dashboard",
] as const
