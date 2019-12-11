<template>
    <div class="gateways-page">
        <v-container>
            <v-row>
                <v-col class="col-12" lg="3">
                    <GatewaysList :gateways="gatewayList"/>
                </v-col>
                <v-col class="col-12" lg="9" v-if="gateway !== undefined">
                    <div class="page-title-wrap">
                        <h1 class="headline font-weight-medium">Управление шлюзами</h1>
                        <span class="grey--text">Обязательные поля</span>
                    </div>
                    <GatewayEdit :gatewayObject="gateway"/>
                </v-col>
                <v-col class="col-12" lg="9" v-else>
                    Пожалуйста подождите...
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import GatewaySideMenu from "../../components/gateways/GatewaySideMenu";
    import GatewayEdit from "../../components/gateways/GatewayEdit";

    export default {
        components: {
            GatewayEdit,
            GatewaySideMenu,
            GatewaysList: () => import('../../components/gateways/GatewaySideMenu.vue'),
        },

        data() {
            return {

            }
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
            gateway(){
                return this.gatewayList.find(i => i.id === this.$route.params._id);
            }
        },
        async mounted() {
            this.fetchGateways();
        },
        methods:{
            ...mapActions({
               fetchGateways: 'gateways/fetchGateways'
            }),
        }
    }
</script>
