<template>
    <!-- start chat conversation -->
    <div class="chat-conversation p-3 p-lg-4" id="chatCon" data-simplebar="init">
        <ul class="list-unstyled mb-0">

            <li class="d-none"> 
                <div class="chat-day-title">
                    <span class="title">Today</span>
                </div>
            </li>

            <h4 class="text-center" style="margin-top: 20%;" v-show="messages.messages.length < 1">
                No Message Found, Start the Conversation
            </h4>
            <li 
                v-for="message in messages.messages" 
                :key="message.id" 
                :class="{ 'right' : message.user.id === user.id}"
                v-show="messages.messages.length > 0"
            >
                <div class="conversation-list">
                    <div class="chat-avatar">
                        <img :src="message.user.avatar" alt="">
                    </div>
                    <div class="user-chat-content">
                        <div class="ctext-wrap">
                            <div class="ctext-wrap-content">
                                <p class="mb-0">
                                    {{ message.message }}
                                </p>
                                <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">{{ postDate(message.created_at) }}</span></p>
                            </div>
                            <div class="dropdown align-self-start d-none">
                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="ri-more-2-fill"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                    <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                    <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                    <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="conversation-name">{{ message.user.fullname }}</div>
                    </div>
                </div>
            </li>

            
        </ul>
    </div>
    <!-- end chat conversation end -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
    name: 'Conversation',
    computed: {
        ...mapGetters({
            user: "auth/user",
            messages: "chat/messages",
            chat: "chat/chat",
            type: "chat/type",
        }),
    },

    updated() {
        // this.$nextTick(() => this.scrollToEnd());
    },
    methods: {
        // scrollToEnd: function () {
        //     this.$el.scrollTop = this.$el.lastElementChild.offsetTop;
        // },
        postDate(postD) {
            return moment(postD)
                .startOf("hour")
                .fromNow();
        },

    },
}
</script>

