<template>
    <v-col v-if="stream !== '404'" class="col-12" lg="9">
        <div class="page-title-wrap mb-4">
            <h1 class="headline font-weight-medium">Редактирование потока: {{stream.name}}</h1>
        </div>
        <div class="description">
            <h3 class="black--text">
                Обязательные параметры
            </h3>
        </div>
        <v-form>
            <div class="fields mt-2">
                <IndexRequireParams :streamData="stream" :gateways="gatewayList" @input="onInput"/>
            </div>
        </v-form>
        <v-row>
            <v-col>
                <v-btn :disabled="disabled" @click="save()" color="primary">Сохранить</v-btn>
            </v-col>
            <v-col class="d-flex justify-end mr-12">
                <v-btn :disabled="disabled" @click="deleteClick()" color="error">Удалить</v-btn>
            </v-col>
        </v-row>
    </v-col>
    <v-col v-else class="col-12" lg="9">
        <div class="page-title-wrap mb-4">
            <h1 class="headline font-weight-medium">Ошибка: 404</h1>
        </div>
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
                disabled:false,
                fdata:{

                }
            }
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
                streamsList: 'streams/streamsList'
            }),
            stream(){
                return this.streamsList.find(i => i._id === this.$route.params.id) || '404';
            }
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
                createStream: 'streams/createStream',
                updateStream: 'streams/updateStream',
                deleteStream: 'streams/deleteStream',
            }),
            onInput(event){
                this.fdata = event;
            },
            async save(){
                try {
                    this.disabled=true;
                    await this.updateStream({id:this.$route.params.id, pdata: this.fdata});
                    this.disabled=false;
                    this.$router.push('/import/streams')
                }catch (e) {
                    this.disabled=false;
                    alert('Произошла ошибка');
                    console.log(e);
                }
            },
            async deleteClick(){
                try {
                    this.disabled=true;
                    let confirmation = confirm(`Вы действительно хотете удалить ${this.stream.name}`);
                    if(confirmation)
                        await this.deleteStream(this.$route.params.id);
                    this.disabled=false;
                    if(confirmation)
                        this.$router.push('/import/streams')
                }catch (e) {
                    this.disabled=false;
                    alert('Произошла ошибка');
                    console.error(e);
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
