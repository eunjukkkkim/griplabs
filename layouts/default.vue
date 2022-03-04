<template>
  <div class="p-20">
    <div class="logo-container">
      <img
        src="../assets/logo.png"
        width="100%"
        height="100%"
        @click="$router.push('/')"
      />
    </div>

    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultPage',
};
</script>

<style></style>
