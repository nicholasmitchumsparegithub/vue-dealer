<template>
  <BaseComponent title="Login or Register">
    <div class="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded shadow-lg">
      <form @submit.prevent="currentlyLoggingIn ? submitLogin() : submitRegistration()">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" id="email" v-model="email"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div v-if="!currentlyLoggingIn" class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" id="name" v-model="name"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" v-model="password"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div v-if="!currentlyLoggingIn" class="mb-6">
          <label for="passwordConfirm" class="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
          <input type="password" id="passwordConfirm" v-model="passwordConfirm"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div class="flex justify-between">
          <button type="submit" :disabled="!isFormValid"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {{ currentlyLoggingIn ? 'Login' : 'Register' }}
          </button>
          <button type="button" @click="toggleMode"
                  class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Switch to {{ currentlyLoggingIn ? 'Register' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
    <Toast ref="toast"/>
  </BaseComponent>
</template>

<script>
import BaseComponent from '@/components/BaseComponent';
import Toast from '@/components/ToastComponent';
import {mapActions} from 'vuex';

export default {
  components: {
    BaseComponent,
    Toast
  },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      currentlyLoggingIn: true
    };
  },
  computed: {
    isFormValid() {
      if (this.currentlyLoggingIn) {
        return this.email.trim() && this.password;
      } else {
        return this.email.trim() && this.name.trim() && this.password && this.password === this.passwordConfirm;
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    submitLogin() {
      this.login({email: this.email, password: this.password})
          .then(() => {
            this.$router.push({name: 'Dashboard'});
            this.$refs.toast.show('Login successful', 'success');
          })
          .catch(error => {
            console.error('Login error:', error);
            this.$refs.toast.show('Login failed: ' + error.response.data.message, 'error');
          });
    },
    submitRegistration() {
      if (!this.isFormValid) {
        this.$refs.toast.show('Please fill all fields correctly.', 'error');
        return;
      }
      this.register({
        email: this.email.trim(),
        name: this.name.trim(),
        password: this.password  // assuming password trimming is not needed
      })
          .then(response => {
            this.currentlyLoggingIn = true;
            this.$refs.toast.show(response.message, 'success');
          })
          .catch(error => {
            console.error('Registration error:', error);
            this.$refs.toast.show('Registration failed: ' + error.message, 'error');
          });
    }
    ,
    toggleMode() {
      this.currentlyLoggingIn = !this.currentlyLoggingIn;
    }
  }
}
</script>
