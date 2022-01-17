<template>
    <!-- Start groups tab-pane -->
    <div class="tab-pane" id="pills-groups" role="tabpanel" aria-labelledby="pills-groups-tab">
        <!-- Start Groups content -->
        <div>
            <div class="p-4">
                <div class="user-chat-nav float-end">
                    <div  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Create group">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-link text-decoration-none text-muted font-size-18 py-0" data-bs-toggle="modal" data-bs-target="#addgroup-exampleModal">
                            <i class="ri-group-line me-1 ms-0"></i>
                        </button>
                    </div>

                </div>
                <h4 class="mb-4">Groups</h4>

                <!-- Start add group Modal -->
                <div class="modal fade" id="addgroup-exampleModal" tabindex="-1" role="dialog" aria-labelledby="addgroup-exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title font-size-16" id="addgroup-exampleModalLabel">Create New Group</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                                </div>
                                <div class="modal-body p-4">
                                    <form>
                                        <div class="mb-4">
                                            <label for="addgroupname-input" class="form-label">Group Name</label>
                                            <input type="text" class="form-control" v-model="name" id="addgroupname-input" placeholder="Enter Group Name">
                                        </div>
                                        <div class="mb-4">
                                            <label class="form-label">Group Members</label>
                                            <div class="mb-3">
                                                <button class="btn btn-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#groupmembercollapse" aria-expanded="false" aria-controls="groupmembercollapse">
                                                    Select Members
                                                </button>
                                            </div>

                                            <div class="collapse" id="groupmembercollapse">
                                                <div class="card border">
                                                    <div class="card-header">
                                                        <h5 class="font-size-15 mb-0">Contacts</h5>
                                                    </div>
                                                    <div class="card-body p-2">
                                                        <div data-simplebar style="max-height: 150px;">
                                                            <div>
                                                                <ul class="list-unstyled contact-list">
                                                                    <li v-for="user in users" :key="user.id">
                                                                        <div class="form-check">
                                                                            <input type="checkbox" class="form-check-input" :value="user.id" :id="user.id" v-model="ids">
                                                                            <label class="form-check-label" for="memberCheck1">{{ user.fullname }}</label>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                            
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="addgroupdescription-input" class="form-label">Description</label>
                                            <textarea class="form-control" v-model="description" id="addgroupdescription-input" rows="3" placeholder="Enter Description"></textarea>
                                        </div>
                                    </form>
                                </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                                <button 
                                    type="button" 
                                    @click.prevent="submit()" 
                                    class="btn btn-primary"
                                    :disabled="submitted"
                                    v-html="buttonText"
                                >
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End add group Modal -->

                <div class="search-box chat-search-box">            
                    <div class="input-group rounded-3">
                        <span class="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                            <i class="ri-search-line search-icon font-size-18"></i>
                        </span>
                        <input 
                            type="text" 
                            class="form-control bg-light" 
                            @keyup="filterGroup" 
                            placeholder="Search groups..." 
                            aria-label="Search groups..." 
                            aria-describedby="basic-addon1"
                            v-model="search"
                        >
                    </div> 
                </div> <!-- Search Box-->
            </div>

            <!-- Start chat-group-list -->
            <div class="p-4 chat-message-list chat-group-list" data-simplebar>
                <ul class="list-unstyled chat-list">
                    <li 
                        v-for="group in groups" 
                        :key="group.id"
                        v-show="groups.length > 0"
                        
                    >
                        <a href="#" @click.prevent="openGroupChat(group)">
                            <div class="d-flex align-items-center">
                                <div class="chat-user-img me-3 ms-0">
                                    <div class="avatar-xs">
                                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                            <img :src="group.avatar" class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-1 overflow-hidden">
                                    <h5 class="text-truncate font-size-14 mb-0">#{{ group.name }} <span class="badge badge-soft-danger rounded-pill float-end d-none">+23</span></h5>
                                    <p class="text-truncate font-size-14 mb-0">{{ group.description }} </p>
                                </div>                        
                            </div>
                        </a>
                    </li>
                    <li v-show="groups.length <= 0">
                        <h5 class="text-truncate font-size-14 mb-0">{{ message }}</h5>
                    </li>
                </ul>
            </div>
            <!-- End chat-group-list -->
        </div>
        <!-- End Groups content -->
    </div>
    <!-- End groups tab-pane -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import swal from "sweetalert2";
export default {
    name: 'NavGroup',
    computed: {
        ...mapGetters({
            user: "auth/user",
            users: "auth/users",
            Fetchgroups: "group/groups",
            OtherGroups: "group/public_groups",
        }),
    },
    data() {
        return {
            ids: [],
            name: '',
            description: '',
            groups: '',
            search: '',
            submitted: false,
            buttonText: 'Create Group',
            message: "No Group Found",
        }
    },

    watch: {
        search(oldV, newV) {
            if (this.search.length > 0) {
                let filt = [...this.Fetchgroups];
                let newfilt = filt.filter((item) => {
                    if (
                        item.name
                            .toLowerCase()
                            .includes(this.search.toLowerCase())
                    ) {
                        return item;
                    }
                });
                this.message =
                    "Sorry, we can't find a match";
                this.groups = newfilt;
            } else {
                this.groups = this.Fetchgroups;
            }
        }
    },

    methods: {
        openGroupChat(group){
            this.setGroupChat(group);
        },
        ...mapActions({
            getGroups: "group/getGroups",
            getOtherGroups: "group/getOtherGroups",
            setGroupChat: "chat/setGroupChat",
        }),
        submit() {
            this.submitted = true;
            this.buttonText = `<i class="fas fa-spinner fa-spin fa-2x"></i>`;
            let data = {
                ids: this.ids,
                name: this.name,
                description: this.description,
            };
            axios
                .post("/groups", data)
                .then((response) => {
                    swal.fire(
                        "Created!",
                        "Group Has been created",
                        "success",
                    )
                    .then(() => {
                        this.getGroups().then(() => {
                            this.ids = [];
                            this.name = '';
                            this.description = '';
                            this.groups = this.Fetchgroups;
                            this.buttonText = "Create Group";
                            $('#addgroup-exampleModal').modal('hide');
                        });
                    });
                })
                .catch((error) => {
                    this.submitted = false;
                    this.buttonText = "Create Group";
                    swal.fire(
                        "Error",
                        "Group cannot be created at the moment, Try again",
                        "error",
                    );
                });
            
        },
    },

    created() {
        this.getGroups().then(() => {
            this.groups = this.Fetchgroups;
        });

        this.getOtherGroups();
        
    },

    mounted() {
    },
}
</script>

