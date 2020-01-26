<template>
    <v-row>
        <v-col cols="12">
            <v-text-field
                v-model="fdata.name"
                label="Название потока">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="8">
                    <v-select
                        :items="gatewaysItems"
                        label="Шлюз">
                    </v-select>
                </v-col>
                <v-col cols="4" class="mt-4">
                    <nuxt-link to="/gateways">Управлять шлюзами</nuxt-link>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="0">
                    <v-switch label="Расписание запуска" v-model="fdata.isPeriodical"></v-switch>
                </v-col>
            </v-row>
            <v-row v-if="fdata.isPeriodical">
                <v-col cols="0">
                    <v-select
                        :items="selectItems.periodicity"
                        v-model="fdata.periodicity"
                        label="Переодичность запуска">
                    </v-select>
                    <v-select
                        :items="selectItems.timeZone"
                        v-model="fdata.timeZone"
                        label="Часовой пояс">
                    </v-select>
                    <v-row v-for="(time, id) in fdata.times">
                        <v-col cols="1">
                            <v-select
                                :items="selectItems.time.hours"
                                v-model="time.hours"
                                label="Часы">
                            </v-select>
                        </v-col>
                        <v-col cols="1">
                            <v-select
                                :items="selectItems.time.minutes"
                                v-model="time.minutes"
                                label="Минуты">
                            </v-select>
                        </v-col>
                        <v-col cols="1" v-if="id!==0">
                            <v-btn small @click="removeTime(id)">X</v-btn>
                        </v-col>
                    </v-row>
                    <v-btn @click="fdata.times.push({hours:'0', minutes:'0'})">Добавить</v-btn>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="0">
                    <v-switch label="Отображать эвенты сразу на сайте" v-model="fdata.showEventDirectly"></v-switch>
                </v-col>
            </v-row>
        </v-col>

        <div class="description">
            <p class="black--text">
                Дополнительные настройки
            </p>
        </div>
        <v-col cols="12"> <!--DopNastr-->
            <v-row>
                <v-col cols="0">
                    <v-switch label="Проверить дубли в других источниках и проставить недостающие город или место"
                              v-model="fdata.fixCities"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="0">
                    <v-text-field
                        v-model="fdata.fixies.venueCity.value"
                        label="Город импортируемых событий">
                    </v-text-field>
                    <v-switch class="ma-0" label="Проставлять этот город в случае отсутствия данных о городе"
                              v-model="fdata.fixies.venueCity.autofix"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="0">
                    <v-text-field
                        v-model="fdata.fixies.venueName.value"
                        label="Место импортируемых событий">
                    </v-text-field>
                    <v-switch class="ma-0" label="Проставлять это место, в случае отсутствия данных о месте"
                              v-model="fdata.fixies.venueName.autofix"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="0">
                    <v-text-field
                        v-model="fdata.fixies.venueCity.value"
                        label="Страна импортируемых событий">
                    </v-text-field>
                    <v-switch class="ma-0" label="Проставлят эту страну в случае отсутствия данных о стране"
                              v-model="fdata.fixies.venueCity.autofix"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="0">
                    <v-text-field
                        v-model="fdata.fixies.currency.value"
                        label="Валюта импортируемых событий">
                    </v-text-field>
                    <v-switch class="ma-0" label="Проставлять эту валюту в случае отсутствия данных о валюте"
                              v-model="fdata.fixies.currency.autofix"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="0">
                    <v-select
                        :items="selectItems.timeZone"
                        v-model="fdata.fixies.timezone.value"
                        label="Часовой пояс импортируемых событий">
                    </v-select>
                    <v-switch class="ma-0"
                              label="Проставлять этот часовой пояс в случае отсутствия данных о часовом поясе"
                              v-model="fdata.fixies.timezone.autofix"></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="0">
                    <v-select
                        :items="selectItems.timeZone"
                        v-model="fdata.fixies.timeFormat.value"
                        label="Формат даты и времени событий">
                    </v-select>
                    <v-switch class="ma-0" label="Преобразовать все эвенты в выбранный формат"
                              v-model="fdata.fixies.timeFormat.autofix"></v-switch>
                </v-col>
            </v-row>
        </v-col>

        <div class="description">
            <p class="black--text">
                Данные для обновления
            </p>
        </div>
        <v-col cols="12">
            <v-checkbox v-for="val in fdata.autoUpdateFields"
                        :key="val.key"
                        :label="selectItems.fieldNames[val.key]"
                        v-model="val.value">
            </v-checkbox>
        </v-col>

        <div class="description">
            <p class="black--text">
                Логика работы и обработка конфликтов
            </p>
        </div>
        <v-col cols="12">
            <v-radio-group v-model="fdata.actions.noTagEvents">
                <v-row>
                    <v-col cols="0">
                        <v-radio label="Оставить на складе с уведомлением"
                                 value="none">
                        </v-radio>
                    </v-col>
                    <v-col cols="0">
                        <v-radio label="Сгрузить на сайт с тегом &quot;Другое&quot;"
                                 value="setOthers">
                        </v-radio>
                    </v-col>
                </v-row>
            </v-radio-group>
        </v-col>
    </v-row>
</template>

<script>
    import {timezonesList} from '~/utils/data'

    export default {
        props: {
            gateways: {
                type: Array
            }
        },
        data() {
            return {
                selectItems: {
                    periodicity: [
                        {text: 'Ежеднвено', value: 'daily'}
                    ],
                    timeZone: timezonesList,
                    time: {
                        hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                        minutes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
                    },
                    fieldNames: {
                        "availability": "Доступность",
                        "description": "Обновлять описание - текстовую часть",
                        "images": "Обновлять описание - изображения",
                        "startAt": "Обновлять дату и время события, в случае изменения сделать пометку на сайте",
                        "venue": "Обновлять место проведения",
                        "schedule": "Обновлять расписание",
                        "price": "Обновлять цены",
                        "seo": "Обновлять SEO-параметры {title, description, h1}",
                        "name": "Обновлять название"
                    },
                },
                workingTime: {
                    shown: true
                },
                fdata: {
                    name: '1',
                    gatewayId: '',
                    isPeriodical: false,
                    periodicity: '',
                    timeZone: '',
                    times: [{hours: '0', minutes: '0'}],
                    showEventDirectly: true,
                    fixCities: true,
                    fixies: { //Should be converted to array in send Method
                        venueCity: {autofix: false, value: ''},
                        venueName: {autofix: false, value: ''},
                        venueCountry: {autofix: false, value: ''},
                        currency: {autofix: false, value: ''},
                        timezone: {autofix: false, value: ''},
                        timeFormat: {autofix: false, value: ''}, //Not included in backend model but appears in UI design
                    },
                    autoUpdateFields: [
                        {"key": "availability", "value": true},
                        {"key": "description", "value": true},
                        {"key": "images", "value": true},
                        {"key": "startAt", "value": true},
                        {"key": "venue", "value": true},
                        {"key": "schedule", "value": true},
                        {"key": "price", "value": true},
                        {"key": "seo", "value": true},
                        {"key": "name", "value": true}
                    ],
                    actions: {
                        noTagEvents: "none"
                    }
                },

            }
        },
        computed: {
            gatewaysItems() {
                return this.gateways.map((val) => {
                    return {text: val.name, value: val._id}
                })
            }
        },
        methods: {
            removeTime(id) {
                this.fdata.times.splice(id, 1)
            }
        },
    }
</script>

<style>
    .col {
        padding-top: 0;
        padding-bottom: 0;
    }

</style>
<style scoped>

</style>
