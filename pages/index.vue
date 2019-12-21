<template>
    <div class="index-page">
        <v-container>
            <v-row>
                <v-col class="col-12" lg="3">
                    <h3>Aside Menu</h3>
                </v-col>
                <v-col class="col-12" lg="9">
                    <div class="page-title-wrap mb-4">
                        <h1 class="headline font-weight-medium">Создание нового потока импорта</h1>
                    </div>
                    <div class="description">
                        <p class="grey--text">
                            Обязательные параметры
                        </p>
                    </div>
                    <v-form>
                        <div class="fields mt-2">
                            <IndexRequireParams :gateways="gatewayList"/>
                        </div>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import IndexRequireParams from "../components/index/IndexRequireParams";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            IndexRequireParams
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
        },
        mounted() {
            this.fetchGateways();
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
            }),
        }
    }
</script>
