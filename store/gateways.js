export const state = () => ({
    gatewayList: [],
});

export const mutations = {
    setGateways(state, gateways){
        state.gatewayList = gateways;
    },
};

export const actions = {
    async fetchGateways({commit}){
        const gateways = await this.$axios.$get('http://localhost:3001/gateways');
        commit('setGateways', gateways);
    },
};

export const getters = {
    gatewayList: state => state.gatewayList,
};
