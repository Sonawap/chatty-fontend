<template>
    <!-- start chat-leftsidebar -->
    <div class="chat-leftsidebar me-lg-1 ms-lg-0">
        <div class="tab-content">
            <NavContact />
            <!-- Start Profile tab-pane -->
            <div class="tab-pane" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                <nav-profile></nav-profile>
            </div>
            <!-- End Profile tab-pane -->

            <!-- Start chats tab-pane -->
            <div class="tab-pane active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
                <nav-chat></nav-chat>
            </div>
            <!-- End chats tab-pane -->
            
            <!-- Start groups tab-pane -->
            <div class="tab-pane " id="pills-groups" role="tabpanel" aria-labelledby="pills-groups-tab">
                <nav-group></nav-group>
            </div>
            <!-- End groups tab-pane -->

            <!-- Start contacts tab-pane -->
            <div class="tab-pane d-none" id="pills-contacts" role="tabpanel" aria-labelledby="pills-contacts-tab">
                <nav-contact></nav-contact>
            </div>
            <!-- End contacts tab-pane -->
            
            <!-- Start settings tab-pane -->
            <div class="tab-pane" id="pills-setting" role="tabpanel" aria-labelledby="pills-setting-tab">
                <nav-setting></nav-setting>
            </div>
            <!-- End settings tab-pane -->
            
        </div>
        <!-- end tab content -->
    </div>
    <!-- end chat-leftsidebar -->
</template>

<script>
import NavProfile from './Story/NavProfile.vue'
import NavChat from './Story/NavChat.vue'
import NavGroup from './Story/NavGroup.vue'
import NavContact from './Story/NavContact.vue'
import NavSetting from './Story/NavSetting.vue'

export default {
    components: { NavProfile, NavChat, NavGroup, NavContact, NavSetting },
    name: 'Story',
    
}
</script>

