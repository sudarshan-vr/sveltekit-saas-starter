<script lang="ts">
  import type { Theme } from '$lib/types/theme'
  import { technologies, categories } from '$lib/types/theme'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  let themes: Theme[] = []
  let filteredThemes: Theme[] = []
  let loading = true
  let error = ''
  let successMessage = ''
  
  // Statistics
  let totalDownloads = 0
  let totalViews = 0
  let totalThemes = 0
  
  // Filters and sorting
  let statusFilter = 'all'
  let searchQuery = ''
  let sortBy = 'created_at'
  let sortOrder = 'DESC'
  
  // Modal state
  let showModal = false
  let modalMode: 'add' | 'edit' = 'add'
  let currentTheme: Partial<Theme> = {}
  
  // Delete confirmation
  let showDeleteConfirm = false
  let themeToDelete: Theme | null = null

  // Initialize form
  function initializeForm() {
    currentTheme = {
      name: '',
      description: '',
      category: 'Business',
      categories: ['Business'],
      technology: 'React',
      thumbnail: '',
      preview_url: '',
      download_url: '',
      deploy_url: '',
      is_free: true,
      price: 0,
      stock_quantity: null,
      featured: false,
      status: 'active'
    }
  }

  onMount(async () => {
    console.log('Component mounted, starting fetch...')
    await fetchThemes()
    isMounted = true // Enable reactive filters after initial load
    console.log('Mount complete')
  })

  async function fetchThemes() {
    loading = true
    error = ''
    
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        sortBy: sortBy,
        order: sortOrder
      })
      
      const response = await fetch(`/api/admin/themes?${params}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch themes')
      }
      
      const data = await response.json()
      
      console.log('API Response:', data)
      console.log('Is Array:', Array.isArray(data))
      console.log('Data length:', Array.isArray(data) ? data.length : 'N/A')
      
      // Check if response is an array or an error object
      if (Array.isArray(data)) {
        themes = data
        console.log('Themes set:', themes.length)
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        themes = []
        console.warn('Unexpected API response:', data)
      }
      
      applyFilters()
      console.log('Filtered themes:', filteredThemes.length)
      calculateStats()
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred'
      console.error('Fetch themes error:', err)
      themes = []
      filteredThemes = []
    } finally {
      console.log('Setting loading to false')
      loading = false
      console.log('Loading is now:', loading)
      // Force a small delay to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 0))
    }
  }

  async function fetchStatistics() {
    try {
      const response = await fetch('/api/themes/track')
      if (response.ok) {
        const stats = await response.json()
        totalDownloads = stats.total_downloads || 0
        totalViews = stats.total_views || 0
        totalThemes = stats.total_themes || 0
      }
    } catch (err) {
      console.error('Failed to fetch statistics:', err)
    }
  }

  function applyFilters() {
    filteredThemes = themes.filter(theme => {
      const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           theme.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }

  function calculateStats() {
    totalThemes = themes.length
    totalDownloads = themes.reduce((sum, t) => sum + (t.downloads || 0), 0)
    totalViews = themes.reduce((sum, t) => sum + (t.views || 0), 0)
  }

  function openAddModal() {
    modalMode = 'add'
    initializeForm()
    showModal = true
  }

  function openEditModal(theme: Theme) {
    modalMode = 'edit'
    currentTheme = { 
      ...theme,
      // Ensure categories is always an array
      categories: theme.categories && Array.isArray(theme.categories) 
        ? theme.categories 
        : [theme.category]
    }
    showModal = true
  }

  function closeModal() {
    showModal = false
    currentTheme = {}
  }

  async function saveTheme() {
    error = ''
    successMessage = ''
    
    try {
      const url = modalMode === 'add' 
        ? '/api/admin/themes'
        : `/api/admin/themes?id=${currentTheme.id}`
      
      const method = modalMode === 'add' ? 'POST' : 'PUT'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTheme)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save theme')
      }
      
      successMessage = `Theme ${modalMode === 'add' ? 'created' : 'updated'} successfully!`
      closeModal()
      await fetchThemes()
      
      setTimeout(() => {
        successMessage = ''
      }, 3000)
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred'
    }
  }

  function confirmDelete(theme: Theme) {
    themeToDelete = theme
    showDeleteConfirm = true
  }

  async function deleteTheme() {
    if (!themeToDelete) return
    
    try {
      const response = await fetch(`/api/admin/themes?id=${themeToDelete.id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete theme')
      }
      
      successMessage = 'Theme deleted successfully!'
      showDeleteConfirm = false
      themeToDelete = null
      await fetchThemes()
      
      setTimeout(() => {
        successMessage = ''
      }, 3000)
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred'
      showDeleteConfirm = false
    }
  }

  function cancelDelete() {
    showDeleteConfirm = false
    themeToDelete = null
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      goto('/admin/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  // Reactive statements for search (client-side filtering)
  $: {
    searchQuery
    applyFilters()
  }

  // Track if component is mounted to avoid reactive loops
  let isMounted = false
  
  // Reactive statement for server-side filters
  $: if (isMounted) {
    // Only trigger on actual filter changes, not loading state
    const _ = statusFilter + sortBy + sortOrder
    fetchThemes()
  }
</script>

<svelte:head>
  <title>Admin - Theme Management | Craftuary</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-6">
  <div class="max-w-7xl mx-auto">
    
    <!-- Header -->
    <div class="mb-8 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Theme Management Dashboard
        </h1>
        <p class="text-base-content/70 mt-2">Manage and monitor your themes</p>
      </div>
      <button class="btn btn-ghost btn-sm" on:click={handleLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>

    <!-- Success/Error Messages -->
    {#if successMessage}
      <div class="alert alert-success mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{successMessage}</span>
      </div>
    {/if}

    {#if error}
      <div class="alert alert-error mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    {/if}

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="stats shadow bg-base-100">
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="stat-title">Total Themes</div>
          <div class="stat-value text-primary">{totalThemes}</div>
          <div class="stat-desc">Active themes in catalog</div>
        </div>
      </div>

      <div class="stats shadow bg-base-100">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div class="stat-title">Total Downloads</div>
          <div class="stat-value text-secondary">{totalDownloads.toLocaleString()}</div>
          <div class="stat-desc">All-time downloads</div>
        </div>
      </div>

      <div class="stats shadow bg-base-100">
        <div class="stat">
          <div class="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div class="stat-title">Total Views</div>
          <div class="stat-value text-accent">{totalViews.toLocaleString()}</div>
          <div class="stat-desc">All-time page views</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-base-100 rounded-lg shadow-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        
        <!-- Search -->
        <div class="form-control flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Search themes..." 
            class="input input-bordered w-full"
            bind:value={searchQuery}
          />
        </div>

        <!-- Filters -->
        <div class="flex gap-2 flex-wrap">
          <select class="select select-bordered" bind:value={statusFilter}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select class="select select-bordered" bind:value={sortBy}>
            <option value="created_at">Date Created</option>
            <option value="updated_at">Last Updated</option>
            <option value="name">Name</option>
            <option value="downloads">Downloads</option>
            <option value="views">Views</option>
            <option value="price">Price</option>
          </select>

          <select class="select select-bordered" bind:value={sortOrder}>
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>

          <button class="btn btn-primary" on:click={openAddModal}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Theme
          </button>
        </div>
      </div>
    </div>

    <!-- Themes Table -->
    <div class="bg-base-100 rounded-lg shadow-lg overflow-hidden">
      {#if loading}
        <div class="flex justify-center items-center p-12">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      {:else if filteredThemes.length === 0}
        <div class="text-center p-12">
          <p class="text-base-content/70">No themes found</p>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name</th>
                <th>Category</th>
                <th>Technology</th>
                <th>Price</th>
                <th>Downloads</th>
                <th>Views</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredThemes as theme}
                <tr>
                  <td>
                    <div class="avatar">
                      <div class="w-16 h-12 rounded">
                        <img src={theme.thumbnail} alt={theme.name} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="font-bold">{theme.name}</div>
                    {#if theme.featured}
                      <span class="badge badge-warning badge-sm">Featured</span>
                    {/if}
                  </td>
                  <td>{theme.category}</td>
                  <td>
                    <span class="badge badge-outline">{theme.technology}</span>
                  </td>
                  <td>
                    {#if theme.is_free}
                      <span class="badge badge-success">Free</span>
                    {:else}
                      <span class="font-semibold">${Number(theme.price || 0).toFixed(2)}</span>
                    {/if}
                  </td>
                  <td>
                    <div class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {theme.downloads || 0}
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {theme.views || 0}
                    </div>
                  </td>
                  <td>
                    {theme.stock_quantity === null ? '∞' : theme.stock_quantity}
                  </td>
                  <td>
                    <span class="badge badge-sm" class:badge-success={theme.status === 'active'}
                          class:badge-warning={theme.status === 'draft'}
                          class:badge-error={theme.status === 'archived'}>
                      {theme.status}
                    </span>
                  </td>
                  <td>
                    <div class="flex gap-2">
                      <button class="btn btn-sm btn-ghost" on:click={() => openEditModal(theme)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button class="btn btn-sm btn-ghost text-error" on:click={() => confirmDelete(theme)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-4xl">
      <h3 class="font-bold text-2xl mb-4">
        {modalMode === 'add' ? 'Add New Theme' : 'Edit Theme'}
      </h3>
      
      <form on:submit|preventDefault={saveTheme} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- Name -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Theme Name *</span>
            </label>
            <input 
              type="text" 
              class="input input-bordered" 
              bind:value={currentTheme.name}
              required
            />
          </div>

          <!-- Categories (Multi-select) -->
          <div class="form-control md:col-span-2">
            <label class="label">
              <span class="label-text">Categories * (Select one or more)</span>
            </label>
            <div class="flex flex-wrap gap-2 p-3 border border-base-300 rounded-lg">
              {#each categories.filter(c => c !== 'All') as category}
                <label class="label cursor-pointer gap-2 px-3 py-1 border rounded-lg {currentTheme.categories?.includes(category) ? 'bg-primary text-primary-content border-primary' : 'bg-base-200'}">
                  <input 
                    type="checkbox" 
                    class="checkbox checkbox-xs"
                    value={category}
                    checked={currentTheme.categories?.includes(category)}
                    on:change={(e) => {
                      if (!currentTheme.categories) currentTheme.categories = []
                      if (e.currentTarget.checked) {
                        currentTheme.categories = [...currentTheme.categories, category]
                      } else {
                        currentTheme.categories = currentTheme.categories.filter(c => c !== category)
                      }
                      // Update primary category
                      currentTheme.category = currentTheme.categories[0] || 'Business'
                    }}
                  />
                  <span class="label-text text-sm">{category}</span>
                </label>
              {/each}
            </div>
            {#if !currentTheme.categories || currentTheme.categories.length === 0}
              <label class="label">
                <span class="label-text-alt text-error">Please select at least one category</span>
              </label>
            {/if}
          </div>

          <!-- Technology -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Technology *</span>
            </label>
            <select class="select select-bordered" bind:value={currentTheme.technology} required>
              {#each technologies.filter(t => t !== 'All') as technology}
                <option value={technology}>{technology}</option>
              {/each}
            </select>
          </div>

          <!-- Price -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Price</span>
            </label>
            <input 
              type="number" 
              step="0.01"
              class="input input-bordered" 
              bind:value={currentTheme.price}
              disabled={currentTheme.is_free}
            />
          </div>

          <!-- Stock Quantity -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Stock Quantity (blank = unlimited)</span>
            </label>
            <input 
              type="number" 
              class="input input-bordered" 
              bind:value={currentTheme.stock_quantity}
              placeholder="Unlimited"
            />
          </div>

          <!-- Status -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Status *</span>
            </label>
            <select class="select select-bordered" bind:value={currentTheme.status} required>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Description *</span>
          </label>
          <textarea 
            class="textarea textarea-bordered h-24" 
            bind:value={currentTheme.description}
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Thumbnail URL -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Thumbnail URL *</span>
            </label>
            <input 
              type="url" 
              class="input input-bordered" 
              bind:value={currentTheme.thumbnail}
              required
            />
          </div>

          <!-- Preview URL -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Preview URL *</span>
            </label>
            <input 
              type="url" 
              class="input input-bordered" 
              bind:value={currentTheme.preview_url}
              required
            />
          </div>

          <!-- Download URL -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Download URL *</span>
            </label>
            <input 
              type="url" 
              class="input input-bordered" 
              bind:value={currentTheme.download_url}
              required
            />
          </div>

          <!-- Deploy URL -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Deploy URL *</span>
            </label>
            <input 
              type="url" 
              class="input input-bordered" 
              bind:value={currentTheme.deploy_url}
              required
            />
          </div>
        </div>

        <!-- Checkboxes -->
        <div class="flex gap-6">
          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <input 
                type="checkbox" 
                class="checkbox checkbox-primary" 
                bind:checked={currentTheme.is_free}
              />
              <span class="label-text">Free Theme</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <input 
                type="checkbox" 
                class="checkbox checkbox-warning" 
                bind:checked={currentTheme.featured}
              />
              <span class="label-text">Featured</span>
            </label>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="modal-action">
          <button type="button" class="btn btn-ghost" on:click={closeModal}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {modalMode === 'add' ? 'Create Theme' : 'Update Theme'}
          </button>
        </div>
      </form>
    </div>
    <div class="modal-backdrop" on:click={closeModal}></div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm && themeToDelete}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Confirm Delete</h3>
      <p class="py-4">
        Are you sure you want to delete <strong>{themeToDelete.name}</strong>? 
        This action cannot be undone.
      </p>
      <div class="modal-action">
        <button class="btn btn-ghost" on:click={cancelDelete}>Cancel</button>
        <button class="btn btn-error" on:click={deleteTheme}>Delete</button>
      </div>
    </div>
    <div class="modal-backdrop" on:click={cancelDelete}></div>
  </div>
{/if}

<style>
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
