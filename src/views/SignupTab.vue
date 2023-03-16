<template>
  <div>
    <navbar-component></navbar-component>
    <main>
      <section class="absolute w-full h-full">
        <div class="absolute w-full h-full bg-gray-900" style="background-size: cover; background-repeat: no-repeat;"
          :style="{ 'background-image': 'url(' + require('../assets/img/bg.jpg') + ')' }"></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign Up
                    </h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form @submit.prevent="submitForm">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password">Username</label><input type="text" id="username" v-model="username"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Username" style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password">Email</label><input type="email" id="email" v-model="email"
                        autocomplete="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email" style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password">Password</label><input type="password" autocomplete="current-password"
                        v-model="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password" style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password">Confirm-Password</label><input type="password" v-model="confirmpassword"
                        autocomplete="new-password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password" style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit" style="transition: all 0.15s ease 0s;">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex flex-wrap mt-6">
                <div class="w-1/2">
                  <a href="#pablo" class="text-gray-300"><small>Forgot password?</small></a>
                </div>
                <div class="w-1/2 text-right">
                  <a href="#pablo" class="text-gray-300"><small>Create new account</small></a>
                </div>
              </div>
            </div>
          </div>
        </div>
    <footer-component></footer-component>
      </section>
    </main>
  </div>
</template>
<script>
import NavbarComponent from "../components/NavbarMenu.vue";
import FooterComponent from "../components/FooterMenu.vue";


export default {
  name: "signup-page",
  components: {
    NavbarComponent,
    FooterComponent
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    }
  },
  methods: {
    submitForm() {
      if (this.confirmpassword != this.password) {
        alert("Not the same");
      }
      else {
        localStorage.setItem('UserID', JSON.stringify([{username: this.username, password: this.password}]))
        this.$router.push('/login')
      }
      this.username = '',
      this.email = '',
      this.password = '',
      this.confirmpassword = ''
    }
  }
}
</script>