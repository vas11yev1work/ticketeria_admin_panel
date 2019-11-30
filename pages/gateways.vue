<template>
    <div class="gateways-page">
        <v-container fluid>
            <div class="title-wrap">
                <h2>Настройка шлюзов</h2>
                <span>Обязательные параметры</span>
            </div>
<!--            <v-row>-->
<!--                <v-col cols="12" sm="6">-->
<!--                    <v-text-field outlined label="Название шлюза" v-model="gateway" dense></v-text-field>-->
<!--                    <v-select outlined label="Тип данных" v-model="dataType" :items="dataTypesItems" dense></v-select>-->
<!--                    <v-checkbox v-model="gzip" label="Используется сжатие gzip" color="primary"></v-checkbox>-->
<!--                    <v-select outlined label="Метод HTTP" v-model="method" :items="methodsTypes" dense></v-select>-->
<!--                </v-col>-->
<!--            </v-row>-->
<!--            <v-row>-->
<!--                <v-col cols="12" sm="6">-->
<!--                    <v-text-field outlined label="Название шлюза" v-model="gateway" dense></v-text-field>-->
<!--                </v-col>-->
<!--            </v-row>-->
<!--            <v-row align="d-flex align-center">-->
<!--                <v-col cols="12" sm="6">-->
<!--                    <v-select outlined label="Тип данных" v-model="dataType" :items="dataTypesItems" dense></v-select>-->
<!--                </v-col>-->
<!--                <v-col cols="12" sm="6">-->
<!--                    <v-checkbox v-model="gzip" label="Используется сжатие gzip" color="primary"></v-checkbox>-->
<!--                </v-col>-->
<!--            </v-row>-->
            <v-text-field outlined label="Название шлюза" v-model="gateway" height="20"></v-text-field>
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
                methodsTypes: [
                    'GET',
                    'POST',
                    'PULL',
                    'DELETE'
                ]
            }
        }
    }
</script>
