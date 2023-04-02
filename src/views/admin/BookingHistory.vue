<template>
    <NavbarComponent @search-query-updated="updateSearchQuery" @genre-query-updated="updateGenreQuery"></NavbarComponent>
    <div class="bg-gray-700  min-h-screen pt-20">
        <h1 class="text-2xl font-bold text-white pt-5 p-4 bg-gradient-to-r from-blue-800 to-transparent mb-4">Booking History</h1>
        <div v-if="bookings.length === 0" class="text-white text-center py-4">
            You have no bookings yet.
        </div>
        <div v-else>
            <div v-for="(booking, index) in bookings" :key="index" class="mb-4 ml-2 p-4 bg-gray-400 rounded-lg">
                <h2 class="text-lg font-bold">{{ booking.movie.title }}</h2>
                <p class="text-white">{{ booking.cinema.name }} - {{ booking.screen }}</p>
                <p class="text-white">{{ booking.date }} : {{ booking.time }}</p>
                <p class="text-white">Seats: <span class="seat-list text-white text-md">{{ booking.seats.map(seat =>
                    seat.row + seat.column).join(', ') }}</span></p>
                <p class="text-white">Price: {{ booking.price }} Dollars</p>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="cancelBooking(index)">Cancel</button>
            </div>
        </div>
    </div>
    <FooterComponent></FooterComponent>
</template>
<script>
import NavbarComponent from "../../components/LiNavbarMenu.vue";
import FooterComponent from "../../components/FooterMenu.vue";
export default {
    name: "booking-history-page",
    components: {
        NavbarComponent,
        FooterComponent,
        // Carousel,
        // Slide
    },
    data() {
        return {
            bookings: [],
        };
    },
    mounted() {
        this.loadBookings();
    },
    methods: {
        loadBookings() {
            const bookings = JSON.parse(localStorage.getItem("booking"));
            if (bookings) {
                this.bookings = bookings;
            }
        },
        cancelBooking(index) {
            this.bookings.splice(index, 1);
            localStorage.setItem("booking", JSON.stringify(this.bookings));
            window.location.reload();
        },
    },
};
</script>


<style>
/* Add any custom styles here */
</style>