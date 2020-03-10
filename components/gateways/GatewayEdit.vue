<template>
    <v-form ref="gateway">
        <div class="fields mt-2">
            <div class="additional-setting">
                <v-row>
                    <v-col cols="5">
                        <v-text-field
                            outlined
                            label="Название шлюза"
                            required
                            :rules="rules.nameRules"
                            v-model="gateway.name">
                        </v-text-field>
                        <p style="transform: translateY(-26px); font-size: 14px">Создает одноименную полку на складе</p>
                    </v-col>
                </v-row>
                <v-row class="">
                    <v-col cols="5">
                        <v-select
                            outlined
                            :items="dataTypesItems"
                            label="Тип данных"
                            v-model="gateway.dataType">
                        </v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-checkbox label="Используется сжатие gzip" v-model="gateway.gzip"/>
                    </v-col>
                    <v-col cols="5">
                        <v-select
                            outlined
                            :items="methodsTypesItems"
                            label="Метод HTTP"
                            v-model="gateway.httpMethod">
                        </v-select>
                    </v-col>
                </v-row>
                <v-row class="">
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            label="Основной URL API"
                            v-model="gateway.apiUrl">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="">
                    <v-col cols="5">
                        <v-text-field
                            outlined
                            hint="Введите параметр API для определения страны события"
                            label="Страна импортируемых событий"
                            persistent-hint
                            class="mt-4"
                            v-model="gateway.apiParamsCountry">
                        </v-text-field>
                        <v-text-field
                            outlined
                            hint="Введите параметр API для определения города события"
                            label="Город импортируемых событий"
                            persistent-hint
                            class="mt-8"
                            v-model="gateway.apiParamsCity">
                        </v-text-field>
                        <v-text-field
                            outlined
                            hint="Введите параметр API для определения места события"
                            label="Местро импортируемых событий"
                            persistent-hint
                            class="mt-8"
                            v-model="gateway.apiParamsPlace">
                        </v-text-field>
                        <v-text-field
                            outlined
                            hint="Введите параметр API для определения языковой версии"
                            label="Языковая версия"
                            persistent-hint
                            class="mt-8"
                            v-model="gateway.apiParamsLanguage">
                        </v-text-field>
                        <v-text-field
                            outlined
                            hint="Введите параметр API для определения валюты"
                            label="Валюта"
                            persistent-hint
                            class="mt-8"
                            v-model="gateway.apiParamsCurrency">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-8">
                        <v-textarea
                            outlined
                            label="URL с параметрами выборки"
                            no-resize
                            outlined
                            v-model="gateway.apiParamsUrl">
                        </v-textarea>
                    </v-col>
                    <v-col cols="5">
                        <v-select
                            outlined
                            :items="authTypesItems"
                            label="Способ авторизации"
                            v-model="gateway.apiParamsAuthType">
                        </v-select>
                        <v-text-field
                            outlined
                            label="Логин(если есть)"
                            v-model="gateway.apiParamsAuthLogin">
                        </v-text-field>
                        <v-text-field
                            outlined
                            label="Пароль (если есть)"
                            v-model="gateway.apiParamsAuthPassword">
                        </v-text-field>
                        <v-text-field
                            outlined
                            label="Токен"
                            v-model="gateway.apiParamsAuthToken">
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
            <v-row class="mb-4 mt-4">
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
                        />
                        Проверить подключение
                    </v-btn>
                    <span>
                        <span v-if="checkResult.error === false && checkResult.status !== ''" class="status ml-4 green--text font-weight-bold">Ок! Код: {{checkResult.status}}</span>
                        <span v-else-if="checkResult.error === true" class="status ml-4 red--text font-weight-bold">Ошибка! Код: {{checkResult.status}} <a href="#">Скачать log.txt</a></span>
                    </span>
                </v-col>
                <v-col cols="12" class="mt-4">
                    <v-btn
                        class="text-capitalize font-weight-regular"
                        color="green"
                        dark
                        large
                    >
                        Проверить подключение
                    </v-btn>
                    <span>
                        <span class="status ml-4 red--text font-weight-bold">Ошибка! Код: 500 <a href="#">Скачать log.txt</a></span>
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
                        v => !!v || '',
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
