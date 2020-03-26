<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="dark-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Taivas APM<span class="text-grey-7">@{{ backendName }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-10 drawer-content"
    >
      <MainNavigation />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import MainNavigation from 'src/components/partials/MainNavigation.vue'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      backendName: 'auth/backendName',
    }),
  },
  components: {
    MainNavigation,
  },
}
</script>

<style lang="scss" scoped>
  .dark-toolbar {
    background: #212121;
  }
</style>
