<script lang="ts">
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"

  let message = $state("Signing out....")

  // Redirect to home since auth is handled externally
  onMount(() => {
    setTimeout(() => {
      goto("/")
    }, 500)
  })
</script>

<h1 class="text-2xl font-bold m-6 mx-auto my-auto">{message}</h1>
