<template>
    <div class="container">
        <div class="col-lg-6 offset-md-3 mt-5 bg-primary p-5">
            <div class="container">
                <form @submit.prevent="submit()">
                    <div class="register">
                        <h1 class="color_white"> Create an account </h1>
                        <div class="register-content">
                            <div class="space-y-10 mt-3">
                                <span class="nameInput">Name </span>
                                <div class="confirm">
                                    <input 
                                        type="text" 
                                        required 
                                        v-model="name" 
                                        class="form-control" 
                                        placeholder="Enter Name"
                                        @keyup="v$.name.$touch"  
                                    >
                                    <span
                                        v-if="v$.name.$error"
                                        class="text-danger font-weight-bold"
                                        >{{ v$.name.$errors[0].$message }}</span
                                    >
                                </div>
                            </div>
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
                                        @blur="checkEmail"
                                    >
                                    <span
                                        v-if="v$.email.$error"
                                        class="text-danger font-weight-bold"
                                        >{{ v$.email.$errors[0].$message }}</span
                                    >
                                    <span
                                        v-show="emailState"
                                        class="text-danger font-weight-bold"
                                        >Sorry, email is not available</span
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
                            <div class="space-y-10 mt-3">
                                <span class="nameInput">Password</span> 
                                <div class="confirm">
                                    <input 
                                        type="password" 
                                        required 
                                        v-model="password_confirm" 
                                        class="form-control" 
                                        @keyup="v$.password_confirm.$touch"
                                        placeholder="Enter your password"
                                    >
                                    <span
                                        v-if="v$.password_confirm.$error"
                                        class="text-danger font-weight-bold"
                                        >It must be same with your password</span
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
                                <router-link :to="{ name: 'Login' }" class="text-white">Login to your account</router-link>
                            </h6>
                        </div>
                    </div>
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
    name: 'Register',
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
            password_confirm: '',
            name: '',
            submitted: false,
            emailState: false,
            buttonText: 'Create Account'
        }
    },
    methods: {
        ...mapActions({
            attempt: "auth/attempt",
        }),
        checkEmail() {
            let data = { email: this.email };
            axios.post("/validate", data).then((res) => {
                this.emailState = res.data.status;
            });
        },
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
                    .post("/user/create", data)
                    .then((response) => {
                        this.attempt(response.data.token).then(() => {
                            swal.fire(
                                "Saved!",
                                "Complete your registration",
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
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) },
            password_confirm: { required, sameAs: sameAs(this.password) },
            name: { required },
        };
    },
    created() {
        if (this.user) {
            this.$router.push({ name: "Home" });
        }
    },
}
</script>

<style scoped>

</style>