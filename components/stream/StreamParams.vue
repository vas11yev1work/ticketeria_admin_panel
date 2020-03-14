<template>
    <v-row class="mt-12">
        <v-col cols="12">
            <div class="wrap" style="display:flex;">
                <h4
                    style="font-weight: 400;
                                            min-width: 190px;
                                            max-width: 190px" class="mr-6"
                >Название потока</h4>
                <div class="act" style="width: 100%;">
                    <v-col cols="6">
                        <v-row>
                            <v-text-field
                                v-model="fdata.name"
                                required
                                outlined
                                :rules="rules.nameRules"
                                label="Название потока"
                                :persistent-hint="true"
                            >
                            </v-text-field>
                        </v-row>
                    </v-col>
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <div class="wrap" style="display:flex;">
                <h4 style="font-weight: 400;
                                            min-width: 190px;
                                            max-width: 190px" class="mr-6"
                >Шлюз</h4>
                <div class="act" style="width: 100%; display:flex;">
                    <v-col cols="6" class="mb-10">
                        <v-row>
                            <v-select
                                outlined
                                :items="gatewaysItems"
                                v-model="fdata.gatewayId"
                                label="Шлюз">
                            </v-select>
                        </v-row>
                    </v-col>
                    <v-col cols="4" style="transform: translateY(13px)">
                        <nuxt-link to="/gateways" target="_blank">
                            <span style="font-size: 14px;">Управлять шлюзами</span>
                        </nuxt-link>
                    </v-col>
                </div>
            </div>
        </v-col>
        <v-col cols="11">
            <v-row>
                <v-col cols="0">
                    <v-checkbox label="Расписание запуска" v-model="fdata.isPeriodical"/>
                    <p>Если не задать расписание руками, то запуск потока будет выполняться 1 раз в день через 15 минут после запуска другого потока, если другого потока нет, то в 00:15 часов</p>
                </v-col>
            </v-row>
            <v-row v-if="fdata.isPeriodical">
                <v-col class="actions-block mb-12"  cols="0">
                    <v-row>
                        <v-col cols="6">
                            <v-select
                                outlined
                                :items="selectItems.periodicity"
                                v-model="fdata.periodicity"
                                label="Переодичность запуска">
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-select
                                outlined
                                :items="selectItems.timezoneList"
                                v-model="fdata.timeZone"
                                label="Часовой пояс">
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row v-for="(time, id) in fdata.times">
                        <v-col cols="2">
                            <v-select
                                outlined
                                :items="selectItems.time.hours"
                                v-model="time.hours"
                                label="Часы">
                            </v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                outlined
                                :items="selectItems.time.minutes"
                                v-model="time.minutes"
                                label="Минуты">
                            </v-select>
                        </v-col>
                            <v-btn class="mt-4" icon v-if="id!==0" @click="removeTime(id)"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
                    </v-row>
                    <a @click="fdata.times.push({hours:0, minutes:0})">Добавить еще одно время запуска</a>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="11" class="mb-12 mt-4">
            <v-row>
                <v-col cols="0">
                    <v-checkbox label="Отображать эвенты сразу на сайте" v-model="fdata.showEventDirectly"/>
                    <p>
                        Внимание, если вы создаёте поток впервые рекомендуется сначала грузить на склад, проверять менять настройки потока на отображение сразу на сайте.
                    </p>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="mb-4">
            <h2 class="black--text" style="font-weight: 500">
                Дополнительные настройки
            </h2>
        </v-col>
        <v-col class="additional-setting" cols="11"> <!--DopNastr-->
            <v-row class="pb-3 mb-4 pt-4">
                <v-col cols="0">
                    <div class="wrap" style="display:flex;">
                        <h4 style="white-space: nowrap; font-weight: 400; min-width: 190px; max-width: 190px" class="mr-6">Город и место в дублях <br>других источников</h4>
                        <div class="act">
                            <p>Если город или место не были получены из API или настроек потока, можно проверить дубли</p>
                            <v-checkbox
                                label="Проверить дубли в других источниках и проставить недостающие город или место"
                                v-model="fdata.fixCities"
                            />
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-for="(field, id) in fdata.fixies">
                <v-col cols="12">
                    <v-row v-if="selectItems.fixiesDataFields.find(x=>x.value===field.key).select !== true">
                        <v-col>
                            <div class="wrap" style="display:flex;">
                                <h4
                                    style="font-weight: 400;
                                            min-width: 190px;
                                            max-width: 190px" class="mr-6"
                                >{{ selectItems.fixiesDataFields.find(x=>x.value===field.key).text }}</h4>
                                <div class="act" style="width: 100%;">
                                    <v-col :cols="selectItems.fixiesDataFields.find(x=>x.value===field.key).cols" style="padding-right: 24px;">
                                        <v-row>
                                            <v-text-field
                                                outlined
                                                style="width: 100%;"
                                                v-model="fdata.fixies[id].value"
                                                :label="selectItems.fixiesDataFields.find(x=>x.value===field.key).text">
                                            </v-text-field>
                                        </v-row>
                                    </v-col>
                                    <div class="check" style="transform: translateY(-40px)">
                                        <v-checkbox :label="selectItems.fixiesDataFields.find(x=>x.value===field.key).checkboxText"
                                                    v-model="fdata.fixies[id].autofix"/>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col>
                            <div class="wrap" style="display:flex;">
                                <h4
                                    style="font-weight: 400;
                                            min-width: 190px;
                                            max-width: 190px" class="mr-6"
                                >{{ selectItems.fixiesDataFields.find(x=>x.value===field.key).text }}</h4>
                                <div class="act" style="width: 100%;">
                                    <v-col :cols="selectItems.fixiesDataFields.find(x=>x.value===field.key).cols" style="padding-right: 24px;">
