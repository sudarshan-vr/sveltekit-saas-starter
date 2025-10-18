<script lang="ts">
  import { onMount } from "svelte"
  
  onMount(() => {
    window.location.href = "https://app.craftuary.com/login"
  })
</script>

<svelte:head>
  <title>Redirecting to Sign In...</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-xl font-bold mb-4">Redirecting to sign in...</h1>
    <p class="mb-4">If you are not redirected automatically, <a href="https://app.craftuary.com/login" class="link link-primary">click here</a>.</p>
  </div>
</div>
