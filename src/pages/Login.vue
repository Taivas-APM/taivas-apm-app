<template>
  <div class="row justify-center q-pt-xl">
    <form @submit.prevent="login" style="width: 400px">
      <div class="column q-gutter-md">
        <q-input class="col" outlined v-model="url" label="Backend URL" placeholder="https://yourdomain.com/taivas" />
        <q-input class="col" outlined v-model="email" label="Email" />
        <q-input class="col" type="password" outlined v-model="password" label="Password" />
        <q-btn class="col" color="primary" type="submit">Login</q-btn>
      </div>
    </form>
  </div>
</template>

<script>
import AuthApi from 'src/api/authApi'

export default {
  data () {
    return {
      url: null,
      email: null,
      password: null,
    }
  },
  methods: {
    login () {
      this.$store.commit('auth/setUrl', this.url)
      AuthApi.login(this.email, this.password).then(data => {
        this.$store.commit('auth/setToken', data.token)
        this.$router.push('/')
      }).catch(err => {
        let message = 'An unknown error occured'
        if (err.status === 404) {
          message = 'I could not talk with the backend, check the url'
        }
        if (err.status === 403) {
          message = 'I could not log you in, check your email/password'
        }
        this.$q.notify(message)
      })
    },
  },
}
</script>
