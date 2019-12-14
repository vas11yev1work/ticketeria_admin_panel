<template>
    <div class="gateways-page">
        <v-container>
            <v-row>
                <v-col class="col-12" lg="3">
                    <GatewaySideMenu :gateways="gatewayList"/>
                </v-col>
                <nuxt-child></nuxt-child>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import utils from '../utils/Utils';
    export default {
        name: 'gatewayLayout',
        components: {
            GatewaySideMenu: () => import('../components/gateways/GatewaySideMenu.vue'),
        },
        data() {
            return{

            }
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
        },
        async mounted(){

        },
        beforeDestroy(){

        },
        methods:{

        }
    }
</script>

<style lang="scss">

</style>
