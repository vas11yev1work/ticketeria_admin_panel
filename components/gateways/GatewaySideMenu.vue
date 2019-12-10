<template>
    <v-card class="mx-auto p-0 pt-2 pb-2" oncontextmenu="return false">
        <v-list>
            <GatewayListItem v-for="gateway in gateways" :key="gateway.id" :gateway="gateway"/>
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
