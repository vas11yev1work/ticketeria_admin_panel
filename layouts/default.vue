<template>
    <v-app id="inspire">
        <v-app-bar clipped-left app color="blue darken-3" dark style="z-index: 999">
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <v-toolbar-title>
                <span class="hidden-sm-and-down">Admin Panel</span>
            </v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" clipped app>
            <v-list dense>
                <v-list-item link to="/site">
                    <v-list-item-content>
                        <v-list-item-title>На сайте</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/places">
                    <v-list-item-content>
                        <v-list-item-title>Площадки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/import/streams">
                    <v-list-item-content>
                        <v-list-item-title>Импорт</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/gateways">
                    <v-list-item-content>
                        <v-list-item-title>Управление шлюзами</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="isAuthenticated" link to="/auth/sign-out">
                    <v-list-item-content>
                        <v-list-item-title>Выйти</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <nuxt/>
        </v-content>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                drawer: true
            }
        },
        middleware: 'authenticated',
        computed: {
            ...mapGetters({
                isAuthenticated: 'isAuthenticated',
            }),
        },
    }
</script>
