<template>
    <div id="auth0"/>
</template>

<script>
    import {showLogin} from "../../utils/lock";

    export default {
        middleware: 'anonymous',
        mounted () {
            showLogin('auth0')
        }
    }

</script>
