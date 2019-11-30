<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
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
                <v-list-item link to="/">
                    <v-list-item-content>
                        <v-list-item-title>Импорт</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/gateways">
                    <v-list-item-content>
                        <v-list-item-title>Управление шлюзами</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Admin</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <nuxt></nuxt>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: true,
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap&subset=cyrillic');
    *, *::before, *::after{
        font-family: 'Montserrat', sans-serif;
    }
</style>
