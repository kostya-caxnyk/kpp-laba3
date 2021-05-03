<template>
    <h3>Git repo: <a target="_blank" href="https://github.com/kostya-caxnyk/kpp-laba3">kpp-laba3</a></h3>
    <h2><a target="_blank" href="/api-docs">Swagger</a></h2>
    <GroupsList/>
</template>

<script>
    import GroupsList from './components/GroupsList.vue'
    import './style.css'

    export default {
        name: 'App',
        components: {
            GroupsList
        }
    }
</script>

