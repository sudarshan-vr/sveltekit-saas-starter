<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
    WebsiteKeywords,
    WebsiteAuthor,
    WebsiteTwitterHandle,
    WebsiteOgImage,
  } from "../../config"

  interface Props {
    title?: string
    description?: string
    keywords?: string
    image?: string
    url?: string
    type?: string
    author?: string
    publishedTime?: string
    modifiedTime?: string
    noindex?: boolean
  }

  let {
    title = WebsiteName,
    description = WebsiteDescription,
    keywords = WebsiteKeywords,
    image = WebsiteOgImage,
    url = WebsiteBaseUrl,
    type = "website",
    author = WebsiteAuthor,
    publishedTime,
    modifiedTime,
    noindex = false,
  }: Props = $props()

  const fullTitle = title === WebsiteName ? title : `${title} | ${WebsiteName}`
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle} />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}

  <!-- Canonical URL -->
  <link rel="canonical" href={url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:site_name" content={WebsiteName} />
  
  {#if publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}
  {#if modifiedTime}
    <meta property="article:modified_time" content={modifiedTime} />
  {/if}
  {#if type === "article"}
    <meta property="article:author" content={author} />
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={fullTitle} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={image} />
  {#if WebsiteTwitterHandle}
    <meta property="twitter:site" content={WebsiteTwitterHandle} />
    <meta property="twitter:creator" content={WebsiteTwitterHandle} />
  {/if}
</svelte:head>
