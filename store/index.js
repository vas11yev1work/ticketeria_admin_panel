export const state = () => ({
    lastError:{

    },
});

export const mutations = {
    setLastError(state, error) {
        Object.assign(state.lastError, error);
    }
};

export const actions = {

};

export const getters = {

};
