<template>
    <v-list-item link @click.right="ctxMenu = !ctxMenu" class="menu-item"
                 :class="this.$route.params.id === gateway._id ? 'v-list-item--active' : ''">
        <v-list-item-content @click="onListItemClick" class="item">
            <div class="item-wrap">
                <v-text-field
                    v-if="editing"
                    v-model="name"
                    ref="nameInput"
                    label="Filled"
                    :loading="loading"
                    flat
                    solo
                    @blur="endRename"
                    @keyup.enter="endRename"
                    class="edit-field"/>
                <span v-else class="gateway-title">{{gateway.name}}</span>
                <v-btn ref="settingsButton" text icon @click="ctxMenu = !ctxMenu" class="icon-button">
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
            </div>
        </v-list-item-content>
        <v-scroll-y-transition>
            <div class="context-menu" v-if="ctxMenu">
                <v-list>
                    <v-list-item link @click.prevent="startRename">
                        <v-list-item-title>Переименовать шлюз</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click.prevent="deleteClick">
                        <v-list-item-title>Удалить шлюз</v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </v-scroll-y-transition>
    </v-list-item>

</template>

<script>
    import {mapActions} from 'vuex';
    import utils from "../../utils/Utils";
    export default {
        props: {
            gateway: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                ctxMenu: false,
                editing: false,
                loading: false,
                name: '',
            }
        },
        methods: {
            ...mapActions({
                deleteGateway: 'gateways/deleteGateway',
                updateGateway: 'gateways/updateGateway'
            }),
            onListItemClick(e) {
                if (this.$refs.settingsButton.$el.contains(e.target)) {
                    return;
                } else {
                    this.ctxMenu = false;
                    this.$router.push({name: 'gateways-id', params: {id: this.gateway._id}});
                }
            },
            closeContextMenu(e) {
                if (!this.$el.contains(e.target)) {
                    this.ctxMenu = false
                }
            },
            startRename() {
                this.name = this.gateway.name;
                this.editing = true;
                this.ctxMenu = false;
                this.$nextTick(() => {
                    this.$refs.nameInput.focus();
                });
            },

            async endRename() {
                this.loading = true;
                this.ctxMenu = false;
                await this.tryUpdate(this.gateway._id, {name: this.name});
                this.loading = false;
                this.editing = false;
            },

            async deleteClick(){
                let confirmation = confirm(`Вы действительно хотете удалить ${this.gateway.name}`)
                if(confirmation){
                    await this.tryDelete(this.gateway._id);
                }
                this.ctxMenu = false;
            },

            async tryUpdate(id, data) {
                try {
                    if(data.name === '') return ;
                    await this.updateGateway({id: id, options: utils.normalizeBeforeSend(data)});
                } catch (e) {
                    this.$emit('error', e);
                    alert(`Произошл ошибка.`)
                }
            },

            async tryDelete(id) {
                try {
                    await this.deleteGateway(id);
                    this.$router.push('/gateways')
                } catch (e) {
                    this.$emit('error',e);
                    alert(`Произошла ошибка.`)
                }
            }
        },
        mounted() {
            if (typeof document !== 'undefined') {
                document.addEventListener('mouseup', this.closeContextMenu);
            }
        },
        beforeDestroy() {
            document.removeEventListener('mouseup', this.closeContextMenu);
        }
    }
</script>

<style lang="scss">
    .gateway-title{
        white-space: nowrap;
        width: calc(100% - 40px);
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
    }
    .menu-item {
        position: relative;
        .item {
            display: block;
            padding: 0;

            .menu-item-link {
                text-decoration: none;
                color: rgba(0, 0, 0, .87);
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
            }

            .item-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px;
            }

            .v-list-item--active {
                color: salmon;
            }
        ;

            .item-span {
                flex: initial;
            }

            .icon-button {
                opacity: 0;
            }

            &:hover {
                .icon-button {
                    opacity: 1;
                }
            }
        }

        .context-menu {
            top: 34px;
            left: 20px;
            position: absolute;
            border-radius: 5px;
            z-index: 99;
            box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }
    }
    .edit-field{
        transform: translateY(15px);
        .v-input__slot{
            background-color: transparent !important;
        }
    }
</style>
