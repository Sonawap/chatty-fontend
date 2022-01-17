<template>
    <div class="flex-lg-column d-none d-lg-block">
        <ul class="nav side-menu-nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link" id="light-dark" href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="right" title="Dark / Light Mode">
                    <i class="ri-sun-line theme-mode-icon"></i>
                </a>
            </li>

            <li class="nav-item btn-group dropup profile-user-dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img :src="user.avatar" alt="" class="profile-user rounded-circle">
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Profile <i class="ri-profile-line float-end text-muted"></i></a>
                    <a class="dropdown-item" href="#">Setting <i class="ri-settings-3-line float-end text-muted"></i></a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click="logout()">Log out <i class="ri-logout-circle-r-line float-end text-muted"></i></a>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert2";
export default {
    name: 'Profile',
    computed: {
        ...mapGetters({
            user: "auth/user",
        }),
    },
    methods: {
        logout() {
            swal.fire({
                title: "Leaving Already",
                text: "Are you sure, you want to logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#353535",
                confirmButtonText: "Logout!",
            }).then((result) => {
                ///send request
                if (result.value) {
                    this.signOutAction().then(() => {
                        this.$router.replace({ name: "Login" });
                    });
                }
            });
        },
        ...mapActions({
            signOutAction: "auth/signOut",
        }),
    },
}
</script>

