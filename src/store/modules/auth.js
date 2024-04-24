import axios from '@/utils/axiosConfig';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('authToken') || null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('authToken', token);
        },
        CLEAR_TOKEN(state) {
            state.token = null;
            localStorage.removeItem('authToken');
        },

    },
    actions: {
        login({commit}, credentials) {
            return axios.post(`${process.env.VUE_APP_API_URL}/login`, credentials)
                .then(response => {
                    const token = response.data.access_token;
                    commit('SET_TOKEN', token);
                    return response;
                })
                .catch(error => {
                    throw new Error(error.response.data.message || 'Login failed');
                });
        },
        // eslint-disable-next-line no-unused-vars
        register({commit}, credentials) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_API_URL}/register`, credentials)
                    .then(response => {
                        // Optionally, commit any relevant mutation or simply resolve the promise
                        resolve(response.data);
                    })
                    .catch(error => {
                        // Error handling
                        if (error.response && error.response.data && error.response.data.message) {
                            reject(new Error(error.response.data.message));
                        } else {
                            reject(new Error('Registration failed due to a server error. Please try again later.'));
                        }
                    });
            });
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_API_URL}/logout`)
                    .then(response => {
                        commit('CLEAR_TOKEN');  // Commit a mutation to clear user data
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        token: state => state.token
    }
};
