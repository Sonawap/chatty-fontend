<template>
    <div class="container">
        <div class="col-lg-6 offset-md-3 mt-5 bg-primary p-5">
            <div class="container">
                <h1 class="color_white"> Welcome Back </h1>
                <form @submit.prevent="submit()">
                    <div class="space-y-10 mt-3">
                        <span class="nameInput">Email </span>
                        <div class="confirm">
                            <input 
                                type="email" 
                                required 
                                v-model="email" 
                                class="form-control" 
                                placeholder="Enter email"
                                @keyup="v$.email.$touch"
                            >
                            <span
                                v-if="v$.email.$error"
                                class="text-danger font-weight-bold"
                                >{{ v$.email.$errors[0].$message }}</span
                            >
                        </div>
                    </div>

                    <div class="space-y-10 mt-3">
                        <span class="nameInput">Password</span> 
                        <div class="confirm">
                            <input 
                                type="password" 
                                required 
                                v-model="password" 
                                class="form-control" 
                                placeholder="Enter your password"
                                @keyup="v$.password.$touch"
                            >
                            <span
                                v-if="v$.password.$error"
                                class="text-danger font-weight-bold"
                                >{{ v$.password.$errors[0].$message }}</span
                            >
                        </div>
                    </div>
                    <button 
                        class="btn btn-warning w-full btn-lg mt-3" 
                        type="submit"
                        :disabled="submitted"
                        v-html="buttonText"
                    > 
                    </button>
                    <h6 class="color_white mt-3"> 
                        <router-link :to="{ name: 'Register' }" class="text-white">Create an account</router-link>
                    </h6>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import axios from "axios";
import swal from "sweetalert2";
export default {
    name: 'Login',
    computed: {
        ...mapGetters({
            user: "auth/user",
        }),
    },
    data() {
        return {
            v$: useValidate(),
            email: '',
            password: '',
            name: '',
            submitted: false,
            buttonText: 'Login'
        }
    },
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) },
        };
    },
    created() {
        if (this.user) {
            this.$router.push({ name: "Home" });
        }
    },
    methods: {
        ...mapActions({
            attempt: "auth/attempt",
        }),
        submit() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.submitted = true;
                this.buttonText = `<i class="fas fa-spinner fa-spin fa-2x"></i>`;
                let data = {
                    email: this.email,
                    password: this.password,
                    fullname: this.name,
                };
                axios
                    .post("/user/login", data)
                    .then((response) => {
                        this.attempt(response.data.token).then(() => {
                            swal.fire(
                                "Loggged in!",
                                "Welcome Back",
                                "success",
                            ).then(() => {
                                this.$router.push({
                                    name: "Home",
                                });
                            });
                        });
                    })
                    .catch((error) => {
                        this.submitted = false;
                        this.buttonText = "Create Account";
                        swal.fire(
                            "Error",
                            "Please make sure to enter a valid email and password, then try again",
                            "error",
                        );
                    });
            } else {
                this.submitted = false;
                this.buttonText = "Create Account";
                swal.fire(
                    "Error", 
                    "Please check your credentials", 
                    "error"
                );
            }
        },
    },
}
</script>

<style scoped>

</style>