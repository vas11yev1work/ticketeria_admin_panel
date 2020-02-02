<template>
    <div class="index-page">
        <nuxt-child/>
    </div>
</template>

<script>
    import IndexRequireParams from "../components/stream/StreamParams";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            IndexRequireParams
        },
        computed: {
            ...mapGetters({
                gatewayList: 'gateways/gatewayList',
            }),
        },
        mounted() {
            this.fetchGateways();
        },
        methods: {
            ...mapActions({
                fetchGateways: 'gateways/fetchGateways',
            }),
        }
    }
</script>
