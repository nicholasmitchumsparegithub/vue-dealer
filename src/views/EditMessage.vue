<template>
  <BaseComponent title="Edit Message Capsule">
    <Toast ref="toast" />
    <div class="container mx-auto p-6 bg-white rounded shadow-md">
      <div v-if="loading" class="text-center">
        <p class="text-lg text-gray-700">Loading capsule data...</p>
      </div>
      <div v-else>
        <div v-if="editable && capsule">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Edit Message Capsule</h2>
          <form @submit.prevent="updateCapsule" class="space-y-6">
            <div class="flex flex-col">
              <label for="message" class="mb-2 font-semibold text-gray-700">Message:</label>
              <textarea id="message" v-model="editedMessage"
                        class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="4" required>
              </textarea>
            </div>
            <button type="submit"
                    class="w-full btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Message
            </button>
          </form>
        </div>
        <div v-else-if="capsule">
          <p class="text-red-500">This message cannot be edited until its scheduled opening time.</p>
        </div>
        <div v-else>
          <p class="text-red-500">Unable to load capsule data. Please try refreshing the page.</p>
        </div>
      </div>
    </div>
  </BaseComponent>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Toast from '@/components/ToastComponent.vue';
import BaseComponent from "@/components/BaseComponent";

export default {
  components: {
    BaseComponent,
    Toast
  },
  props: {
    capsuleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      editedMessage: '',
      editable: false,
      loading: true,
    };
  },
  computed: {
    ...mapState('messageCapsules', {
      capsule: state => state.currentCapsule
    })
  },
  methods: {
    ...mapActions('messageCapsules', ['fetchCapsuleById', 'updateMessageCapsule']),
    initializeData(capsule) {
      if (capsule) {
        this.editedMessage = capsule.message;
        this.checkEditable(capsule.open_date);
      }
      this.loading = false;
    },
    checkEditable(openDate) {
      this.editable = new Date() >= new Date(openDate);
    },
    updateCapsule() {
      if (!this.editedMessage.trim()) {
        this.$refs.toast.show('The message cannot be empty.', 'error');
        return;
      }
      this.updateMessageCapsule({ capsuleId: this.capsuleId, message: this.editedMessage })
          .then(() => {
            this.$refs.toast.show('Message updated successfully.', 'success');
          })
          .catch(error => {
            const msg = error.response && error.response.data.message ? error.response.data.message : 'Failed to update message due to server error.';
            this.$refs.toast.show(msg, 'error');
          });
    }
  },
  watch: {
    capsule(newVal) {
      if (newVal) {
        this.initializeData(newVal);
      } else {
        this.loading = false;
        this.$refs.toast.show('1Capsule data could not be loaded.', 'error');
      }
    }
  },
  mounted() {
    this.fetchCapsuleById({ capsuleId: this.capsuleId }).then(capsule => {
      this.initializeData(capsule);
    }).catch(error => {
      this.loading = false;
      this.$refs.toast.show('Failed to fetch capsule: ' + error.message, 'error');
    });
  }

}
</script>
