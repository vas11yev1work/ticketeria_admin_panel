<template>
    <v-col class="col-12" lg="9">
        <div class="page-title-wrap mb-4">
            <h1 class="headline font-weight-medium">Создание нового потока импорта</h1>
        </div>
        <div class="description">
            <h3 class="black--text">
                Обязательные параметры
            </h3>
        </div>
        <v-form>
            <div class="fields mt-2">
                <IndexRequireParams :gateways="gatewayList" @input="onInput"/>
            </div>
        </v-form>

        <v-row>
            <v-col>
                <v-btn :disabled="disabled" @click="save()" color="primary">Сохранить</v-btn>
            </v-col>
            <v-col class="d-flex justify-end mr-12">
                <v-btn :disabled="disabled" color="error">Отменить</v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
    import IndexRequireParams from "~/components/stream/StreamParams";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            IndexRequireParams
        },
        data(){
            return{
                disabled: false,
                fdata:{

                }
            }
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
                createStream: 'streams/createStream'
            }),
            onInput(event){
                this.fdata = event;
            },
            async save(){
                try {
                    this.disabled=true;
                    await this.createStream(this.fdata);
                    this.disabled=false;
                    this.$router.push('/import/streams')
                }catch (e) {
                    this.disabled=false;
                    alert('Произошла ошибка')
                }
            }
        },
        async mounted() {
            this.fetchGateways();
        },
    }
</script>

<style scoped>

</style>
