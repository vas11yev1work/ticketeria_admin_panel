<template>
    <div class="gateways-page">
        <v-container>
            <v-row>
                <v-col class="col-12" lg="3">
                    <GatewaySideMenu :gateways="gatewayList"></GatewaySideMenu>
                </v-col>
                <v-col class="col-12" lg="9">
                    <div class="page-title-wrap">
                        <h1 class="headline font-weight-medium">Управление шлюзами</h1>
                        <span class="grey--text">Обязательные поля</span>
                    </div>
                    <GatewayEdit></GatewayEdit>
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
            GatewayEdit: () => import('../../components/gateways/GatewayEdit.vue')
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
        }
    }
</script>
