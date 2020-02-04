import {networkErrorHandler} from '~/utils/Utils'

export const state = () => ({
    streamsList: [],
    loaded: false,
});

export const mutations = {
    setStreams(state, gateways){
        state.streamsList = gateways;
        state.loaded = true;
    },
    addStream(state, stream){
        state.streamsList.push(stream);
        state.loaded=true;
    },
    setStream(state, {id, data}){
        let index = state.streamsList.findIndex(x=>x._id === id);
        if(index !== -1)
            Object.assign(state.streamsList[index], data);
    },
    deleteStream(state, id){
        let index = state.streamsList.findIndex(x=>x._id === id);
        if(index !== -1)
            state.streamsList.splice(index, 1);
    }
};

export const actions = {
    async fetchStreams(context){
        try {
            this.loaded=false;
            let {data} = await this.$axios.$get('/api/v50/streams');
            context.commit('setStreams', data);
            this.loaded=true;
        }catch (e) {
            throw networkErrorHandler(e, context);
        }
    },
    async createStream(context, payload){
        try {
            let {data} = await this.$axios.$post('/api/v50/streams', payload);
            context.commit('addStream', data);
        }catch (e) {
            throw networkErrorHandler(e, context);
        }
    },
    async updateStream(context, {id, pdata}){
        try {
            let temp = pdata;
            delete temp['_id'];
            let {data} = await this.$axios.$put(`/api/v50/streams/${id}`, pdata);
            context.commit('setStream', {id, data});
        }catch (e) {
            throw networkErrorHandler(e, context);
        }
    },
    async deleteStream(context, id){
        try {
            let {data} = await this.$axios.$delete(`/api/v50/streams/${id}`);
            context.commit('deleteStream', id);
        }catch (e) {
            throw networkErrorHandler(e, context);
        }
    }

};

export const getters = {
    streamsList: state => state.streamsList,
};
