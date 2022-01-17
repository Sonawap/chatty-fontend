<template>
    <div class="px-2">
        <h5 class="mb-3 px-3 font-size-16">Recent</h5>

        <div class="chat-message-list" data-simplebar>

            <ul class="list-unstyled chat-list chat-user-list">

                <li class="active">
                    <a href="#">
                        <div class="d-flex">
                            <div class="chat-user-img online align-self-center me-3 ms-0">
                                <img src="@/assets/images/users/avatar-4.jpg" class="rounded-circle avatar-xs" alt="">
                                <span class="user-status"></span>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <h5 class="text-truncate font-size-15 mb-1">Doris Brown</h5>
                                <p class="chat-user-message text-truncate mb-0">Nice to meet you</p>
                            </div>    
                            <div class="font-size-11">10:12 AM</div>
                        </div>
                    </a>
                </li>
                <li class="unread">
                    <a href="#">
                        <div class="d-flex">
                            <div class="chat-user-img align-self-center me-3 ms-0">
                                <div class="avatar-xs">
                                    <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        D
                                    </span>
                                </div>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <h5 class="text-truncate font-size-15 mb-1">Designer</h5>
                                <p class="chat-user-message text-truncate mb-0">Next meeting tomorrow 10.00AM</p>
                            </div>
                            <div class="font-size-11">12:01 PM</div>
                            <div class="unread-message">
                                <span class="badge badge-soft-danger rounded-pill">01</span>
                            </div>
                        </div>                            
                    </a>
                </li>
                <li>
                    <a href="#">                        
                        <div class="d-flex">
                            <div class="chat-user-img away align-self-center me-3 ms-0">
                                <img src="@/assets/images/users/avatar-6.jpg" class="rounded-circle avatar-xs" alt="">
                                <span class="user-status"></span>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <h5 class="text-truncate font-size-15 mb-1">Steve Walker</h5>
                                <p class="chat-user-message text-truncate mb-0"><i class="ri-file-text-fill align-middle me-1 ms-0"></i> Admin-A.zip</p>
                            </div>        
                            <div class="font-size-11">03:20 PM</div>
                        </div>                        
                    </a>
                </li>
                <li class="typing">
                    <a href="#">                        
                        <div class="d-flex">
                            <div class="chat-user-img align-self-center online me-3 ms-0">
                                <div class="avatar-xs">
                                    <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        A
                                    </span>
                                </div>
                                <span class="user-status"></span>
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <h5 class="text-truncate font-size-15 mb-1">Albert Rodarte</h5>
                                <p class="chat-user-message text-truncate mb-0">typing<span class="animate-typing">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                </span></p>
                            </div>
                            <div class="font-size-11">04:56 PM</div>
                        </div>  
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Recent',
}
</script>

