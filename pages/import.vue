<template>
    <div class="index-page">
        <nuxt-child/>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$router.push('/import/streams');
        }
    }
</script>
