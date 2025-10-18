<script lang="ts">
  import { onMount } from "svelte"
  
  onMount(() => {
    window.location.href = "https://app.craftuary.com/signup"
  })
</script>

<svelte:head>
  <title>Redirecting to Sign Up...</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-xl font-bold mb-4">Redirecting to sign up...</h1>
    <p class="mb-4">If you are not redirected automatically, <a href="https://app.craftuary.com/signup" class="link link-primary">click here</a>.</p>
  </div>
</div>
