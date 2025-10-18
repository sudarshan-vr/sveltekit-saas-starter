<script lang="ts">
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"

  // Authentication is handled externally at https://app.craftuary.com
  // Redirect to external panel for password management
  onMount(() => {
    goto("https://app.craftuary.com/password-reset")
  })
</script>

<svelte:head>
  <title>Change Password</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[50vh]">
  <div class="text-center">
    <h1 class="text-xl font-bold mb-4">Redirecting to account settings...</h1>
    <p class="mb-4">If you are not redirected automatically, <a href="https://app.craftuary.com/password-reset" class="link link-primary">click here</a>.</p>
  </div>
</div>