<!--                                        <v-row>-->
<!--                                            <v-select-->
<!--                                                outlined-->
<!--                                                :items="selectItems.fixiesDataFields.find(x=>x.value===field.key).items"-->
<!--                                                v-model="fdata.fixies[id].value"-->
<!--                                                :label="selectItems.fixiesDataFields.find(x=>x.value===field.key).text">-->
<!--                                            </v-select>-->
<!--                                            <nuxt-link class="ml-4" style="display:block;" v-if="selectItems.fixiesDataFields.find(x=>x.value===field.key).link" to="/">Управление выражениями</nuxt-link>-->
<!--                                        </v-row>-->
                                        <v-row v-if="selectItems.fixiesDataFields.find(x=>x.value===field.key).link">
                                            <v-select
                                                style="max-width: 370px"
                                                outlined
                                                :items="selectItems.fixiesDataFields.find(x=>x.value===field.key).items"
                                                v-model="fdata.fixies[id].value"
                                                :label="selectItems.fixiesDataFields.find(x=>x.value===field.key).text">
                                            </v-select>
                                            <div style="transform: translateY(13px)">
                                                <nuxt-link class="ml-4" style="display:block;" to="/">
                                                    <span style="font-size: 14px;">Управление выражениями</span>
                                                </nuxt-link>
                                            </div>
                                        </v-row>
                                        <v-row v-else>
                                            <v-select
                                                outlined
                                                :items="selectItems.fixiesDataFields.find(x=>x.value===field.key).items"
                                                v-model="fdata.fixies[id].value"
                                                :label="selectItems.fixiesDataFields.find(x=>x.value===field.key).text">
                                            </v-select>
                                        </v-row>
                                    </v-col>
                                    <div class="check" style="transform: translateY(-40px)">
                                        <v-checkbox :label="selectItems.fixiesDataFields.find(x=>x.value===field.key).checkboxText"
                                                    v-model="fdata.fixies[id].autofix"/>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>

        <v-col class="description">
            <h2 class="black--text" style="font-weight: 500;">
                Данные для обновления
            </h2>
        </v-col>
        <v-col class="checkboxes mt-6 mb-4 ml-2" cols="11" style="transform: translateX(-10px)">
            <v-checkbox v-for="val in fdata.autoUpdateFields"
                        :key="val.key"
                        :label="selectItems.updateDataFieldNames[val.key]"
                        v-model="val.value"
                        class="mt-0">
            </v-checkbox>
        </v-col>

        <v-col class="description">
            <h2 class="black--text" style="font-weight: 500;">
                Логика работы и обработка конфликтов
            </h2>
        </v-col>

        <v-col class="actions-block pa-5 mt-8 mb-12"  cols="11">
            <h3>
                Не присвоился тег категории
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
            <p>Настройка игнорируется, если поток не отображает события сразу на сайте</p>
        </v-col>
        <v-col class="actions-block pa-5 mb-12"  cols="11">
            <h3 class="mb-4">
                Событие не доступно у источника
            </h3>
            <p style="width: 70%">По умолчанию, не доступное событие проверятеся на дубли в другом источнике и меняется ссылка партнёра, но
                в случае отсутствия дубля или доступности у дубля, событие остаётся на сайте, но вместо возможности
                купить появляется пометка, что билет на это событие купить нельзя.</p>
            <p class="mb-0">Либо можно задать сценарий обработки</p>
            <v-checkbox v-model="fdata.actions.useCustomAccessEvents" class="mt-0" label="Использовать кастомный сценарий вместо настройки по умолчанию"></v-checkbox>

            <div v-if="fdata.actions.useCustomAccessEvents">
                <div v-for="(item, id) in fdata.actions.noAccessEvents">
                    <v-row>
                        <v-col cols="4" style="display:flex;">
                            <span class="mr-4">{{id+1}}. </span>
                            <v-select
                                style="display: inline-block;"
                                outlined
                                :items="selectItems.customNoAccessFields"
                                v-model="fdata.actions.noAccessEvents[id].key"
                                label="Действие">
                            </v-select>
                        </v-col>
                        <div style="width: 30px;"></div>

                        <v-col cols="4" v-if="selectItems.customNoAccessFields.find(x=>x.value===item.key)['input']===true">
                            <v-text-field
                                outlined
                                :items="selectItems.customNoAccessFields"
                                v-model="fdata.actions.noAccessEvents[id].value"
                                label="Параметры">
                            </v-text-field>
                        </v-col>
                        <v-btn class="mt-2" icon v-if="id!==0" @click="fdata.actions.noAccessEvents.splice(id,1)">
                            <v-icon>mdi-minus-circle-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-icon class="arrow-down mb-4" v-if="fdata.actions.noAccessEvents.length-1 !== id" >mdi-arrow-down-bold-circle-outline</v-icon>
                </div>
                <a @click="fdata.actions.noAccessEvents.push({key: 'removeFromSite', value: ''})">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                    <span>Добавить шаг</span>
                </a>
            </div>
        </v-col>
        <v-col class="actions-block pa-5 mb-12"  cols="11">
            <h3 class="mb-4">
                Проверка на дубли и логика обработки
            </h3>
            <p style="width: 70%">По умолчанию, если найден дубль, то событие сгружается на склад и идёт уведомление, даже если поток отображает событие сразу на сайте.</p>
            <p class="mb-0">Либо можно задать сценарий обработки</p>
            <v-checkbox v-model="fdata.actions.useCustomDuplicateEvents" class="mt-0" label="Использовать кастомный сценарий вместо настройки по умолчанию"></v-checkbox>

            <div v-if="fdata.actions.useCustomDuplicateEvents">
                <div v-for="(item, id) in fdata.actions.dublicateEvents">
                    <v-row>
                        <v-col cols="4" style="display:flex;">
                            <span class="mr-4">{{id+1}}. </span>
                            <v-select
                                outlined
                                class="mr-4"
                                :items="selectItems.customDuplicateFields"
                                v-model="fdata.actions.dublicateEvents[id].key"
                                label="Действие">
                            </v-select>
                        </v-col>
                        <div style="width: 30px;"></div>

                        <v-col cols="2" v-if="(selectItems.customDuplicateFields.find(x=>x.value===item.key) !== undefined)&&(selectItems.customDuplicateFields.find(x=>x.value===item.key)['extendedInput'] === true)">
                            <v-select
                                outlined
                                :items="selectItems.inputConditions"
                                v-model="fdata.actions.dublicateEvents[id]['inputAction']"
                                label="Условие">
                            </v-select>
                        </v-col>

                        <v-col :cols="(selectItems.customDuplicateFields.find(x=>x.value===item.key) !== undefined)&&(selectItems.customDuplicateFields.find(x=>x.value===item.key)['extendedInput'] === true) ? 2 : 4"
                               v-if="(selectItems.customDuplicateFields.find(x=>x.value===item.key) !== undefined)&&(selectItems.customDuplicateFields.find(x=>x.value===item.key)['input'] === true)">
                            <v-text-field
                                outlined
                                :items="selectItems.customDuplicateFields"
                                v-model="fdata.actions.dublicateEvents[id].value">
                            </v-text-field>
                        </v-col>

                        <v-col cols="3" v-if="(selectItems.customDuplicateFields.find(x=>x.value===item.key) !== undefined)&&(selectItems.customDuplicateFields.find(x=>x.value===item.key)['extendedInput'] === true)">
                            <v-select
                                outlined
                                :items="selectItems.outputActions"
                                v-model="fdata.actions.dublicateEvents[id]['outputAction']"
                                label="Действие">
                            </v-select>
                        </v-col>
                        <v-btn class="mt-2" icon v-if="id!==0" @click="fdata.actions.dublicateEvents.splice(id,1)">
                            <v-icon>mdi-minus-circle-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-icon class="arrow-down mb-4" v-if="fdata.actions.dublicateEvents.length-1 !== id" >mdi-arrow-down-bold-circle-outline</v-icon>
                </div>
                <a @click="fdata.actions.dublicateEvents.push({key: 'removeFromSite', value: ''})">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                    <span>Добавить шаг</span>
                </a>
            </div>
        </v-col>
        <v-col class="actions-block pa-5 mb-12"  cols="11">
            <h3 class="mb-4">
                Прошедшие и старые события потока
            </h3>
            <p style="width: 70%">По умолчанию, если событие прошло, то оно остаётся на сайте, убирается кнопка Купить и уведомляется, что событие прошло.</p>
        </v-col>
        <v-col cols="12" class="description">
            <h2 class="black--text" style="font-weight: 500;">
                Уведомление
            </h2>
        </v-col>
        <v-col cols="6" class="mt-4">
            <v-text-field
                outlined
                v-model="fdata.sendNotificationTo"
                :persistent-hint="true"
                label="E-mail для уведомлений">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <p>
                Все уведомления будут отображаться в логе потока и на складе, если вы дополнительно хотите получать их на почту, то задайте её
            </p>
        </v-col>
    </v-row>
