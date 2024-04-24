<template>
  <BaseComponent title="New Message">
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-lg font-bold mb-4">Create New Message Capsule</h2>
      <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <ValidationProvider rules="required|max:255" v-slot="{ errors }" name="title">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" v-model="form.title"
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                     required>
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider rules="required" v-slot="{ errors }" name="message">
            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" v-model="form.message"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required></textarea>
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider rules="required" v-slot="{ errors }" name="openDate">
            <div class="mb-4">
              <label for="openDate" class="block text-sm font-medium text-gray-700">Open Date</label>
              <input type="date" id="openDate" v-model="form.openDate"
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                     required>
              <span class="text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <button type="submit" :disabled="invalid"
                  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Capsule
          </button>
        </form>
      </ValidationObserver>
      <ToastComponent ref="toast" />

    </div>
  </BaseComponent>
</template>


<script>
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required, max} from 'vee-validate/dist/rules';
import BaseComponent from "@/components/BaseComponent.vue";
import ToastComponent from "@/components/ToastComponent.vue";

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('max', {
  ...max,
  message: 'This field must not exceed 255 characters'
});

export default {
  components: {
    BaseComponent,
    ValidationObserver,
    ValidationProvider,
    ToastComponent
  },
  data() {
    return {
      form: {
        title: '',
        message: '',
        openDate: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch('messageCapsules/createCapsule', {
        title: this.form.title,
        message: this.form.message,
        open_date: this.form.openDate
      })
          .then(() => {
            this.$refs.toast.show('Capsule created successfully!', 'success'); // Trigger success toast
            this.$router.push('/dashboard');
          })
          .catch(error => {
            this.$refs.toast.show('Failed to create capsule. ' + error.message, 'error'); // Trigger error toast
            console.error('Error creating capsule:', error);
          });
    }
  }
};
</script>