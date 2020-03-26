<template>
  <div class="row justify-center q-pt-xl">
    <div>You are being logged out...</div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('auth/logout')
    this.$router.replace('/auth/login')
  },
}
</script>