</template>

<script>
    import {timezonesList, dateTimeFormats} from '~/utils/data'

    export default {
        props: {
            gateways: {
                type: Array
            },
            streamData:{
                type: Object,
                default(){
                    return {
                        name: '',
                        gatewayId: '',
                        isPeriodical: false,
                        periodicity: '',
                        timeZone: '',
                        times: [{hours: '0', minutes: '0'}],
                        showEventDirectly: true,
                        fixCities: true,
                        fixies: [ //Should be converted to array in send Method
                            {"key": "venueCity", autofix: false, value: ''},
                            {"key": "venueName", autofix: false, value: ''},
                            {"key": "venueCountry", autofix: false, value: ''},
                            {"key": "currency", autofix: false, value: ''},
                            {"key": "timezone", autofix: false, value: ''},
                            {"key": "timeFormat", autofix: false, value: ''},
                        ],
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
                            ],
                            useCustomDuplicateEvents: false,//Not included in backend model but appears in UI design
                            dublicateEvents: [
                                {"key": "ifLarger"},
                            ],
                        },
                        sendNotificationTo: ""
                    }
                }
            }
        },
        data() {
            return {
                rules: {
                    nameRules: [
                        v => !!v || 'Данное поле обязательно',
                    ]
                },
                selectItems: {
                    periodicity: [
                        {text: '15 минут', value: '15m'},
                        {text: '30 минут', value: '30m'},
                        {text: '1 час', value: '1h'},
                        {text: '2 часа', value: '2h'},
                        {text: '3 часа', value: '3h'},
                        {text: 'Ежеднвено', value: 'daily'},
                        {text: 'Еженедельно', value: 'weekly'},
                    ],
                    time: {
                        hours: [
                            { value: 0, text: '00'},
                            { value: 1, text: '01'},
                            { value: 2, text: '02'},
                            { value: 3, text: '03'},
                            { value: 4, text: '04'},
                            { value: 5, text: '05'},
                            { value: 6, text: '06'},
                            { value: 7, text: '07'},
                            { value: 8, text: '08'},
                            { value: 9, text: '09'},
                            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                        minutes: [{ value: 0, text: '00'},
                            { value: 1, text: '01'},
                            { value: 2, text: '02'},
                            { value: 3, text: '03'},
                            { value: 4, text: '04'},
                            { value: 5, text: '05'},
                            { value: 6, text: '06'},
                            { value: 7, text: '07'},
                            { value: 8, text: '08'},
                            { value: 9, text: '09'}, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
                    },
                    timezoneList: timezonesList,
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
                    fixiesDataFields:[
                        {value: "venueCity", text: "Город импортируемых событий", checkboxText: "Проставлять этот город в случае отсутствия данных о городе", cols: 7},
                        {value: "venueName", text: "Место импортируемых событий", checkboxText: "Проставлять это место, в случае отсутствия данных о месте", cols: 7},
                        {value: "venueCountry", text: "Страна импортируемых событий", checkboxText: "Проставлять эту страну в случае отсутствия данных о стране", cols: 7},
                        {value: "currency", text: "Валюта импортируемых событий", checkboxText: "Проставлять эту валюту в случае отсутствия данных о валюте", cols: 7},
                        {value: "timezone", text: "Часовой пояс импортируемых событий", checkboxText: "Проставлять этот часовой пояс в случае отсутствия данных о часовом поясе", select: true, items: timezonesList, cols: 7},
                        {value: "timeFormat", text: "Формат даты и времени событий", checkboxText: "Преобразовать все эвенты в выбранный формат", select: true, items: dateTimeFormats, cols: 12, link: true},
                    ],
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
                        {value: "ifFee", text: "Если комиссия источника потока", input: true,extendedInput: true},
                    ],
                    inputConditions:[
                        "=",
                        ">",
                        "<"
                    ],
                    outputActions:[
                        {value: "replaceLink", text: "Заменить ссылку"},
                    ]
                },
                workingTime: {
                    shown: true
                },
                fdata: {
                    name: '',
                    gatewayId: '',
                    isPeriodical: false,
                    periodicity: '',
                    timeZone: '',
                    times: [{hours: '0', minutes: '0'}],
                    showEventDirectly: true,
                    fixCities: true,
                    fixies: [ //Should be converted to array in send Method
                        {"key": "venueCity", autofix: false, value: ''},
                        {"key": "venueName", autofix: false, value: ''},
                        {"key": "venueCountry", autofix: false, value: ''},
                        {"key": "currency", autofix: false, value: ''},
                        {"key": "timezone", autofix: false, value: ''},
                        {"key": "timeFormat", autofix: false, value: ''},
                    ],
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
                        ],
                        useCustomDuplicateEvents: false,//Not included in backend model but appears in UI design
                        dublicateEvents: [
                            {"key": "ifLarger"},
                        ],
                    },
                    sendNotificationTo: ""
                },

            }
        },
        watch:{
            fdata: {
                handler: function(newValue){
                    newValue.actions.dublicateEvents.forEach(item => {
                        let ev = this.selectItems.customDuplicateFields.find(x => x.value === item.key);
                        if(typeof ev !== 'undefined' && ev.extendedInput !== true){
                            if(item.outputAction !== undefined || item.inputAction !== undefined){
                                delete item.outputAction;
                                delete item.inputAction;
                            }

                        }
                        console.log(ev)
                    });
                    this.$emit('input',newValue)
                },
                deep: true
            },
            streamData:{
                handler: function(newValue){
                    if (newValue !== undefined && newValue.name !== undefined) {
                        this.fdata = JSON.parse(JSON.stringify(newValue));
                        //this.$set(this.fdata, newValue)
                    }
                },
                deep: true,
                immediate: true,
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
<style lang="scss" scoped>
    .arrow-down {
        margin: auto;
        width: 30%;
    }
</style>
