<template>
    <v-list-item link @click.right="ctxMenu = !ctxMenu" class="menu-item">
        <v-list-item-content class="item">
            <div class="item-wrap">
                <nuxt-link class="menu-item-link" :to="{ name: 'gateways-id', params: { id: gateway._id } }">
                    {{ gateway.name }}
                </nuxt-link>
                <v-btn text icon @click="ctxMenu = !ctxMenu" class="icon-button">
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
            </div>
        </v-list-item-content>
        <v-scroll-y-transition>
            <div class="context-menu" v-if="ctxMenu">
                <v-list>
                    <v-list-item link to="/">
                        <v-list-item-title>Создать новый шлюз</v-list-item-title>
                    </v-list-item>
                    <v-list-item link :to="{ name: 'gateways-id', params: { id: gateway._id } }" @click="ctxMenu = false">
                        <v-list-item-title>Настроить шлюз</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Переименовать шлюз</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Удалить шлюз</v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </v-scroll-y-transition>
    </v-list-item>
</template>

<script>
    export default {
        props: {
            gateway: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                ctxMenu: false
            }
        },
        methods: {
            closeContextMenu(e) {
                if (!this.$el.contains(e.target)) {
                    this.ctxMenu = false
                }
            }
        },
        mounted() {
            if(typeof document !== 'undefined') {
                document.addEventListener('mouseup', this.closeContextMenu);
            }
        }
    }
</script>

<style lang="scss">
    .menu-item{
        position: relative;
        .item{
            display: block;
            padding: 0;
            .menu-item-link{
                text-decoration: none;
                color: rgba(0,0,0,.87);
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
            }
            .item-wrap{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px;
            }
            .item-span{
                flex: initial;
            }
            .icon-button{
                opacity: 0;
            }
            &:hover{
                .icon-button{
                    opacity: 1;
                }
            }
        }
        .context-menu{
            top: 34px;
            left: 20px;
            position: absolute;
            border-radius: 5px;
            z-index: 99;
            box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }
    }
</style>
