import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import messageCapsules from './modules/messageCapsules';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    messageCapsules
  }
});


