<template>
    <div class="px-4 pb-4" dir="ltr">
        <div class="owl-carousel owl-theme" id="user-status-carousel">
            <div class="item">
                <a href="#" class="user-status-box">
                    <div class="avatar-xs mx-auto d-block chat-user-img online">
                        <img src="@/assets/images/users/avatar-2.jpg" alt="user-img" class="img-fluid rounded-circle">
                        <span class="user-status"></span>
                    </div>

                    <h5 class="font-size-13 text-truncate mt-3 mb-1">Patrick</h5>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Online',
}
</script>

