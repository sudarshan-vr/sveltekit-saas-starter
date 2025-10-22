<script lang="ts">
  import { onMount } from 'svelte'
  import { WebsiteBaseUrl } from '../../../config'
  import SEO from '$lib/components/SEO.svelte'
  import type { Theme } from '$lib/types/theme'
  import { technologies, categories } from '$lib/types/theme'

  let themes: Theme[] = []
  let filteredThemes: Theme[] = []
  let loading = true
  
  // Filter states
  let selectedTechnology = 'All'
  let selectedCategories: string[] = [] // Changed to array for multi-select
  let searchQuery = ''
  let showFreeOnly = false

  // Fetch themes from API
  async function fetchThemes() {
    loading = true
    try {
      const params = new URLSearchParams()
      if (selectedTechnology !== 'All') params.append('technology', selectedTechnology)
      // Append multiple categories
      if (selectedCategories.length > 0) {
        selectedCategories.forEach(cat => params.append('categories', cat))
      }
      if (searchQuery) params.append('search', searchQuery)
      if (showFreeOnly) params.append('is_free', 'true')

      const response = await fetch(`/api/themes?${params.toString()}`)
      const data = await response.json()
      themes = data
      filteredThemes = data
    } catch (error) {
      console.error('Error fetching themes:', error)
      themes = []
      filteredThemes = []
    } finally {
      loading = false
    }
  }

  // Debounced search
  let searchTimeout: NodeJS.Timeout
  function handleSearch() {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      fetchThemes()
    }, 300)
  }

  // Filter handlers
  function handleTechnologyChange() {
    fetchThemes()
  }

  function handleCategoryChange() {
    fetchThemes()
  }

  function handleFreeToggle() {
    fetchThemes()
  }

  // Track theme action
  async function trackAction(themeId: number, actionType: string) {
    try {
      await fetch('/api/themes/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, actionType })
      })
    } catch (err) {
      console.error('Tracking failed:', err)
    }
  }

  function handlePreview(theme: Theme) {
    trackAction(theme.id, 'preview')
  }

  function handleDownload(theme: Theme) {
    trackAction(theme.id, 'download')
  }

  function handleDeploy(theme: Theme) {
    trackAction(theme.id, 'deploy')
  }

  onMount(() => {
    fetchThemes()
  })
</script>

<SEO 
  title="Free Website Themes & Templates - 2025 Best Downloads | Craftuary"
  description="Browse thousands of free and premium website templates. React, Vue, Svelte, WordPress themes ready to deploy. Download, customize, and launch your website in minutes."
  image="https://www.craftuary.com/images/logo.svg"
  url="{WebsiteBaseUrl}/themes"
  type="website"
  keywords="free website themes, website templates, React templates, WordPress themes, SaaS templates, landing page templates, CMS templates, premium themes, responsive templates"
/>

