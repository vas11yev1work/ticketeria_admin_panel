export const state = () => ({
    gatewayList: [],
});

export const mutations = {
    setGateways(state, gateways){
        state.gatewayList = gateways;
    }
};

export const actions = {
    async fetchGateways({commit}){
        await this.$axios.$get('/api/v50/gates').then(response => {
            commit('setGateways', response.data);
        }).catch(err => console.log(err));
    }
};

export const getters = {
    gatewayList: state => state.gatewayList,
};
