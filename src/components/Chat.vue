<template>
    <!-- Start User chat -->
    <div class="user-chat w-100 overflow-hidden">
        <div class="d-lg-flex" v-if="chat">

            <!-- start chat conversation section -->
            <div class="w-100 overflow-hidden position-relative">
                <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
                    <div class="row align-items-center">
                        <div class="col-sm-4 col-8">
                            <div class="d-flex align-items-center">
                                <div class="d-block d-lg-none me-2 ms-0">
                                    <a href="javascript: void(0);" class="user-chat-remove text-muted font-size-16 p-2"><i class="ri-arrow-left-s-line"></i></a>
                                </div>
                                <div class="me-3 ms-0">
                                    <img :src="chat.avatar" class="rounded-circle avatar-xs" alt="">
                                </div>
                                <div class="flex-grow-1 overflow-hidden" v-if="type == 'GROUP'">
                                    <h5 class="font-size-16 mb-0 text-truncate">
                                        <a href="#" class="text-reset user-profile-show">#{{ chat.name }}</a> 
                                    </h5>
                                    <p href="#" class="text-reset user-profile-show mb-0">{{ chat.description }}</p> 
                                </div>
                                <div class="flex-grow-1 overflow-hidden" v-else>
                                    <h5 class="font-size-16 mb-0 text-truncate">
                                        <a href="#" class="text-reset user-profile-show">{{ chat.fullname }}</a> 
                                        <i class="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8 col-4">
                            <ul class="list-inline user-chat-nav text-end mb-0">                                        
                                <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                    <button type="button" class="btn nav-btn user-profile-show">
                                        <i class="ri-user-2-line"></i>
                                    </button>
                                </li>

                                <li class="list-inline-item">
                                    <div class="dropdown">
                                        <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="ri-more-fill"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item d-block d-lg-none user-profile-show" href="#">View profile <i class="ri-user-2-line float-end text-muted"></i></a>
                                            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                        </div>
                                    </div>
                                </li>                                        
                            </ul>                                    
                        </div>
                    </div>
                </div>
                <!-- end chat user head -->

                <conversation></conversation>
                <chat-input></chat-input>
            </div>
            <!-- end chat conversation section -->

            <!-- start User profile detail sidebar -->
            <right-profile></right-profile>
        </div>
        <div v-else>
            <h4 class="text-center" style="margin-top: 30%;">No Conversation Found, <br> Click on the group or user to start a conversation</h4>
        </div>
    </div>
    <!-- End User chat -->
</template>

<script>
import Conversation from './Chats/Conversation.vue'
import ChatInput from './Chats/Input.vue'
import RightProfile from "./Chats/RightProfile.vue"
import { mapGetters, mapActions } from "vuex";

export default {
    components: { RightProfile, Conversation, ChatInput },
    name: 'Chat',
    computed: {
        ...mapGetters({
            user: "auth/user",
            messages: "chat/messages",
            chat: "chat/chat",
            type: "chat/type",
        }),
    },
}
</script>

