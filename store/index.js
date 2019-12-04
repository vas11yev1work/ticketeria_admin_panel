export const state = () => ({
    gateways: [],
});

export const mutations = {
    setGateways(state, gateways){
        state.gateways = gateways;
    },
};

export const actions = {
    async fetchGateways({commit}){
        const gateways = await this.$axios.$get('http://localhost:3001/gateways');
        commit('setGateways', gateways);
    },
};

export const getters = {
    gateways: state => state.gateways,
};
