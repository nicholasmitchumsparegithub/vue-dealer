<template>
  <BaseComponent title="Dashboard">
    <div class="p-5 bg-white rounded shadow-lg">
      <p>Welcome to your Dashboard!</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="capsule in allCapsules" :key="capsule.id" class="border rounded p-4 flex flex-col items-start">
          <h3 class="font-semibold">{{ capsule.title }}</h3>
          <p>{{ capsule.message }}</p>
          <button :class="buttonClass(capsule.open_date)"
                  @click="canOpen(capsule.open_date) && openCapsule(capsule.id)"
                  class="mt-auto py-2 px-4 rounded font-bold text-white">
            {{ buttonLabel(capsule.open_date) }}
          </button>
          <button v-if="canEdit(capsule.open_date)"
                  @click="editCapsule(capsule.id)"
                  class="mt-2 py-2 px-4 rounded font-bold text-white bg-blue-500 hover:bg-blue-600">
            Edit
          </button>
        </div>
      </div>
    </div>
  </BaseComponent>
</template>

<script>
import BaseComponent from '@/components/BaseComponent';
import { mapGetters, mapActions } from 'vuex';
import router from "@/router";

export default {
  components: {
    BaseComponent
  },
  computed: {
    ...mapGetters('messageCapsules', ['allCapsules'])
  },
  created() {
    this.fetchCapsules();
  },
  methods: {
    ...mapActions('messageCapsules', ['fetchCapsules']),
    buttonClass(openDate) {
      const now = new Date();
      const open = new Date(openDate);
      return now >= open ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';
    },
    buttonLabel(openDate) {
      const now = new Date();
      const open = new Date(openDate);
      return now >= open ? 'Open' : 'Unavailable';
    },
    canEdit(openDate) {
      const now = new Date();
      const open = new Date(openDate);
      return now >= open;
    },
    canOpen(openDate) {
      const now = new Date();
      return now >= new Date(openDate);
    },
    editCapsule(capsuleId) {
      router.push({ name: 'EditMessage', params: { capsuleId: capsuleId } });
    },
    openCapsule(capsuleId) {
      this.$router.push({ name: 'ViewMessage', params: { capsuleId: capsuleId } });
    }
  }
}
</script>
