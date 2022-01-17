<template>
    <div class="chat-input-section p-3 p-lg-4 border-top mb-0"> 
        <div class="row g-0">
            <div class="col">
                <input 
                    type="text" 
                    class="form-control form-control-lg bg-light border-light" 
                    placeholder="Enter Message..."
                    v-model="message"
                    @keypress.enter="send()"
                >
            </div>
            <div class="col-auto">
                <div class="chat-input-links ms-md-2 me-md-0">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                            <button 
                                type="submit" 
                                class="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light"
                                @click.prevent="send()"
                                v-html="buttonText"
                            >
                                
                            </button>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import swal from "sweetalert2";
export default {
    name: 'Input',
    data() {
        return {
            message: '',
            buttonText: `<i class="ri-send-plane-2-fill"></i>`
        }
    },
    
    methods: {
        
        send(){
            if(this.message.length < 1){
                swal.fire(
                    "Start Typing to send message!",
                )
            }else{
                let data = {
                    message : this.message,
                    group_id : this.chat.id,
                    type : this.type,
                    chat_id : this.messages.id,
                };
                this.message = '';
                this.buttonText = 'Sending...'
                axios
                    .post('message', data)
                    .then((response) => {
                        this.messages.messages.push(response.data.message);
                        this.buttonText =`<i class="ri-send-plane-2-fill"></i>`;
                        this.scrollToElement;
                });
            }
        }
    },
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


