<template>
    <v-card class="mx-auto p-0 pt-2 pb-2">
        <v-list>
            <v-list-item v-for="gateway in gateways" :key="gateway.id" link
                         :to="{ name: 'gateways-id', params: { id: gateway.id } }">
                <v-list-item-content>
                    <span>{{ gateway.name }}</span>
                </v-list-item-content>
            </v-list-item>
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
        data() {
            return {}
        },
    }
</script>

<style scoped>
</style>
