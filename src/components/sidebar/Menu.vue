<template>
    <div class="flex-lg-column my-auto">
        <ul class="nav nav-pills side-menu-nav justify-content-center" role="tablist">
            <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Profile">
                <a class="nav-link" id="pills-user-tab" data-bs-toggle="pill" href="#pills-user" role="tab">
                    <i class="ri-user-2-line"></i>
                </a>
            </li>
            <li class="nav-item d-none" data-bs-toggle="tooltip" data-bs-placement="top" title="Chats">
                <a class="nav-link" id="pills-chat-tab" data-bs-toggle="pill" href="#pills-chat" role="tab">
                    <i class="ri-message-3-line"></i>
                </a>
            </li>
            <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Groups">
                <a class="nav-link active" id="pills-groups-tab" data-bs-toggle="pill" href="#pills-groups" role="tab">
                    <i class="ri-group-line"></i>
                </a>
            </li>
            <li class="nav-item d-none" data-bs-toggle="tooltip" data-bs-placement="top" title="Contacts">
                <a class="nav-link" id="pills-contacts-tab" data-bs-toggle="pill" href="#pills-contacts" role="tab">
                    <i class="ri-contacts-line"></i>
                </a>
            </li>
            <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Settings">
                <a class="nav-link" id="pills-setting-tab" data-bs-toggle="pill" href="#pills-setting" role="tab">
                    <i class="ri-settings-2-line"></i>
                </a>
            </li>
            <li class="nav-item dropdown profile-user-dropdown d-inline-block d-lg-none">
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
    name: 'Menu',
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

