<template>
    <v-container>
        <v-row>
            <v-col class="col-12" lg="3">
                <StreamSideMenu :streams="streamsList" />
            </v-col>
            <nuxt-child/>
        </v-row>
    </v-container>
</template>

<script>
    import IndexRequireParams from "~/components/stream/StreamParams";
    import StreamSideMenu from "~/components/stream/StreamSideMenu";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            IndexRequireParams,
            StreamSideMenu
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
                streamsList: 'streams/streamsList'
            }),
        },
        mounted() {
            this.fetchGateways();
            this.fetchStreams();
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
                fetchStreams: 'streams/fetchStreams'
            }),
        }
    }
</script>

<style scoped>

</style>
