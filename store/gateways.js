export const state = () => ({
    gatewayList: [],
});

export const mutations = {
    setGateways(state, gateways){
        state.gatewayList = gateways;
    },
    addGateway(state, gateway) {
        state.gatewayList.push(gateway);
    }
};

export const actions = {
    async fetchGateways({commit}){
        await this.$axios.$get('/api/v50/gates').then(response => {
            commit('setGateways', response.data);
        }).catch(err => console.log(err));
    },
    async createGateway(ctx, payload) {
        let { data } = this.$axios.$post('/api/v50/gates');
        ctx.commit('addGateway', data);
    }
};

export const getters = {
    gatewayList: state => state.gatewayList,
};
