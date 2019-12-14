<template>
    <v-form ref="gateway">
        <div class="fields mt-2">
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Название шлюза"
                        required
                        :rules="rules.nameRules"
                        v-model="gateway.name">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-select
                        :items="dataTypesItems"
                        label="Тип данных"
                        v-model="gateway.dataType">
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-checkbox label="Используется сжатие gzip" v-model="gateway.gzip"/>
                </v-col>
                <v-col cols="12">
                    <v-select
                        :items="methodsTypesItems"
                        label="Метод HTTP"
                        v-model="gateway.httpMethod">
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Основной URL API"
                        v-model="gateway.apiUrl">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения страны события"
                        label="Страна импортируемых событий"
                        persistent-hint
                        v-model="gateway.apiParamsCountry">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения города события"
                        label="Город импортируемых событий"
                        persistent-hint
                        v-model="gateway.apiParamsCity">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения места события"
                        label="Местро импортируемых событий"
                        persistent-hint
                        v-model="gateway.apiParamsPlace">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения языковой версии"
                        label="Языковая версия"
                        persistent-hint
                        v-model="gateway.apiParamsLanguage">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения валюты"
                        label="Валюта"
                        persistent-hint
                        v-model="gateway.apiParamsCurrency">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="URL с параметрами выборки"
                        no-resize
                        v-model="gateway.apiParamsUrl">
                    </v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-select
                        :items="authTypesItems"
                        label="Способ авторизации"
                        v-model="gateway.apiParamsAuthType">
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Логин(если есть)"
                        v-model="gateway.apiParamsAuthLogin">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Пароль (если есть)"
                        v-model="gateway.apiParamsAuthPassword">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Токен"
                        v-model="gateway.apiParamsAuthToken">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn
                        @click="checkConnection"
                        class="text-capitalize font-weight-regular"
                        color="green"
                        dark
                        large
                        >
                        <v-progress-circular
                            v-if="checkResult.loading"
                            indeterminate
                            color="white"
                            class="mr-2"
                        ></v-progress-circular>
                        Проверить подключение
                    </v-btn>
                    <span>
                        <span v-if="checkResult.error === false && checkResult.status !== ''" class="status ml-4 green--text font-weight-bold">Ок! Код: {{checkResult.status}}</span>
                        <span v-else-if="checkResult.error === true" class="status ml-4 red--text font-weight-bold">Ошибка! Код: {{checkResult.status}}</span>
                    </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        @click="saveGateway"
                        class="text-capitalize font-weight-regular"
                        color="primary"
                        :disabled="disabled"
                        large>Сохранить
                    </v-btn>
                    <v-btn
                        @click="cancelEdit"
                        class="text-capitalize font-weight-regular"
                        color="primary"
                        large
                        :disabled="disabled"
                        outlined>Отменить
                    </v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn
                        @click="deleteGateway"
                        class="text-capitalize font-weight-regular"
                        color="red"
                        large
                        v-if="!noDelete"
                        :disabled="disabled"
                        outlined>Удалить
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-form>
</template>

<script>
    export default {
        name: "GatewayEdit",
        props: {
            gatewayObject: {
                type: Object,
            },
            noDelete: {
                type: Boolean
            },
            disabled: {
                type: Boolean,
                default: false
            },
            checkResult: {
                type: Object,
                default() {
                    return {
                        loading: false,
                        status: '',
                        error: false
                    }
                }
            }
        },
        data() {
            return {
                gatewayForm: true,
                methodsTypesItems: [
                    {text: 'GET', value: 'get'},
                    {text: 'POST', value: 'post'},
                    {text: 'PULL', value: 'pull'},
                    {text: 'Delete', value: 'delete'}
                ],
                authTypesItems: [
                    'OAuth'
                ],
                dataTypesItems: [
                    {text: 'JSON', value: 'json'},
                    {text: 'CSV', value: 'csv'},
                    {text: 'XML', value: 'xml'}
                ],
                rules: {
                    nameRules: [
                        v => !!v || 'Данное поле обязательно',
                    ]
                },
                gateway: {
                    name: '',
                    dataType: 'json',
                    gzip: false,
                    httpMethod: 'get',
                    apiUrl: '',
                    apiParamsCountry: '',
                    apiParamsCity: '',
                    apiParamsPlace: '',
                    apiParamsLanguage: '',
                    apiParamsCurrency: '',
                    apiParamsUrl: '',
                    apiParamsAuthType: 'OAuth',
                    apiParamsAuthLogin: '',
                    apiParamsAuthPassword: '',
                    apiParamsAuthToken: '',
                    }
            }
        },
        computed: {},
        watch: {
            gatewayObject(val, oldVal) {
                if (val !== undefined && val.name !== undefined) {
                    Object.assign(this.gateway, val);
                    this.gateway.gzip = this.gateway.gzip === 'true';
                }
            }
        },
        mounted() {
            if (this.gatewayObject !== undefined && this.gatewayObject !== null) {
                Object.assign(this.gateway, this.gatewayObject);
                this.gateway.gzip = this.gateway.gzip === 'true';
            }
        },
        methods: {
            saveGateway() {
                if (this.$refs.gateway.validate()) {
                    console.log('FROM IS VALID');
                    this.$emit('input', {type: 'save', data: this.gateway});
                } else {
                    this.$vuetify.goTo(0);
                }
            },
            deleteGateway() {
                this.$emit('input', {type: 'delete', data: this.gateway});
            },
            cancelEdit() {
                this.$emit('input', {type: 'cancel', data: this.gateway});
            },
            checkConnection() {
                this.$emit('input', {type: 'checkConnection', data: this.gateway});
            }
        },
    }

</script>

<style scoped>

</style>
