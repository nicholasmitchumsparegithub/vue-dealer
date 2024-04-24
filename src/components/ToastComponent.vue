<template>
  <transition name="fade">
    <div v-if="visible" :class="toastClass" class="fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      type: 'success'
    };
  },
  computed: {
    toastClass() {
      return {
        'bg-green-500': this.type === 'success',
        'bg-red-500': this.type === 'error'
      };
    }
  },
  methods: {
    show(message, type = 'success') {
      this.message = message;
      this.type = type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000); // Hide the toast after 3 seconds
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
