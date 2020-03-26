<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="dark-toolbar">
        <q-toolbar-title>
          Taivas APM
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'AuthLayout',
}
</script>

<style lang="scss" scoped>
  .dark-toolbar {
    background: #212121;
  }
</style>
