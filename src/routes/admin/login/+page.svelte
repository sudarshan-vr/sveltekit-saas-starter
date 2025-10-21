<script lang="ts">
  import { goto } from '$app/navigation'
  
  let username = ''
  let password = ''
  let error = ''
  let loading = false

  async function handleLogin(e: Event) {
    e.preventDefault()
    error = ''
    loading = true

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to admin dashboard
        goto('/admin/themes')
      } else {
        error = data.error || 'Invalid credentials'
      }
    } catch (err) {
      error = 'Login failed. Please try again.'
    } finally {
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Admin Login | Craftuary</title>
  <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-2xl">
    <div class="card-body">
      <!-- Logo/Header -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Craftuary Admin
        </h1>
        <p class="text-base-content/70 mt-2">Sign in to manage themes</p>
      </div>

      <!-- Error Alert -->
      {#if error}
        <div class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      {/if}

      <!-- Login Form -->
      <form on:submit={handleLogin}>
        <div class="form-control">
          <label class="label" for="username">
            <span class="label-text font-semibold">Username</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            class="input input-bordered"
            bind:value={username}
            required
            autocomplete="username"
          />
        </div>

        <div class="form-control mt-4">
          <label class="label" for="password">
            <span class="label-text font-semibold">Password</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            class="input input-bordered"
            bind:value={password}
            required
            autocomplete="current-password"
          />
        </div>

        <div class="form-control mt-6">
          <button 
            type="submit" 
            class="btn btn-primary"
            disabled={loading}
          >
            {#if loading}
              <span class="loading loading-spinner"></span>
              Signing in...
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            {/if}
          </button>
        </div>
      </form>

      <!-- Security Notice -->
      <div class="mt-6 text-center">
        <p class="text-xs text-base-content/50">
          🔒 This is a secure admin area
        </p>
      </div>
    </div>
  </div>
</div>
