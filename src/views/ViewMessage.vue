<template>
  <BaseComponent title="View Message Capsule">
    <Toast ref="toast" />
    <div class="container mx-auto p-6 bg-white rounded shadow-md">
      <div v-if="loading" class="text-center">
        <p class="text-lg text-gray-700">Loading capsule data...</p>
      </div>
      <div v-else-if="capsule">
        <h2 class="text-2xl font-bold text-gray-800">Title: {{ capsule.title }}</h2>
        <p class="mb-4">Message: {{ capsule.message }}</p>
        <p class="text-sm text-gray-500">Open Date: {{ new Date(capsule.open_date).toLocaleDateString() }}</p>
      </div>
      <div v-else>
        <p class="text-red-500">Unable to load capsule data. Please try refreshing the page.</p>
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
      loading: true
    };
  },
  computed: {
    ...mapState('messageCapsules', {
      capsule: state => state.currentCapsule
    })
  },
  methods: {
    ...mapActions('messageCapsules', ['fetchCapsuleById']),
    initializeData() {
      this.loading = false;
    }
  },
  watch: {
    capsuleId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loading = true;
          this.fetchCapsuleById({ capsuleId: newVal }).then(() => {
            this.initializeData();
          }).catch(error => {
            this.loading = false;
            this.$refs.toast.show('Failed to fetch capsule: ' + error.message, 'error');
          });
        }
      }
    }
  }
}
</script>
