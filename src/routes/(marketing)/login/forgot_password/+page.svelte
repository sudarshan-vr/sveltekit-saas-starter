<script lang="ts">
  import { onMount } from "svelte"
  
  onMount(() => {
    window.location.href = "https://app.craftuary.com/login?forgot=true"
  })
</script>

<svelte:head>
  <title>Redirecting to Password Reset...</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-xl font-bold mb-4">Redirecting to password reset...</h1>
    <p class="mb-4">If you are not redirected automatically, <a href="https://app.craftuary.com/login?forgot=true" class="link link-primary">click here</a>.</p>
  </div>
</div>
