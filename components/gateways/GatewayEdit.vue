<template>
    <v-form lazy-validation ref="gateway" v-model="gatewayForm">
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
                    <v-checkbox label="Используется сжатие gzip" v-model="gateway.gzip"></v-checkbox>
                </v-col>
                <v-col cols="12">
                    <v-select
                        :items="methodsTypesItems"
                        label="Метод HTTP"
                        v-model="gateway.method">
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Основной URL API"
                        required
                        :rules="rules.mainURLRules"
                        v-model="gateway.mainURL">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения страны события"
                        label="Страна импортируемых событий"
                        persistent-hint
                        required
                        :rules="rules.importCountryRules"
                        v-model="gateway.importCountry">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения города события"
                        label="Город импортируемых событий"
                        persistent-hint
                        required
                        :rules="rules.importCityRules"
                        v-model="gateway.importCity">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения места события"
                        label="Местро импортируемых событий"
                        persistent-hint
                        required
                        :rules="rules.importPlaceRules"
                        v-model="gateway.importPlace">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        hint="Введите параметр API для определения языковой версии"
                        label="Языковая версия"
                        persistent-hint
                        required
                        :rules="rules.languageVersionRules"
                        v-model="gateway.languageVersion">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="URL с параметрами выборки"
                        no-resize
                        required
                        :rules="rules.optionURLRules"
                        v-model="gateway.optionURL">
                    </v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-select
                        :items="authTypesItems"
                        label="Способ авторизации"
                        v-model="gateway.authType">
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Логин(если есть)"
                        v-model="gateway.login">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Пароль (если есть)"
                        v-model="gateway.password">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Токен"
                        required
                        :rules="rules.tokenRules"
                        v-model="gateway.token">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="!gateway.connectingError">
                <v-col cols="12">
                    <v-btn
                        class="text-capitalize font-weight-regular"
                        color="green"
                        dark
                        large>Проверить подключение
                    </v-btn>
                    <span class="status ml-4 green--text font-weight-bold">ОК</span>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12">
                    <v-btn
                        :loading="gateway.connectingLoading"
                        class="text-capitalize font-weight-regular"
                        color="primary"
                        large
                        outlined>Проверить подключение
                    </v-btn>
                    <span class="status ml-4 red--text font-weight-bold">ERROR</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        @click="saveGateway"
                        class="text-capitalize font-weight-regular"
                        color="primary"
                        large>Сохранить
                    </v-btn>
                    <v-btn
                        class="text-capitalize font-weight-regular"
                        color="primary"
                        large
                        outlined>Отменить
                    </v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn
                        class="text-capitalize font-weight-regular"
                        color="red"
                        large
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
        props:{
            gatewayObject: {
                type: Object,
            }
        },
        data() {
            return {
                gatewayForm: true,
                methodsTypesItems: [
                    'GET',
                    'POST',
                    'PULL',
                    'DELETE'
                ],
                authTypesItems: [
                    'OAuth',
                    'OAuth2'
                ],
                dataTypesItems: [
                    'JSON',
                    'CSV',
                    'XML'
                ],
                rules: {
                    nameRules: [
                        v => !!v || 'Данное поле обязательно',
                    ],
                    mainURLRules: [
                        v => !!v || 'Данное поля обязательно',
                    ],
                    importCountryRules: [
                        v => !!v || 'Данное поля обязательно',
                    ],
                    importCityRules: [
                        v => !!v || 'Данное поля обязательно',
                    ],
                    importPlaceRules: [
                        v => !!v || 'Данное поля обязательно',
                    ],
                    languageVersionRules: [
                        v => !!v || 'Данное поля обязательно',
                    ],
                    optionURLRules: [
                        v => !!v || 'Данное поля обязательно',
                    ],
                    tokenRules: [
                        v => !!v || 'Данное поля обязательно',
                    ]
                },
                gateway: {
                    name: '',
                    dataType: 'JSON',
                    gzip: false,
                    method: 'GET',
                    mainURL: '',
                    importCountry: '',
                    importCity: '',
                    importPlace: '',
                    languageVersion: '',
                    optionURL: '',
                    authType: 'OAuth',
                    login: '',
                    password: '',
                    token: '',
                    connectingError: false,
                    connectingLoading: true,
                }
            }
        },
        watch:{
            gatewayObject: function (val, oldVal) {
                if(val !== undefined && val.name !== undefined){
                    Object.assign(this.gateway, val);
                }
            }
        },
        mounted(){
            if(this.gatewayObject !== undefined && this.gatewayObject !== undefined){
                Object.assign(this.gateway, this.gatewayObject);
            }
        },
        methods:{
            saveGateway(){
                if (this.$refs.gateway.validate()) {
                    console.log('FROM IS VALID')
                }
            }
        },
    }

</script>

<style scoped>

</style>
