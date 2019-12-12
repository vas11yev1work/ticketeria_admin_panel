<template>
    <div class="gateways-page">
        <v-container>
            <v-row>
                <v-col class="col-12" lg="3">
                    <GatewaySideMenu :gateways="gatewayList"/>
                </v-col>
                <v-col class="col-12" lg="9">
                    <div class="page-title-wrap mb-4">
                        <h1 class="headline font-weight-medium">Все шлюзы</h1>
                    </div>
                    <div class="description">
                        <p class="grey--text">
                            Для управления шлюзами, нажмите правой кнопкой мышки на пункт "Все шлюзы" и выберете нужны пункт,  либо наведите  на пункт "Все шлюзы" и нажмите на шестерёнку
                        </p>
                    </div>
                    <v-btn
                        link
                        to="/newGateway"
                        class="text-capitalize font-weight-regular mb-6"
                        color="primary"
                        large @click="newGateway">Создать новый шлюз
                    </v-btn>
                    <GatewayTable :gateways="gatewayList"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        components: {
            GatewaySideMenu: () => import('../../components/gateways/GatewaySideMenu.vue'),
            GatewayEdit: () => import('../../components/gateways/GatewayEdit.vue'),
            GatewayTable: () => import('../../components/gateways/GatewayTable.vue')
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
        },
        async mounted(){
            if(this.gatewayList.length === 0){
                await this.fetchGateways();
            }
        },
        methods:{
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways'
            }),
            newGateway() {

            }
        }
    }
</script>
