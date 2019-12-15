export const state = () => ({
    gatewayList: [],
    loaded: false
});

export const mutations = {
    setGateways(state, gateways){
        state.gatewayList = gateways;
        state.loaded = true;
    },
    addGateway(state, gateway) {
        state.gatewayList.push(gateway);
    },
    setGateway(state, {id, data}){
        let index = state.gatewayList.findIndex(x=>x._id === id);
        Object.assign(state.gatewayList[index], data);
    },
    deleteGateway(state, id) {
        let index = state.gatewayList.findIndex(x=>x._id === id);
        state.gatewayList.splice(index, 1);
    }
};

export const actions = {
    async fetchGateways({commit}){
        try {
            let {data} = await this.$axios.$get('/api/v50/gates');
            commit('setGateways', data);
        } catch (error) {
            if (error.response) {
                commit('setLastError', {type: 'response', error: error.response.data}, {root: true})
            }else if(error.request){
                commit('setLastError', {type: 'request', error: error.request})
            }else{
                console.log('Error', {type: 'left', error: error.message});
            }
        }

    },
    async createGateway(context, payload) {
        try {
            let {data} = await this.$axios.$post('/api/v50/gates', payload); // Не забывай про await
            context.commit('addGateway', data);
        } catch (error) {
            let errorObj;
            if (error.response) {
                errorObj = {type: 'response', error: error.response.data}
            }else if(error.request){
                errorObj = {type: 'request', error: error.request}
            }else{
                errorObj = {type: 'left', error: error.message};
            }
            context.commit('setLastError', errorObj, {root: true});
            throw(errorObj);
        }
    },
    async updateGateway(context, {id, options}){
        try {
            let {data} = await this.$axios.$put(`/api/v50/gates/${id}`, options);
            context.commit('setGateway', {id, data});
        } catch (error) {
            let errorObj;
            if (error.response) {
                errorObj = {type: 'response', error: error.response.data}
            }else if(error.request){
                errorObj = {type: 'request', error: error.request}
            }else{
                errorObj = {type: 'left', error: error.message};
            }
            context.commit('setLastError', errorObj, {root: true});
            throw(errorObj);
        }
    },
    async deleteGateway(context, id){
        try {
            let {data} = await this.$axios.$delete(`/api/v50/gates/${id}`);
            context.commit('deleteGateway', id);
        } catch (error) {
            let errorObj;
            if (error.response) {
                errorObj = {type: 'response', error: error.response.data}
            }else if(error.request){
                errorObj = {type: 'request', error: error.request}
            }else{
                errorObj = {type: 'left', error: error.message};
            }
            context.commit('setLastError', errorObj, {root: true});
            throw(errorObj);
        }
    }
};

export const getters = {
    gatewayList: state => state.gatewayList,
    gatewaysLoaded: state => state.loaded,
};
