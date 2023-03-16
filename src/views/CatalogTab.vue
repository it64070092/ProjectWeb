<template>
    <NavbarComponent @search-query-updated="updateSearchQuery" @genre-query-updated="updateGenreQuery"></NavbarComponent>
    <!-- <div>
        <carousel>
            <slide>
                <img src="https://www.themoviedb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" />
            </slide>
            <slide>
                <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" />
            </slide>
            <slide>
                <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg" />
            </slide>
        </carousel>
    </div> -->
    <div class="bg-gray-800 min-h-screen flex flex-col items-center pt-20"
        style="background-size: cover; background-repeat: no-repeat;">
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl text-white font-bold mb-4 py-4 bg-gradient-to-r from-blue-800 to-transparent pl-4 rounded-lg">Movie Catalog</h1>
            <div class="flex flex-wrap  p-4 bg-gray-700 rounded-lg">
                <div v-for="movie in filterMovies" :key="movie.id" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-4">
                    <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                        <div class="relative overflow-hidden rounded-lg shadow-md">
                            <img :src="movie.poster" class="w-full h-auto object-cover object-center" alt="">
                            <div
                                class="absolute top-0 right-0 p-4 bg-gradient-to-l from-blue-800 to-transparent rounded-md">
                                <h3 class="text-white font-bold text-lg">&#11088; Rating </h3>
                                <p class="text-white text-2xl text-right">{{ movie.rating }}</p>
                            </div>
                            <div class="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                                <h3 class="text-white font-bold text-lg">{{ movie.title }}</h3>
                                <p class="text-gray-300 text-sm">{{ movie.genre }}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <FooterComponent></FooterComponent>
</template>

<script>
import NavbarComponent from "../components/NavbarMenu.vue";
import FooterComponent from "../components/FooterMenu.vue";
import movieall from '../components/movie.json';
// import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "catalog-page",
    components: {
        NavbarComponent,
        FooterComponent,
        // Carousel,
        // Slide
    },
    data() {
        return {
            movies: movieall,
            searchQuery: "",
            selectedGenre: "",
        };
    },
    methods: {
        updateSearchQuery(value) {
            this.searchQuery = value;
        },
        updateGenreQuery(value) {
            this.selectedGenre = value;
        },
    },
    computed: {
        filterMovies() {
            return this.movies.filter((movie) =>
                movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
                (this.selectedGenre == '' || movie.genre.includes(this.selectedGenre))
            );
        }
    },
}
</script>