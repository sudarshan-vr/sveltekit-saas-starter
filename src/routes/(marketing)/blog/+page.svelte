<script lang="ts">
  import { sortedBlogPosts, blogInfo } from "./posts"
  import { WebsiteBaseUrl } from "./../../../config"
  import SEO from "$lib/components/SEO.svelte"
</script>

<SEO 
  title="Blog - Web Development Guides & Tutorials | Craftuary"
  description="Learn from expert blogs on Green Tech, DIY website tips, Internet trends, web development, and more. Stay updated with guides, tutorials, and insights to build better websites."
  image="https://www.craftuary.com/images/logo.svg"
  url="{WebsiteBaseUrl}/blog"
  type="website"
  keywords="web development blog, DIY website tips, Green Tech, Internet trends, website tutorials, web design guides, development articles, tech blog"
/>

<div class="py-8 lg:py-12 px-6 max-w-lg mx-auto">
  <div
    class="text-3xl lg:text-5xl font-medium text-primary flex gap-3 items-baseline text-center place-content-center"
  >
    <div
      class="text-center leading-relaxed font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent"
    >
      {blogInfo.name}
    </div>
    <a href="/blog/rss.xml" target="_blank" rel="noreferrer">
      <img
        class="flex-none w-5 h-5 object-contain"
        src="/images/rss.svg"
        alt="rss feed"
      />
    </a>
  </div>
  <div class="text-lg text-center">A demo blog with sample content.</div>

  {#each sortedBlogPosts as post}
    <a href={post.link}>
      <div class="card my-6 bg-white shadow-xl flex-row overflow-hidden">
        <div class="flex-none w-6 md:w-32 bg-secondary"></div>
        <div class="py-6 px-6">
          <div class="text-xl">{post.title}</div>
          <div class="text-sm text-accent">
            {post.parsedDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div class="text-slate-500">{post.description}</div>
        </div>
      </div>
    </a>
  {/each}
</div>
