<template>
    <v-row>
        <v-col cols="12">
            <v-text-field
                label="Название потока">
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="8">
                    <v-select
                        :items="gateways"
                        label="Шлюз">
                    </v-select>
                </v-col>
                <v-col cols="4" class="mt-4">
                    <nuxt-link to="/gateways">Управлять шлюзами</nuxt-link>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            gateways: {
                type: Array
            }
        }
    }
</script>
