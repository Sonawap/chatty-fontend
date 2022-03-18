<template>
    <div class="mb-4 profile-user">
        <img :src="cropImg" class="rounded-circle avatar-lg img-thumbnail" alt="">
        <button 
            type="button" 
            @click.prevent="showFileChooser"
            class="btn btn-light bg-light avatar-xs p-0 rounded-circle profile-photo-edit"
        >
            <i class="ri-pencil-fill"></i>
        </button>
        <input 
            type="file" 
            ref="input" 
            name="image"
            accept="image/*"
            @change="setImage" 
            style="display:none"
        >

        <div class="modal fade" id="addImage6">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Crop Image</h4>
                    </div>
                    <div class="modal-body">
                        <div class="content">
                            <section class="cropper-area">
                                <div class="img-cropper">
                                    <vue-cropper
                                        ref="cropper"
                                        :aspect-ratio="5 / 5"
                                        :src="imgSrc"
                                        preview=".preview"
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <template v-if="!Loading">
                            <a
                                href="#"
                                role="button"
                                @click.prevent="rotate(90)"
                            >
                                Rotate +90deg
                            </a>
                            <a
                                href="#"
                                role="button"
                                @click.prevent="rotate(-90)"
                            >
                                Rotate -90deg
                            </a>
                            <a
                                ref="flipX"
                                href="#"
                                role="button"
                                @click.prevent="flipX"
                            >
                                Flip X
                            </a>
                            <a
                                ref="flipY"
                                href="#"
                                role="button"
                                @click.prevent="flipY"
                            >
                                Flip Y
                            </a>

                            <a
                                href="#"
                                role="button"
                                @click.prevent="uploadImage()"
                            >
                                Upload Image
                            </a>
                        </template>
                        <template v-else>
                            <p class="text-center">Uploading...</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import axios from "axios";
import swal from "sweetalert2";
export default {
    name: 'NavSetting',
    computed: {
        ...mapGetters({
            user: "auth/user",
        }),
    },
    components: {
        VueCropper,
    },
    data() {
        return {
            imgSrc: '/assets/images/berserk.jpg',
            cropImg: '',
            Loading: false
        };
    },
    created() {
        this.cropImg = this.user.avatar
    },
    methods: {
        ...mapActions({
            setProfileImage: "auth/setImage",
        }),
        cropImage() {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        flipX() {
            const dom = this.$refs.flipX;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleX(scale);
            dom.setAttribute('data-scale', scale);
        },
        flipY() {
            const dom = this.$refs.flipY;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleY(scale);
            dom.setAttribute('data-scale', scale);
        },
        move(offsetX, offsetY) {
            this.$refs.cropper.move(offsetX, offsetY);
        },
        rotate(deg) {
            this.$refs.cropper.rotate(deg);
        },
        setImage(e) {
            $('#addImage6').modal('show');
            const file = e.target.files[0];
            if (file.type.indexOf('image/') === -1) {
                alert('Please select an image file');
                return;
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                this.imgSrc = event.target.result;
                // rebuild cropperjs with the updated source
                this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        showFileChooser() {
            this.$refs.input.click();
        },
        uploadImage(){
            this.Loading = true
            this.cropImage();
            let data = {
                'image' : this.cropImg
            }
            axios.post('user/uploadProfilePhoto', data)
            .then((response)=>{
                this.setProfileImage(response.data.image);
                this.Loading = false
                $('#addImage6').modal('hide');
                swal.fire(
                    'Success!',
                    'Your Profile Photo has been changed',
                    'success'
                );

            }).catch((e) =>{
                this.Loading = false
                $('#addImage6').modal('hide');
                swal.fire(
                    'Error!',
                    'Sorry an error occured, Unable Change your profile image at the moment try again later',
                    'error'
                )
            });
        }
    },
};
</script>

