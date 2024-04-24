import Vue from 'vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';
import axios from 'axios';

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  const token = store.getters['auth/token'];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app');


