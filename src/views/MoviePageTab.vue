<template>
    <NavbarComponent></NavbarComponent>
    <div class="bg-gray-800 min-h-screen flex flex-col items-center pt-20"
        style="background-size: cover; background-repeat: no-repeat;">
        <div class="container mx-1 my-5 px-4 py-14 bg-gray-700">
            <div class="flex flex-col md:flex-row">
                <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-4 py-4">
                    <img :src="movie.poster" class="w-full h-full object-cover object-center rounded-2xl" alt="">
                </div>
                <div class="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 px-4 py-4">
                    <h1 class="text-3xl text-white font-bold mb-4">{{ movie.title }}</h1>
                    <div class="flex  mt-1">
                        <p class="text-gray-300 bg-gray-800 rounded-xl text-xl pt-2 pb-2 pl-3 pr-3 mt-1">{{ movie.genre }}
                        </p>
                    </div>
                    <div class="flex flex-col w-1/6 bg-gray-800 rounded-xl mt-1">
                        <p class="text-gray-300 text-xl pl-2 pt-2 mb-4">&#11088; {{ movie.rating }}/10</p>
                    </div>
                    <div class="flex flex-col w-1/4 bg-gray-800 rounded-xl mt-1">
                        <p class="text-gray-300 text-xl pl-2 pt-2 mb-4">&#128337; {{ movie.duration }}</p>
                    </div>
                    <div class="flex flex-col w-2/3 bg-gray-800 rounded-xl mt-1">
                        <p class="text-gray-300 text-xl pl-4 p-5">{{ movie.description }}</p>
                    </div>
                    <p class="text-gray-300 mb-4 mt-1">{{ movie.date }}</p>
                </div>
            </div>
            <div v-if="showCinemaSelection">
                <div class="mr-4 w-full shadow rounded">
                    <div class="px-6 py-4 bg-white">
                        <div class="text-lg font-semibold mb-2">Select Cinema</div>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="cinema in cinemas" :key="cinema.id">
                                <button
                                    class="focus:outline-none bg-white border border-gray-300 rounded-lg py-2 px-20 w-full justify-center items-center flex transition duration-150 ease-in-out"
                                    :class="{ 'bg-blue-800 text-white': selectedCinema.id === cinema.id }"
                                    @click="selectCinema(cinema)">
                                    {{ cinema.name }}
                                </button>
                            </div>
                        </div>
                        <div class="flex justify-between" v-if="selectedCinema != ''">
                            <div class=" mt-4 text-xl">Location Available :</div>
                            <select class='bg-white border border-gray-700 rounded-lg my-3 py-2 px-10' id="location"
                                v-model="selectedLocation">
                                <option disabled value="">Please select a location</option>
                                <option v-for="location in selectedCinema.locations" :key='location.id' :value='location'>{{
                                    location.name }}</option>
                            </select>
                            <button v-if="selectedLocation != null"
                                class="my-2 w-20 bg-white border border-gray-700 rounded-lg py-2 px-5"
                                @click="showCinemaSelection = false; showScreenSelection = true;">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="showScreenSelection && selectedCinema != ''">
                <div class="mr-4 w-full shadow rounded">
                    <div class="px-6 py-4 bg-white">
                        <div class="text-lg font-semibold mb-2">Select Screen</div>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="screen in screens" :key="screen.id">
                                <button
                                    class="focus:outline-none bg-white border border-gray-300 rounded-lg py-2 px-20 w-full justify-center items-center flex transition duration-150 ease-in-out"
                                    :class="{ 'bg-blue-800 text-white': selectedScreen === screen.name }"
                                    @click="selectScreen(screen.name)">
                                    {{ screen.name }}
                                </button>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button class="my-2 mx-3 w-20 bg-white border border-gray-700 rounded-lg py-2 px-5"
                                @click="showCinemaSelection = true">
                                Back
                            </button>
                            <button v-if="selectedScreen != ''"
                                class="my-2 w-20 bg-white border border-gray-700 rounded-lg py-2 px-5"
                                @click="showScreenSelection = false; showCinemaSelection = false; showDateSelection = true;">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="showDateSelection && selectedScreen != ''">
                <div class="overflow-x-auto py-3 -mx-2">
                    <div class="flex px-2">
                        <div class="flex space-x-2">
                            <button
                                class="focus:outline-none bg-white border border-gray-300 rounded-xl w-full py-2 px-5 justify-center items-center transition duration-150 ease-in-out"
                                v-for="dateObj in dateList" :key="dateObj.date"
                                :class="{ 'bg-blue-800 text-white': selectdate === dateObj.day }"
                                @click="selectDate(dateObj.day)">
                                <div>{{ dateObj.date }}</div>
                                <div>{{ dateObj.day }}</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div class='flex px-2' v-if="selectdate != ''">
                    <button v-for="datetime in time" :key='datetime.id'
                        class="p-4 mt-5 mr-3 bg-gray-500 rounded-lg text-white"
                        :class="{ 'bg-blue-800 text-white': selecttime === datetime.period }"
                        @click="selectTime(datetime.period)">{{ datetime.period }}</button>
                </div>
                <div v-if="selecttime != ''" class='mt-5'>
                    <seatRow ref="seatRow" :selectedSeats="Seats" @seats-selected="onSeatsSelected"></seatRow>
                </div>
                <div class="flex justify-end mt-4 text-center">
                    <button class="my-2 w-20 bg-white border border-gray-700 rounded-lg py-2 px-5"
                        @click="showScreenSelection = true">
                        Back
                    </button>
                    <button class="my-2 text-center bg-white border border-gray-700 rounded-lg py-2 px-5" @click="booking();">
                        Confirm
                    </button>
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
import seatRow from '../components/SeatRow.vue';
import moment from 'moment';

