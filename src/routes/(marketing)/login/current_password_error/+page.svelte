<script lang="ts">
  import { onMount } from "svelte"
  
  onMount(() => {
    // Redirect after a short delay to let user read the message
    setTimeout(() => {
      window.location.href = "https://app.craftuary.com/login?error=invalid_password"
    }, 3000)
  })
</script>

<svelte:head>
  <title>Current Password Incorrect</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
  <div class="max-w-md text-center">
    <h1 class="text-2xl font-bold mb-6">Current Password Incorrect</h1>
    
    <p class="mb-4">
      You attempted to edit your account with an incorrect current password, and have
      been logged out.
    </p>
    <p class="mb-4">
      Redirecting to login page...
    </p>
    <p>
      If you are not redirected automatically, <a href="https://app.craftuary.com/login" class="link link-primary">click here</a>.
    </p>
  </div>
</div>
