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
        <v-form ref="dataForm" class="mb-12">
            <div class="fields mt-2">
                <IndexRequireParams :gateways="gatewayList" @input="onInput"/>
            </div>
        </v-form>

        <v-row>
                <v-col cols="8">
                    <v-btn large :disabled="disabled" @click="save()" color="primary">Далее</v-btn>
                    <v-btn large :disabled="disabled" @click="save()" color="primary" outlined>Сохранить</v-btn>
                    <v-btn large :disabled="disabled" @click="save(true)" color="primary" outlined>Сохранить и закрыть</v-btn>
                </v-col>
            <v-col class="d-flex justify-end mr-12">
                <v-btn large :disabled="disabled" @click="$router.push(`/import/streams/`)" color="error" outlined>Отменить</v-btn>
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
            async save(close){
                if(this.$refs.dataForm.validate()) {
                    try {
                        this.disabled = true;
                        let data = await this.createStream(this.fdata);
                        this.disabled = false;
                        if(close)
                            this.$router.push(`/import/streams/`);
                        else
                            this.$router.push(`/import/streams/${data._id}`)
                    } catch (e) {
                        this.disabled = false;
                        alert('Произошла ошибка')
                    }
                }else{
                    this.$vuetify.goTo(0);
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
