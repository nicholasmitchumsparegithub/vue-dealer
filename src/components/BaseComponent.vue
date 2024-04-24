<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header class="bg-blue-500 text-white py-4">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-lg font-bold">{{ title }}</h1>
        <!-- Navigation Menu -->
        <nav>
          <ul class="flex space-x-4">
            <li v-if="isAuthenticated"><router-link to="/dashboard" class="hover:bg-blue-700 py-2 px-3 rounded">Dashboard</router-link></li>
            <li v-if="isAuthenticated"><router-link to="/new-message" class="hover:bg-blue-700 py-2 px-3 rounded">New Message</router-link></li>
            <li v-if="isAuthenticated" @click="performLogout" class="hover:bg-blue-700 py-2 px-3 rounded">Logout</li>
            <li v-else><router-link to="/login" class="hover:bg-blue-700 py-2 px-3 rounded">Login</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div class="container mx-auto px-4">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        © 2024 Nicks Project
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'BaseComponent',
  props: {
    title: String
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    performLogout() {
      this.logout()
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.error('Logout failed', error);
          });
    }
  }
}
</script>


<style scoped>
.container {
  max-width: 1200px;
}
</style>
