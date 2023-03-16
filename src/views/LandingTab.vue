<template>
    <navbar-component></navbar-component>
    <div class="dashboard bg-gray-800 min-h-screen flex flex-col items-center pt-20" style="background-size: cover; background-repeat: no-repeat;"
    :style="{ 'background-image': 'url(' + require('../assets/img/Movie_landing_page.jpg') + ')' }">
        <h1 class="rounded-lg bg-gray-800 bg-opacity-70 text-7xl font-bold p-8 mb-12 text-white">Welcome to IT'S SHOWTIME</h1>
            <div class="container flex flex-wrap justify-center">
                <div class="card bg-gray-800 rounded-lg bg-opacity-90 shadow-md p-12 m-4 flex flex-col items-center hover:-rotate-2 ">
                    <h2 class="card-title text-2xl font-bold mb-4 text-blue-500">Book a Movie</h2>
                    <p class="card-text text-lg text-center mb-8 text-white">Browse and book your favorite movies.</p>
                    <router-link to="/catalog">
                        <a class="cta-button bg-blue-500 hover:bg-blue-800 text-white rounded-full px-6 py-3 font-semibold transition-all duration-300 ease-in-out">View
                        Movies </a></router-link>
                </div>
                <div class="card bg-gray-800 rounded-lg bg-opacity-90 shadow-md p-8 m-4 flex flex-col items-center hover:-rotate-2">
                    <h2 class="card-title text-2xl font-bold mb-4 text-blue-500">My Bookings</h2>
                    <p class="card-text text-lg text-center mb-8 text-white">View and manage your upcoming bookings.</p>
                    <router-link to="/bookings"
                        class="cta-button bg-blue-500 hover:bg-blue-800 text-white rounded-full px-6 py-3 font-semibold transition-all duration-300 ease-in-out">View
                        Bookings</router-link>
                </div>
            </div>
        </div>
        <footer-component></footer-component>
</template>

<script>
import NavbarComponent from "../components/NavbarMenu.vue";
import FooterComponent from "../components/FooterMenu.vue";

export default {
    name: "dashboard-page",
    components: {
        NavbarComponent,
        FooterComponent
    },
}
</script>

<style scoped>
.title {
    font-family: "Poppins", sans-serif;
}

.card {
    max-width: 360px;
}

.card-title {
    font-family: "Poppins", sans-serif;
}

.cta-button {
    font-family: "Poppins", sans-serif;
}</style>