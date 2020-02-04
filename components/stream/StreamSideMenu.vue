<template>
    <v-card class="mx-auto p-0 pt-0 pb-2 sticky" flat oncontextmenu="return false">
        <v-toolbar dense>
            <v-toolbar-title>Потоки импорта</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$router.push('/import/streams/create')">
                <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <span v-if="streams.length !== 0">
                <StreamSideMenuItem v-for="stream in streams" :key="stream._id" :stream="stream" />
<!--                <GatewayListItem v-for="gateway in gateways" :key="gateway._id" :gateway="gateway"/>-->
            </span>
            <span v-else>
                <v-list-item linkclass="menu-item">
                    <v-list-item-content class="item">
                        <span>
                            <span class="text-center">Чтобы создать новый поток импорта нажмите на</span>
                            <v-icon class="mb-1">mdi-plus-circle-outline</v-icon>
                        </span>
                    </v-list-item-content>
                </v-list-item>
            </span>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "StreamSideMenu",
        props: {
            streams: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data(){
            return{
                test:[

                ]
            }
        },
        components:{
            StreamSideMenuItem: ()=> import('~/components/stream/StreamSideMenuItem'),
        },
    }
</script>

<style scoped lang="scss">
    @media screen and (min-width: 1264px) {
        .sticky {
            position: sticky;
            top: 84px;
        };
    }
</style>
