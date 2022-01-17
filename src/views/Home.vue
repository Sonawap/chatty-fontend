<template>    
    <div class="layout-wrapper d-lg-flex">
        <Sidebar />
        <Story />
        <Chat />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Story from '../components/Story.vue'
import Sidebar from '../components/Sidebar.vue'
import Chat from '../components/Chat.vue'
export default {
    components: { Sidebar, Story, Chat },
    computed: {
        ...mapGetters({
            user: "auth/user",
        }),
    },
    name: 'Home',
}
</script>