export default {
    name: "movie-page",
    components: {
        NavbarComponent,
        FooterComponent,
        seatRow
    },
    data() {
        return {
            movie: movieall,
            cinemas: [
                {
                    id: 1,
                    name: 'Cinema 1',
                    locations: [
                        { id: 1, name: 'Location 1' },
                        { id: 2, name: 'Location 2' }
                    ]
                },
                {
                    id: 2,
                    name: 'Cinema 2',
                    locations: [
                        { id: 3, name: 'Location 3' },
                        { id: 4, name: 'Location 4' }
                    ]
                },
                {
                    id: 3,
                    name: 'Cinema 3',
                    locations: [
                        { id: 5, name: 'Location 5' },
                        { id: 6, name: 'Location 6' }
                    ]
                },
                {
                    id: 4,
                    name: 'Cinema 4',
                    locations: [
                        { id: 7, name: 'Location 7' },
                        { id: 8, name: 'Location 8' }
                    ]
                }
            ],
            screens: [
                { id: 1, name: 'Screen 1' },
                { id: 2, name: 'Screen 2' },
                { id: 3, name: 'Screen 3' },
                { id: 4, name: 'Screen 4' },
            ],
            options: [
                { id: 1, name: 'Radkrabang' },
                { id: 2, name: 'Seacon Square' },
                { id: 3, name: 'Robinson' },
                { id: 4, name: 'Siam Square' },
            ],
            time: [
                { id: 1, period: '11:00' },
                { id: 1, period: '13:00' },
                { id: 1, period: '15:00' },
            ],
            rows: [
                {
                    name: 'A',
                    seats: [
                        { id: 1, taken: false },
                        { id: 2, taken: false },
                        { id: 3, taken: false },
                        { id: 4, taken: true },
                        { id: 5, taken: false }
                    ]
                },
                {
                    name: 'B',
                    seats: [
                        { id: 6, taken: false },
                        { id: 7, taken: false },
                        { id: 8, taken: false },
                        { id: 9, taken: true },
                        { id: 10, taken: false }
                    ]
                }
            ],
            Seats: [],
            selectedLocation: null,
            dateList: [],
            selectdate: '',
            selecttime: '',
            currentDate: moment().startOf('month'),
            daysInMonth: 0,
            selectedCinema: '',
            selectedScreen: '',
            showScreenSelection: false,
            showDateSelection: false,
            showCinemaSelection: true,
        };
    },
    mounted() {
        const id = this.$route.params.id;
        this.movie = this.getMovieById(id);
    },
    created() {
        this.initDateList();
    },
    methods: {
        getMovieById(id) {
            const movies = this.movie;
            return movies.find(movie => movie.id == id);
        },

        selectCinema(cinema) {
            this.selectedCinema = cinema;
            this.selectedLocation = null;
        },
        selectScreen(screen) {
            this.selectedScreen = screen;
        },
        selectDate(dateList) {
            this.selectdate = dateList;
            this.selecttime = '';
        },
        selectTime(time) {
            this.selecttime = time;
        },
        onSeatsSelected(selectedSeats) {
            this.Seats = selectedSeats;
        },
        initDateList() {
            this.daysInMonth = moment(this.currentDate).daysInMonth();
            for (let i = moment().format('DD'); i <= this.daysInMonth; i++) {
                const date = moment(`${this.currentDate.format('YYYY-MM')}-${i}`, 'YYYY-MM-DD');
                this.dateList.push({
                    date: date.format('MMMM'),
                    day: date.format('dddd DD')
                });
            }
        },
        booking() {
            this.Seats.forEach(element => {
                element.status = 'occupied';
                element.isSelected = false;
            });
            localStorage.setItem('booking', JSON.stringify([{ movie: this.movie, cinema: this.selectedCinema, location: this.selectedLocation, screen: this.selectedScreen, date: this.selectdate, time: this.selecttime, seats: this.Seats }]))
            this.Seats = [];
            this.$refs.seatRow.selectedSeats = []
            alert('Booking successfully')
        }
    },
};
</script>
<style scoped>
.container {
    width: 60%;
}
</style>
