<script lang="ts">
  import { page } from "$app/stores"
  import { error } from "@sveltejs/kit"
  import { sortedBlogPosts, type BlogPost } from "./../posts"
  import { WebsiteName, WebsiteBaseUrl } from "../../../../config"
  import SEO from "$lib/components/SEO.svelte"
  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()

  function getCurrentPost(url: string): BlogPost {
    let searchPost: BlogPost | null = null
    for (const post of sortedBlogPosts) {
      if (url == post.link || url == post.link + "/") {
        searchPost = post
        continue
      }
    }
    if (!searchPost) {
      error(404, "Blog post not found")
    }
    return searchPost
  }
  let currentPost = $derived(getCurrentPost($page.url.pathname))

  function buildLdJson(post: BlogPost) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.parsedDate?.toISOString(),
      dateModified: post.parsedDate?.toISOString(),
    }
  }
  let jsonldScript = $derived(
    `<script type="application/ld+json">${
      JSON.stringify(buildLdJson(currentPost)) + "<"
    }/script>`,
  )

  let pageUrl = $derived($page.url.origin + $page.url.pathname)
</script>

<SEO 
  title={currentPost.title}
  description={currentPost.description}
  url={pageUrl}
  type="article"
  keywords={currentPost.title}
  publishedTime={currentPost.parsedDate?.toISOString()}
  modifiedTime={currentPost.parsedDate?.toISOString()}
/>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<article class="prose mx-auto py-12 px-6 font-sans">
  <div class="text-sm text-accent">
    {currentPost.parsedDate?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
  </div>
  <h1>{currentPost.title}</h1>
  {@render children?.()}
</article>
