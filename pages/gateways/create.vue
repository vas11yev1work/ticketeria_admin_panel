<template>
    <v-col class="col-12" lg="9">
        <div class="page-title-wrap">
            <h1 class="headline font-weight-medium">Создание шлюза</h1>
            <span class="grey--text">Обязательные поля</span>
            <v-alert :value="alert.shown" @input="alert.shown = $event" dismissible transition="scale-transition"
                     type="error">
                Произошла ошибка: {{alert.text}}
            </v-alert>
        </div>
        <GatewayEdit @input="onInput" :checkResult="checkResult" :disabled="processing" />
    </v-col>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import utils from '../../utils/Utils';
    export default {
        name: 'gatewayCreation',
        components: {
            GatewaySideMenu: () => import('../../components/gateways/GatewaySideMenu.vue'),
            GatewayEdit: () => import('../../components/gateways/GatewayEdit.vue'),
            GatewayTable: () => import('../../components/gateways/GatewayTable.vue')
        },
        data() {
            return {
                alert:{
                    shown: false,
                    text: true
                },
                checkResult: {
                    loading: false,
                    status: '',
                    error: false
                },
                processing: false,
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
        beforeDestroy(){

        },

        methods:{
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
                createGateway: 'gateways/createGateway'
            }),
            async onInput(event) {
                switch (event.type) {
                    case 'save':
                        await this.tryCreate(event.data);
                        break;
                    case 'cancel':
                        this.$router.push('/gateways');
                        break;
                    case 'delete':
                        this.$router.push('/gateways');
                        break;
                    case 'checkConnection':
                        await this.checkConnection();
                        break;
                }
            },
            async tryCreate(data){
                try{
                    this.processing = true;
                    await this.createGateway(utils.normalizeBeforeSend(data));
                    this.$router.push('/gateways')
                }catch (e) {
                    this.$emit('error', e);
                    await this.$vuetify.goTo(0);
                    this.alert.shown = true;
                    this.alert.text = e.error.status === 405 ? 'неправильный ввод' : `код ${e.error.status}`; //Перенести в отдельны обработчик ошибок, единый для всех;
                }
                this.processing = false;
            },
            async checkConnection(){
                this.checkResult.loading=true;
                try {
                    let {status, data} = await this.$axios.get('/api/v50/gates');
                    this.checkResult.error = false;
                    this.checkResult.status = status;
                }catch (e) {
                    this.checkResult.error = true;
                    if (e.type === 'response') {
                        this.checkResult.status = e.error.status;
                    } else {
                        this.checkResult.status = 'проблемы с подключением';
                    }
                }finally {
                    this.checkResult.loading = false;
                }
            }
        }
    }
</script>
