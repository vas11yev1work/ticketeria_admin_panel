<template>
    <v-col class="col-12" lg="9">
        <div class="page-title-wrap mb-4">
            <h1 class="headline font-weight-medium">Все шлюзы</h1>
        </div>
        <div class="description">
            <p class="grey--text">
                Для управления шлюзами, нажмите правой кнопкой мышки на пункт "Все шлюзы" и выберете нужны пункт, либо
                наведите на пункт "Все шлюзы" и нажмите на шестерёнку
            </p>
            <p>
                <span class="text-center grey--text">Чтобы создать новый шлюз нажмите на</span>
                <v-icon class="mb-1">mdi-plus-circle-outline</v-icon>
            </p>
        </div>
        <GatewayTable :gateways="gatewayList"/>
    </v-col>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        components: {
            GatewaySideMenu: () => import('../../components/gateways/GatewaySideMenu.vue'),
            GatewayEdit: () => import('../../components/gateways/GatewayEdit.vue'),
            GatewayTable: () => import('../../components/gateways/GatewayTable.vue')
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
        },
        async mounted() {
            if (this.gatewayList.length === 0) {
                await this.fetchGateways();
            }
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways'
            }),
            newGateway() {

            }
        }
    }
</script>
