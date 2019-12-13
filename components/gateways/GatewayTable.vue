<template>
    <v-simple-table>
        <thead>
            <tr>
                <th class="text-left">Имя</th>
                <th class="text-left">Тип данных</th>
                <th class="text-left">Страна</th>
                <th class="text-left">Город</th>
                <th class="text-left">Место</th>
            </tr>
        </thead>
        <tbody>
            <tr style="cursor: pointer;" v-for="gateway in gateways" :key="gateway.id" @click="redirectToGateway(gateway._id)">
                <td>{{ gateway.name }}</td>
                <td>{{ gateway.dataType }}</td>
                <td>{{ gateway.apiParamsCountry }}</td>
                <td>{{ gateway.apiParamsCity }}</td>
                <td>{{ gateway.apiParamsPlace }}</td>
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    export default {
        props: {
            gateways: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        methods: {
            redirectToGateway(id){
                this.$router.push({ name: 'gateways-id', params: { id } })
            }
        }
    }
</script>
