<template>
    <div class="gateways-page">
        <v-container>
            <v-row>
                <v-col class="col-12" lg="3">
                    <v-card class="mx-auto p-0 pt-2 pb-2">
                        <v-list>
                            <v-list-item link to="/">
                                <v-list-item-content>
                                    <span>Eventbrite</span>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item link to="/">
                                <v-list-item-content>
                                    <span>Eventbrite</span>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item link to="/">
                                <v-list-item-content>
                                    <span>Eventbrite</span>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item link to="/">
                                <v-list-item-content>
                                    <span>Eventbrite</span>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
<!--                        Не удалять, использовать как вариант с dropdown-->
<!--                        <v-menu offset-y>-->
<!--                            <template v-slot:activator="{ on }">-->
<!--                                <v-btn color="primary" dark v-on="on">Dropdown</v-btn>-->
<!--                            </template>-->
<!--                            <v-list>-->
<!--                                <v-list-item>-->
<!--                                    <v-list-item-title></v-list-item-title>-->
<!--                                </v-list-item>-->
<!--                            </v-list>-->
<!--                        </v-menu>-->
                    </v-card>
                </v-col>
                <v-col class="col-12" lg="9">
                    <div class="page-title-wrap">
                        <h1 class="headline font-weight-medium">Управление шлюзами</h1>
                        <span class="grey--text">Обязательные поля</span>
                    </div>
                    <div class="fields mt-2">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Название шлюза"
                                    v-model="gateway">
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    v-model="dataType"
                                    :items="dataTypesItems"
                                    label="Тип данных">
                                </v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-checkbox label="Используется сжатие gzip"></v-checkbox>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    v-model="method"
                                    :items="methodsTypesItems"
                                    label="Метод HTTP">
                                </v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Основной URL API"
                                    v-model="mainURL">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    persistent-hint
                                    hint="Введите параметр API для определения страны события"
                                    label="Страна импортируемых событий"
                                    v-model="importCountry">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    persistent-hint
                                    hint="Введите параметр API для определения города события"
                                    label="Город импортируемых событий"
                                    v-model="importCity">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    persistent-hint
                                    hint="Введите параметр API для определения места события"
                                    label="Местро импортируемых событий"
                                    v-model="importPlace">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    persistent-hint
                                    hint="Введите параметр API для определения языковой версии"
                                    label="Языковая версия"
                                    v-model="languageVersion">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="optionURL"
                                    label="URL с параметрами выборки"
                                    no-resize>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    v-model="authType"
                                    :items="authTypesItems"
                                    label="Метод HTTP">
                                </v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Логин(если есть)"
                                    v-model="login">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Пароль (если есть)"
                                    v-model="password">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Токен"
                                    v-model="token">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="!connectingError">
                            <v-col cols="12">
                                <v-btn
                                    class="text-capitalize font-weight-regular"
                                    large
                                    color="green"
                                    dark>Проверить подключение
                                </v-btn>
                                <span class="status ml-4 green--text font-weight-bold">ОК</span>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12">
                                <v-btn
                                    class="text-capitalize font-weight-regular"
                                    large
                                    color="primary"
                                    outlined
                                    :loading="connectingLoading">Проверить подключение
                                </v-btn>
                                <span class="status ml-4 red--text font-weight-bold">ERROR</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn
                                    class="text-capitalize font-weight-regular"
                                    large
                                    color="primary">Сохранить
                                </v-btn>
                                <v-btn
                                    class="text-capitalize font-weight-regular"
                                    large
                                    color="primary"
                                    outlined>Отменить
                                </v-btn>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <v-btn
                                    class="text-capitalize font-weight-regular"
                                    large
                                    color="red"
                                    outlined>Удалить
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                gateway: '',
                dataType: 'JSON',
                dataTypesItems: [
                    'JSON',
                    'CSV',
                    'XML'
                ],
                gzip: true,
                method: 'GET',
                methodsTypesItems: [
                    'GET',
                    'POST',
                    'PULL',
                    'DELETE'
                ],
                mainURL: '',
                importCountry: '',
                importCity: '',
                importPlace: '',
                languageVersion: '',
                optionURL: '',
                authType: 'OAuth',
                authTypesItems: [
                    'OAuth',
                    'OAuth2'
                ],
                login: '',
                password: '',
                token: '',
                connectingError: false,
                connectingLoading: true,
            }
        }
    }
</script>
