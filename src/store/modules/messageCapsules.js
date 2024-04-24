import axios from '@/utils/axiosConfig';

const state = {
    capsules: [],
    currentCapsule: null,
};

const mutations = {
    SET_CAPSULES(state, capsules) {
        state.capsules = capsules;
    },
    ADD_CAPSULE(state, capsule) {
        state.capsules.push(capsule);
    },
    SET_CURRENT_CAPSULE(state, capsule) {
        console.log('SET_CURRENT_CAPSULE', capsule);
        state.currentCapsule = capsule;
    },
    UPDATE_MESSAGE(state, { capsuleId, message }) {
        const index = state.capsules.findIndex(capsule => capsule.id === capsuleId);
        if (index !== -1) {
            state.capsules[index].message = message;
        }
    },
};

const actions = {
    fetchCapsules({commit}) {
        axios.get(`${process.env.VUE_APP_API_URL}/message-capsules`)
            .then(response => {
                commit('SET_CAPSULES', response.data.messageCapsules);

            })
            .catch(error => console.error('Error fetching message capsules:', error));
    },
    fetchCapsuleById({ commit }, { capsuleId }) {
        axios.get(`${process.env.VUE_APP_API_URL}/message-capsules/${capsuleId}`)
            .then(response => {
                console.log('asdf' + response.data.messageCapsule);
                commit('SET_CURRENT_CAPSULE', response.data.messageCapsule);
                return response.data.messageCapsule;
            })
            .catch(error => {
                console.error('Error fetching the capsule:', error);
                throw error;
            });
    },
    createCapsule({commit}, capsuleData) {
        return axios.post(`${process.env.VUE_APP_API_URL}/message-capsules`, capsuleData)
            .then(response => {
                commit('ADD_CAPSULE', response.data);
                return response;
            })
            .catch(error => {
                console.error('Error creating new capsule:', error);
                throw error;  // Rethrow to handle in component
            });
    },
    updateMessageCapsule({ commit }, { capsuleId, message }) {
        return axios.put(`${process.env.VUE_APP_API_URL}/message-capsules/${capsuleId}`, { message })
            .then(response => {
                commit('UPDATE_MESSAGE', { capsuleId, message });
                return response.data;
            })
            .catch(error => {
                throw new Error(error.response.data.message || 'Failed to update message due to server error.');
            });
    },

};

const getters = {
    allCapsules: state => state.capsules,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

