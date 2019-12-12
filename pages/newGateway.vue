<template>
    <div class="new-gateway">
        <v-container>
            <v-row>
                <v-col>
                    <GatewayEdit noDelete createMode/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import GatewayEdit from "../components/gateways/GatewayEdit";
    export default {
        components: {GatewayEdit}
    }
</script>
