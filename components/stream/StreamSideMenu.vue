<template>
    <div>
        <v-card class="mx-auto p-0 pt-0 sticky mb-0" flat oncontextmenu="return false">
            <v-toolbar dense>
                <v-toolbar-title>Все ивенты</v-toolbar-title>
                <v-spacer></v-spacer>
                <span class="badge">{{eventCount}}</span>
            </v-toolbar>
            <v-list>
                <span v-if="importedEvents.length !== 0">
                    <v-list-item v-for="event in importedEvents" :key="event.name" link>
                        <v-list-item-content class="item">
                            <div class="item-wrap d-flex" style="width: 80%">
                                <div class="gateway-title">{{event.name}}</div>
                                <v-spacer></v-spacer>
                               <div class="justify-end">
                                   <span class="badge">{{event.count}}</span>
                               </div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </span>
                <span v-else>
                    <v-list-item linkclass="menu-item">
                        <v-list-item-content class="item">
                            <span>
                                <span class="text-center">Отсутствуют ивенты</span>
                            </span>
                        </v-list-item-content>
                    </v-list-item>
                </span>
            </v-list>
        </v-card>
        <v-card class="mx-auto p-0 pt-0 pb-2 sticky" flat oncontextmenu="return false">
            <v-toolbar dense>
                <v-toolbar-title>Потоки импорта</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/import/streams/create')" icon>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list>
                <span v-if="streams.length !== 0">
                    <StreamSideMenuItem :key="stream._id" :stream="stream" v-for="stream in streams"/>
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
    </div>
</template>

<script>
    export default {
        name: "StreamSideMenu",
        props: {
            streamss: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                importedEvents: [
                    {
                        name: "Ticketmaster",
                        count: 34545
                    },
                    {
                        name: "Eventbrite",
                        count: 56
                    },
                    {
                        name: "Engels",
                        count: 56
                    },
                    {
                        name: "Удаленные",
                        count: 13
                    },

                ],
                streams: [{
                    _id: 1,
                    name:'1111',
                },{
                    _id: 1,
                    name:'1111',
                }]
            }
        },
        computed:{
            eventCount(){
                return this.importedEvents.reduce((acc, cv)=>acc+cv.count,0)
            }
        },
        components: {
            StreamSideMenuItem: () => import('~/components/stream/StreamSideMenuItem'),
        },
    }
</script>

<style lang="scss" scoped>
    @media screen and (min-width: 1264px) {
        .sticky {

        }
    ;
    }
    .badge{
        background-color: lightgray;
        border-radius: 15px;
        padding: 3px 5px;
    }
</style>
