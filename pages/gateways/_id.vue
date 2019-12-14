<template>
    <v-col class="col-12" lg="9" v-if="gateway !== undefined">
        <div class="page-title-wrap">
            <h1 class="headline font-weight-medium">Управление шлюзами</h1>
            <span class="grey--text">Обязательные поля</span>
            <v-alert :value="alert.shown" @input="alert.shown = $event" dismissible transition="scale-transition"
                     type="error">
                Произошла ошибка: {{alert.text}}
            </v-alert>
        </div>
        <GatewayEdit ref="gateEditor" @input="onInput" :checkResult="checkResult" :disabled="processing" :gatewayObject="gateway"/>
    </v-col>
    <v-col class="col-12 text-center" lg="9" v-else>
        <span style="font-size: 25px">{{gatewaysLoaded === true? 'Ничего не наденно!' : 'Пожалуйста, подождите'}}</span>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import GatewayEdit from "../../components/gateways/GatewayEdit";
    import utils from "../../utils/Utils";
    import axios from "../../.nuxt/axios";

    export default {
        name: 'gatewayView',
        components: {
            GatewayEdit,
            GatewaySideMenu: () => import('../../components/gateways/GatewaySideMenu.vue'),
        },
        data() {
            return {
                alert: {
                    shown: false,
                    text: true
                },
                checkResult: {
                    loading: false,
                    status: '',
                    error: false
                },
                processing: false,
                timeoutId: 0
            }
        },

        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
                gatewaysLoaded: 'gateways/gatewaysLoaded'
            }),
            gateway() {
                return this.gatewayList.find(i => i._id === this.$route.params.id);
            },
        },
        async mounted() {
            this.fetchGateways();
        },
        beforeRouteLeave(to, from, next) {
            if(JSON.stringify(utils.normalizeBeforeSend(this.$refs.gateEditor.gateway)) === JSON.stringify(utils.normalizeBeforeSend(this.gateway))) {
                next();
            }else{
                let confirmation = confirm('У вас есть не сохранненные изменения. Продолжить?');
                if(confirmation) next();
            }
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
                deleteGateway: 'gateways/deleteGateway',
                updateGateway: 'gateways/updateGateway'
            }),

            async onInput(event) {
                switch (event.type) {
                    case 'save':
                        await this.tryUpdate(event.data);
                        break;
                    case 'cancel':
                        this.$router.push('/gateways');
                        break;
                    case 'delete':
                        await this.tryDelete();
                        break;
                    case 'checkConnection':
                        await this.checkConnection();
                        break;
                }
            },
            async tryUpdate(data) {
                try {
                    this.processing = true;
                    await this.updateGateway({id: this.$route.params.id, options: utils.normalizeBeforeSend(data)});
                    this.$router.push('/gateways')
                } catch (e) {
                    this.$emit('error', e);
                    this.$vuetify.goTo(0);
                    this.alert.shown = true;
                    this.alert.text = e.error.status === 405 ? 'неправильный ввод' : `код ${e.error.status}`; //Перенести в отдельны обработчик ошибок, единый для всех;
                }
                this.processing = false;
            },
            async tryDelete() {
                try {
                    this.processing = true;
                    await this.deleteGateway(this.$route.params.id);
                    this.$router.push('/gateways')
                } catch (e) {
                    this.$emit('error', e);
                    this.$vuetify.goTo(0);
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
                    switch (e.type) {
                        case 'response':
                            this.checkResult.status = e.error.status;
                            break;
                        default:
                            this.checkResult.status = 'проблемы с подключением, проверьте интернет';
                            break;
                    }
                }finally {
                    this.checkResult.loading = false;
                }
            }
        }
    }
</script>
