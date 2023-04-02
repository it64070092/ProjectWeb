<template>
  <nav class="fixed w-full flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900 mb-0 z-10">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a class="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          href="#pablo">
          IT'S SHOWTIME
        </a>
        <button
          class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button" v-on:click="toggleNavbar()">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="flex items-center mb-0">
        <input
          class="search bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text" v-model="searchQuery">
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="selectedGenre">
          <option value="">All</option>
          <option v-for="genre in genres" :value="genre" :key="genre"> {{ genre }}</option>
        </select>
      </div>
      <div v-bind:class="{ 'hidden': !showMenu, 'flex': showMenu }" class="md:flex items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <button @click="goto">
            <li class="nav-item">
              <a class="px-5 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                href="">
                <i class="fab fa-facebook-square text-lg leading-lg text-white opacity-75" /><span
                  class="ml-2">Home</span>
              </a>
            </li>
          </button>
          <li class="nav-item relative">
            <button
              class="px-5 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
              v-on:click="toggleDropdown">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" /><span class="ml-2">{{ name[0].username
              }}</span>
              <i class="fas fa-chevron-down ml-2"></i>
            </button>
            <div v-if="showLogoutPopup" class="absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-10">
              <div class="bg-white rounded-lg">
                <a class="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Profile</a>
                <button class="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" @click="logout">
                  Logout
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import movies from '../components/movie.json';
var name = localStorage.getItem('User');

export default {

  data() {
    return {
      showMenu: false,
      movies: movies, // your list of movies
      searchQuery: '',
      showLogoutPopup: false,
      selectedGenre: '',
      name: JSON.parse(name)
    }
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    toggleDropdown: function () {
      this.showLogoutPopup = !this.showLogoutPopup;
    },
    goto: function () {
      if (this.name[0].type == 'admin') {
        this.$router.push('/amlanding')
      }else if (this.name[0].type == 'customer'){
        this.$router.push('/cmlanding')
      }else{
        this.$router.push('/nmlanding')
      }
    },
    logout: function () {
      alert("Logout success");
      localStorage.removeItem('User')
      this.$router.push('/nmlanding')
      this.showLogoutPopup = false; // hide the logout popup
    }
  },
  watch: {
    searchQuery() {
      this.$emit("search-query-updated", this.searchQuery);
    },
    selectedGenre() {
      this.$emit("genre-query-updated", this.selectedGenre);
    }
  },
  computed: {
    genres() {
      return ["Drama", "Romance", "Action", "Thriller", "Adventure", "Comedy", "Animation", "Family", "Fantasy", "Horror"];
    }
  }
}
</script>

<style scoped>
.search {
  padding-right: 25rem;
}
</style>