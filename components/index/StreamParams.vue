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

        <div class="description mb-2">
            <h3 class="black--text">
                Дополнительные настройки
            </h3>
        </div>
        <v-col class="additional-setting" cols="12"> <!--DopNastr-->
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
                        v-model="fdata.fixies.venueCountry.value"
                        label="Страна импортируемых событий">
                    </v-text-field>
                    <v-switch class="ma-0" label="Проставлят эту страну в случае отсутствия данных о стране"
                              v-model="fdata.fixies.venueCountry.autofix"></v-switch>
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
            <h3 class="black--text">
                Данные для обновления
            </h3>
        </div>
        <v-col cols="12">
            <v-checkbox v-for="val in fdata.autoUpdateFields"
                        :key="val.key"
                        :label="selectItems.updateDataFieldNames[val.key]"
                        v-model="val.value"
                        class="mt-0">
            </v-checkbox>
        </v-col>

        <div class="description mb-3">
            <h3 class="black--text">
                Логика работы и обработка конфликтов
            </h3>
        </div>

        <v-col class="actions-block pa-5"  cols="11">
            <h3>
                Событие не доступно у источника
            </h3>
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
            <p style="width: 70%">По умолчанию, не доступное событие проверятеся на дубли в другом источнике и меняется ссылка партнёра, но
                в случае отсутствия дубля или доступности у дубля, событие остаётся на сайте, но вместо возможности
                купить появляется пометка, что билет на это событие купить нельзя.</p>
            <p class="mb-0">Либо можно задать сценарий обработки</p>
            <v-checkbox class="mt-0" label="Использовать кастомный сценарий вместо настройки по умолчанию"></v-checkbox>

            <div v-for="(item, id) in fdata.actions.noAccessEvents">
                <v-row>
                    <v-col cols="4">
                        <v-select
                            :items="selectItems.customNoAccessFields"
                            v-model="fdata.actions.noAccessEvents[id].key"
                            label="Действие">
                        </v-select>
                    </v-col>

                    <v-btn class="mt-2" icon v-if="id!==0" @click="fdata.actions.noAccessEvents.splice(id,1)">
                        <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>

                    <v-col cols="4" v-if="selectItems.customNoAccessFields.find(x=>x.value===item.key)['input']===true">
                        <v-text-field
                            :items="selectItems.customNoAccessFields"
                            v-model="fdata.actions.noAccessEvents[id].value"
                            label="Параметры">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-icon class="arrow-down mb-4" v-if="fdata.actions.noAccessEvents.length-1 !== id" >mdi-arrow-down-bold-circle-outline</v-icon>
            </div>
            <v-btn @click="fdata.actions.noAccessEvents.push({key: 'removeFromSite', value: ''})">
                <v-icon>mdi-plus-circle-outline</v-icon>
                <span> Добавить</span>
            </v-btn>
        </v-col>
        <v-col class="actions-block pa-5"  cols="11">
            <h3>
                Проверка на дубли и логика обработки
            </h3>
            <p style="width: 70%">По умолчанию, если найден дубль, то событие сгружается на склад и идёт уведомление, даже если поток отображает событие сразу на сайте.</p>
            <p class="mb-0">Либо можно задать сценарий обработки</p>
            <v-checkbox class="mt-0" label="Использовать кастомный сценарий вместо настройки по умолчанию"></v-checkbox>

            <div v-for="(item, id) in fdata.actions.noAccessEvents">
                <v-row>
                    <v-col cols="4">
                        <v-select
                            :items="selectItems.customNoAccessFields"
                            v-model="fdata.actions.noAccessEvents[id].key"
                            label="Действие">
                        </v-select>
                    </v-col>

                    <v-btn class="mt-2" icon v-if="id!==0" @click="fdata.actions.noAccessEvents.splice(id,1)">
                        <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>

                    <v-col cols="4" v-if="selectItems.customNoAccessFields.find(x=>x.value===item.key)['input']===true">
                        <v-text-field
                            :items="selectItems.customNoAccessFields"
                            v-model="fdata.actions.noAccessEvents[id].value"
                            label="Параметры">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-icon class="arrow-down mb-4" v-if="fdata.actions.noAccessEvents.length-1 !== id" >mdi-arrow-down-bold-circle-outline</v-icon>
            </div>
            <v-btn @click="fdata.actions.noAccessEvents.push({key: 'removeFromSite', value: ''})">
                <v-icon>mdi-plus-circle-outline</v-icon>
                <span> Добавить</span>
            </v-btn>
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
                    updateDataFieldNames: {
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
                    customNoAccessFields: [
                        {value: "removeFromSite", text: "Убрать с сайта", input: false},
                        {value: "pushNotification", text: "Запушить уведомление на склад", input: true},
                        {value: "sendEmail", text: "Отправить уведомление на почту", input: true},
                        {value: "setCanceled", text: "Вывести сообщение на сайт, что событие отменено", input: true},
                        {value: "setUnavailable",text: "Вывести сообщение на сайт, что событие не доступно к покупке",input: true},
                        {value: "setCustomMessage", text: "Вывести кастомное сообщение на сайт", input: true},
                        {value: "checkDuplicateAndChangeLink", text: "Проверить доступность дубля другого источника и поменять ссылку", input: true},
                    ],
                    customDuplicateFields:[
                        {value: "ifLarger", text: "Если найденный дубль более наполненный, наполнить наше событие его данными", input: false},
                        {value: "ifLesser", text: "Если найденный дубль менее заполненный, насыщаем его нашими данными", input: true},
                        {value: "setFromStreamInsteadOfDuplicate", text: "Выставить событие из этого потока, вместо дубля", input: true},
                        {value: "setFromStreamInsteadOfDuplicateIfNotOnSite", text: "Выставить событие из этого потока, вместо дубля, если дубль не на сайте", input: true},
                        {value: "keepInWarehouse",text: "Оставить найденное событие на складе с пометкой \"Дубль\"",input: true},
                        {value: "changeLinkIfLargerFee", text: "Если комиссия источника потока больше, заменить ссылку", input: true},
                    ]
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
                        noTagEvents: "none",
                        useCustomAccessEvents: false, //Not included in backend model but appears in UI design
                        noAccessEvents: [
                            {"key": "removeFromSite"},
                            {"key": "removeFromSite", "value": ""}
                        ],
                        useCustomDuplicateEvents: false,//Not included in backend model but appears in UI design
                        dublicateEvents: [
                            {"key": "removeFromSite"},
                            {"key": "removeFromSite", "value": ""}
                        ],
                    },
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
<style  scoped>
    .arrow-down {
        margin: auto;
        width: 30%;
    }
    .additional-setting > .row{
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .actions-block {
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>
