<template>
    <v-card class="mx-auto p-0 pt-0 pb-2" flat oncontextmenu="return false">
        <v-toolbar dense>
            <v-toolbar-title>Шлюзы</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$router.push('/gateways/create')">
                <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <span v-if="gateways.length !== 0">
                <GatewayListItem v-for="gateway in gateways" :key="gateway._id" :gateway="gateway"/>
            </span>
            <span v-else>
                <v-list-item linkclass="menu-item">
                    <v-list-item-content class="item">
                        <span>
                            <span class="text-center">Чтобы создать новый шлюз нажмите на</span>
                            <v-icon class="mb-1">mdi-plus-circle-outline</v-icon>
                        </span>
                    </v-list-item-content>
                </v-list-item>
            </span>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        props: {
            gateways: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            GatewayListItem: () => import('./GatewayListItem')
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
</style>
