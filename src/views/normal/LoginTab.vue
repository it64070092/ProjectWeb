<template>
    <navbar-component></navbar-component>
    <div class="absolute w-full h-full">
        <div class="absolute top-0 w-full h-full bg-gray-900" style="background-size: cover; background-repeat: no-repeat;"
            :style="{ 'background-image': 'url(' + require('../../assets/img/bg.jpg') + ')' }"></div>
        <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
                <div class="w-full lg:w-4/12 px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div class="rounded-t mb-0 px-6 py-6">
                                <div class="text-center mb-3">
                                    <h6 class="text-gray-600 text-sm font-bold">
                                        Sign In
                                    </h6>
                                </div>
                                <hr class="mt-6 border-b-1 border-gray-400" />
                            </div>
                            <form @submit.prevent="submitForm">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Email</label><input type="email" v-model="email"
                                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Email" style="transition: all 0.15s ease 0s;" />
                                </div>
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">Password</label><input type="password" v-model="password"
                                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Password" style="transition: all 0.15s ease 0s;" />
                                </div>
                                <div class="text-center mt-6">
                                    <button
                                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                        type="submit" style="transition: all 0.15s ease 0s;">
                                        Sign In
                                    </button>
                                </div>
                                <div class="flex flex-wrap mt-6">
                                    <div class="w-1/2 text-center">
                                        <router-link to="/signup"><a
                                                class="text-center text-black underline hover:text-blue-400">Create new
                                                account</a></router-link>
                                    </div>
                                    <div class="w-1/2 text-center">
                                        <router-link to="/signup"><a
                                                class="text-center text-black underline hover:text-blue-400">Forget
                                                Password?</a></router-link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
import NavbarComponent from "../../components/NavbarMenu.vue";
import FooterComponent from "../../components/FooterMenu.vue";
let userInfo = localStorage.getItem("UserID");

export default {
    name: "login-page",
    components: {
        NavbarComponent,
        FooterComponent
    },
    data() {
        return {
            UserID: JSON.parse(userInfo),
            email: '',
            password: '',
            emailtaken: false,
            success: false,
            remember: false
        }
    },
    methods: {
        submitForm() {
                const checkuser = this.UserID.filter(user => user.email == this.email && user.password == this.password)
                if (this.email == checkuser[0].email && this.password == checkuser[0].password && checkuser[0].type == 'customer') {
                    this.succes = true
                    localStorage.setItem('User', JSON.stringify(checkuser))
                    this.$router.push('/cmlanding')
                }else if (this.email == checkuser[0].email && this.password == checkuser[0].password && checkuser[0].type == 'admin') {
                    this.succes = true
                    localStorage.setItem('User', JSON.stringify(checkuser))
                    this.$router.push('/amlanding')
                } else {
                    alert('Login Fail')
                }
        },
    },
}
</script>