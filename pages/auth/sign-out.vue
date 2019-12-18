<template>
    <p>Signing out</p>
</template>

<script>
    import {unsetToken} from "../../utils/auth";
    import {logout} from "../../utils/lock";
    export default {
        layout: 'auth',
        mounted () {
            unsetToken()
            logout()
        }
    }
</script>
