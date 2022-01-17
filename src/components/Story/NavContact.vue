<template>
   <!-- Start contacts tab-pane -->
    <div class="tab-pane" id="pills-contacts" role="tabpanel" aria-labelledby="pills-contacts-tab">
        <!-- Start Contact content -->
        <div>
            <div class="p-4">
                <div class="user-chat-nav float-end">
                    <div data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add Contact">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-link text-decoration-none text-muted font-size-18 py-0" data-bs-toggle="modal" data-bs-target="#addContact-exampleModal">
                            <i class="ri-user-add-line"></i>
                        </button>
                    </div>
                </div>
                <h4 class="mb-4">Contacts</h4>

                <!-- Start Add contact Modal -->
                <div class="modal fade" id="addContact-exampleModal" tabindex="-1" role="dialog" aria-labelledby="addContact-exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title font-size-16" id="addContact-exampleModalLabel">Add Contact</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body p-4">
                                <form>
                                    <div class="mb-3">
                                        <label for="addcontactemail-input" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="addcontactemail-input" placeholder="Enter Email">
                                    </div>
                                    <div class="mb-3">
                                        <label for="addcontact-invitemessage-input" class="form-label">Invatation Message</label>
                                        <textarea class="form-control" id="addcontact-invitemessage-input" rows="3" placeholder="Enter Message"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Invite Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Add contact Modal -->

                <div class="search-box chat-search-box">
                    <div class="input-group bg-light  input-group-lg rounded-3">
                        <div class="input-group-prepend">
                            <button class="btn btn-link text-decoration-none text-muted pe-1 ps-3" type="button">
                                <i class="ri-search-line search-icon font-size-18"></i>
                            </button>
                        </div>
                        <input 
                            type="text" 
                            class="form-control bg-light" 
                            @keyup="filterUsers" 
                            placeholder="Search users..." 
                            aria-label="Search users..." 
                            aria-describedby="basic-addon1"
                            v-model="search"
                        >
                    </div>
                </div>
                <!-- End search-box -->
            </div>
            <!-- end p-4 -->

            <!-- Start contact lists -->
            <div class="p-4 chat-message-list chat-group-list" data-simplebar>
                <div>
                    <ul class="list-unstyled contact-list">
                        <li v-for="user in users" :key="user.id">
                            <div class="d-flex align-items-center">
                                <div class="chat-user-img me-3 ms-0">
                                    <div class="avatar-xs">
                                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                            <img :src="user.avatar" class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <h5 class="font-size-14 m-0">{{ user.fullname }}</h5>
                                </div>
                                <div class="dropdown d-none">
                                    <a href="#" class="text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ri-more-2-fill"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Share <i class="ri-share-line float-end text-muted"></i></a>
                                        <a class="dropdown-item" href="#">Block <i class="ri-forbid-line float-end text-muted"></i></a>
                                        <a class="dropdown-item" href="#">Remove <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: 'NavContact',
    computed: {
        ...mapGetters({
            Fetchusers: "auth/users",
        }),
    },
    data() {
        return {
            users: '',
            search: ''
        }
    },
    created() {
        this.users = this.Fetchusers;
    },
    watch: {
        search(oldV, newV) {
            if (this.search.length > 0) {
                let filt = [...this.Fetchusers];
                let newfilt = filt.filter((item) => {
                    if (
                        item.fullname
                            .toLowerCase()
                            .includes(this.search.toLowerCase())
                    ) {
                        return item;
                    }
                });
                this.message =
                    "Sorry, we can't find a match for what you are looking for";
                this.users = newfilt;
            } else {
                this.users = this.Fetchusers;
            }
        }
    },
}
</script>

