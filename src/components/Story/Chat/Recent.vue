<template>
    <div class="px-2">
        <h5 class="mb-3 px-3 font-size-16">Recent</h5>

        <div class="chat-message-list" data-simplebar>

            <ul class="list-unstyled chat-list chat-user-list">

                <li
                    v-for="chat in chats" 
                    :key="chat.id"
                >
                    <a href="#" @click.prevent="openChat(chat)">
                        <div class="d-flex">
                            <div class="chat-user-img online align-self-center me-3 ms-0">
                                <img :src="chat.object.avatar" class="rounded-circle avatar-xs" :alt="chat.object.name">
                            </div>
                            <div class="flex-1 overflow-hidden">
                                <h5 class="text-truncate font-size-15 mb-1">{{ chat.object.name }}</h5>
                                <p class="chat-user-message text-truncate mb-0">{{ chat.messages.length > 0  ? chat.messages[0].message : chat.object.description}}</p>
                            </div>    
                            <div class="font-size-11">{{ chat.messages.length > 0  ? postDate(chat.messages[0].message.created_at) : postDate(chat.created_at) }}</div>
                        </div>
                    </a>

                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
    name: 'Recent',

    props: {
        search: [String]
    },
    computed: {
        ...mapGetters({
            user: "auth/user",
            FetchChats: "auth/chats",
        }),
    },

    mounted() {
        window.Echo.channel('messagenotification.'+this.user.id)
        .listen('MessageNotificationEvent', (notification) => {
            alert("ok")
        })
    },

    data() {
        return {
            chats: []
        }
    },

    methods:{
        openChat(chat){
            this.setChats(chat);
        },
        ...mapActions({
            setChats: "chat/setChats",
        }),
        postDate(postD) {
            return moment(postD).calendar();  
        },
    },
    watch: {
        search(oldV, newV) {
            if (this.search.length > 0) {

                //// search group belongs to
                let filt = [...this.FetchChats];
                let newfilt = filt.filter((item) => {
                    if (
                        item.object.name
                            .toLowerCase()
                            .includes(this.search.toLowerCase())
                    ) {
                        return item;
                    }
                });
                this.message =
                    "Sorry, we can't find a match";
                this.chats = newfilt;
            } else {
                this.chats = this.FetchChats;
            }
        }
    },

    created(){
        this.chats = this.FetchChats
    }
}
</script>

