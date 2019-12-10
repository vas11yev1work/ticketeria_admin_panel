import gatewaysRepository from "~/repository/gatewaysRepository";

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
        const gateways = await gatewaysRepository.getAllGateways();
        commit('setGateways', gateways.data);
    },
};

export const getters = {
    gatewayList: state => state.gatewayList,
};
