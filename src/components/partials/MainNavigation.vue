<template>
<div>
  <q-list>
    <q-item-label
      header
      class="text-grey-8"
    >
      Application
    </q-item-label>
    <q-item
      clickable
      exact
      to="/"
    >
      <q-item-section
        avatar
      >
        <q-icon name="home" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Dashboard</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      to="/requests"
    >
      <q-item-section
        avatar
      >
        <q-icon name="view_headline" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Requests</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  <q-list>
    <q-item-label
      header
      class="text-grey-8"
    >
      Misc
    </q-item-label>
    <q-item
      clickable
      to="/auth/logout"
    >
      <q-item-section
        avatar
      >
        <q-icon name="power_settings_new" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Logout</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</div>
</template>