<div class="min-h-screen pb-16 pt-8 px-4 bg-gradient-to-b from-base-100 to-base-200">
  <!-- Header -->
  <div class="max-w-7xl mx-auto text-center mb-12">
    <h1 class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent pb-2">
      Premium Website Themes
    </h1>
    <p class="text-xl text-base-content/70 mt-4 max-w-2xl mx-auto">
      Beautiful, modern templates to kickstart your next project. Deploy in minutes.
    </p>
  </div>

  <!-- Filters Section -->
  <div class="max-w-7xl mx-auto mb-8">
    <div class="bg-base-100 rounded-2xl shadow-xl p-6 border border-primary/10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <label for="search-input" class="label">
            <span class="label-text font-semibold">Search</span>
          </label>
          <input 
            id="search-input"
            type="text" 
            placeholder="Search themes..." 
            class="input input-bordered w-full input-primary"
            bind:value={searchQuery}
            on:input={handleSearch}
            aria-label="Search themes"
          />
        </div>

        <!-- Technology Filter -->
        <div>
          <label for="technology-select" class="label">
            <span class="label-text font-semibold">Technology</span>
          </label>
          <select 
            id="technology-select"
            class="select select-bordered w-full select-primary"
            bind:value={selectedTechnology}
            on:change={handleTechnologyChange}
            aria-label="Filter by technology"
          >
            {#each technologies as tech}
              <option value={tech}>{tech}</option>
            {/each}
          </select>
        </div>

        <!-- Category Filter (Multi-select) -->
        <div>
          <label class="label">
            <span class="label-text font-semibold">Industries (Multi-select)</span>
          </label>
          <div class="dropdown dropdown-end w-full">
            <label tabindex="0" class="btn btn-outline w-full justify-between">
              <span class="truncate">
                {#if selectedCategories.length === 0}
                  All Industries
                {:else if selectedCategories.length === 1}
                  {selectedCategories[0]}
                {:else}
                  {selectedCategories.length} selected
                {/if}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </label>
            <div tabindex="0" class="dropdown-content z-[1] p-4 shadow bg-base-100 rounded-box w-64 border border-base-300 mt-1">
              <div class="space-y-2">
                {#each categories.filter(c => c !== 'All') as cat}
                  <label class="label cursor-pointer justify-start gap-2 py-1">
                    <input 
                      type="checkbox" 
                      class="checkbox checkbox-sm checkbox-primary"
                      checked={selectedCategories.includes(cat)}
                      on:change={(e) => {
                        if (e.currentTarget.checked) {
                          selectedCategories = [...selectedCategories, cat]
                        } else {
                          selectedCategories = selectedCategories.filter(c => c !== cat)
                        }
                        handleCategoryChange()
                      }}
                    />
                    <span class="label-text">{cat}</span>
                  </label>
                {/each}
              </div>
              {#if selectedCategories.length > 0}
                <button 
                  class="btn btn-sm btn-ghost w-full mt-2"
                  on:click={() => {
                    selectedCategories = []
                    handleCategoryChange()
                  }}
                >
                  Clear All
                </button>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Free Only Toggle -->
      <div class="mt-4 flex items-center gap-2">
        <input 
          id="free-only-toggle"
          type="checkbox" 
          class="checkbox checkbox-primary" 
          bind:checked={showFreeOnly}
          on:change={handleFreeToggle}
        />
        <label for="free-only-toggle" class="label-text font-semibold cursor-pointer">
          Show Free Themes Only
        </label>
      </div>
    </div>
  </div>

  <!-- Themes Grid -->
  <div class="max-w-7xl mx-auto">
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
    {:else if filteredThemes.length === 0}
      <div class="text-center py-20">
        <div class="text-6xl mb-4">🎨</div>
        <h3 class="text-2xl font-bold mb-2">No themes found</h3>
        <p class="text-base-content/70">Try adjusting your filters or search query</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredThemes as theme (theme.id)}
          <div 
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary/10 overflow-hidden group"
          >
            <!-- Theme Thumbnail -->
            <figure class="relative overflow-hidden h-48">
              <img 
                src={theme.thumbnail} 
                alt={theme.name}
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {#if theme.is_free}
                <div class="badge badge-success badge-lg absolute top-4 right-4">
                  Free
                </div>
              {:else}
                <div class="badge badge-secondary badge-lg absolute top-4 right-4">
                  Premium
                </div>
              {/if}
            </figure>

            <!-- Card Body -->
            <div class="card-body p-6">
              <h2 class="card-title text-xl font-bold">
                {theme.name}
              </h2>
              
              <p class="text-sm text-base-content/70 line-clamp-2 mb-4">
                {theme.description}
              </p>

              <!-- Tags -->
              <div class="flex gap-2 mb-4">
                <div class="badge badge-outline badge-primary">
                  {theme.technology}
                </div>
                <div class="badge badge-outline badge-accent">
                  {theme.category}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="card-actions flex-col gap-2">
                <a 
                  href={theme.preview_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-outline btn-primary btn-sm w-full"
                  on:click={() => handlePreview(theme)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </a>
                
                <a 
                  href={theme.deploy_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-sm w-full"
                  on:click={() => handleDeploy(theme)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Deploy Now
                </a>
                
                <a 
                  href={theme.download_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-outline btn-accent btn-sm w-full"
                  on:click={() => handleDownload(theme)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {theme.is_free ? 'Free Download' : 'Get Premium'}
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Footer Message -->
  <div class="max-w-7xl mx-auto text-center mt-16">
    <div class="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
      <h3 class="text-2xl font-bold mb-2">More themes coming soon! 🚀</h3>
      <p class="text-base-content/70">
        We're constantly adding new themes. Check back regularly for updates.
      </p>
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
