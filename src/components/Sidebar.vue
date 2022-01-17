<template>
    <div class="side-menu flex-lg-column me-lg-1 ms-lg-0">
        <Logo />
        <Menu />
        <Profile />
    </div>
</template>

<script>

import Logo from './sidebar/Logo.vue'
import Menu from './sidebar/Menu.vue'
import Profile from './sidebar/Profile.vue'
export default {
    name: 'Sidebar',
    components: { Logo, Menu, Profile }
}
</script>
