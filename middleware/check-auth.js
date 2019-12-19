import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({app, isServer, store, req }) {
    // If nuxt generate, pass this middleware
    if (isServer && !req) return;
    const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage();
    app.$axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;store.commit('SET_USER', loggedUser)
}
