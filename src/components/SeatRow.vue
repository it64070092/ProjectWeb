<template>
    <div class="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <ul class="flex items-center justify-center gap-7 mb-10">
            <li>
                <div class="bg-gray-600 m-auto h-6 w-6"></div>
                <small>N/A</small>
            </li>
            <li>
                <div class="bg-blue-400 m-auto h-6 w-6"></div>
                <small>Selected</small>
            </li>
            <li>
                <div class="bg-white m-auto h-6 w-6"></div>
                <small>Occupied</small>
            </li>
        </ul>

        <div class="perspective-1000 container mb-10">
            <div class="flex justify-center items-center">
                <div class=" bg-white h-20 w-1/2 mb-6 skew-y-10 shadow-2xl"></div>
            </div>
            <div class="grid grid-cols-9 gap-0">
                <div class="col-start-3 col-span-5 grid grid-rows-6 gap-3 items-center">
                    <div class="row-start-1"></div>
                    <template v-for="(seat, seatIndex) in seatRows[0]" :key="seatIndex">
                        <div class="row-start-1 text-center">{{ seat.column }}</div>
                    </template>
                    <template v-for="(row, rowIndex) in seatRows" :key="rowIndex">
                        <div class="col-start-1 col-span-1 text-center">{{ row[0].row }}</div>
                        <template v-for="(seat, seatIndex) in row" :key="seatIndex">
                            <button
                                class="bg-gray-500 h-12 w-14 border border-gray-400 rounded-tl-lg rounded-tr-lg cursor-pointer"
                                :class="{
                                    'bg-blue-800': seat.status === 'selected',
                                    'bg-white': seat.status === 'occupied',
                                }" @click="onSeatSelect(rowIndex, seatIndex);">
                            </button>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <p class="text">
            You have selected <span id="count">{{ selectedSeats.length }}</span> seats for a price of $<span id="total">{{
                selectedSeats.length * movie[0].price }}</span>
        </p>
    </div>
</template>

<script>
import movieall from '../components/movie.json';
import seatsall from '../components/seatRow.json'
var bookings = localStorage.getItem('booking')

export default {
    data() {
        return {
            movie: movieall,
            seatRows: seatsall,
            selectedSeats: [],
            bookingseat: JSON.parse(bookings) || []
        };
    },
    props: {
        selectdate: {
            type: String,
            required: true
        },
        selecttime: {
            type: String,
            required: true
        },
        selectedScreen: {
            type: String,
            required: true
        },
        selectedCinema: {
            type: Object,
            required: true
        },
        selectedLocation: {
            type: Object,
            required: true
        }
    },
    mounted() {
        const id = this.$route.params.id;
        this.movie = this.movie.filter(movie => movie.id == id)
        const values = [];
        const columns = [];

        for (var items in this.bookingseat) {
            if (this.bookingseat[items].movie.id == id
            && this.bookingseat[items].location.id == this.selectedLocation.id
            && this.bookingseat[items].date == this.selectdate
            && this.bookingseat[items].screen.id == this.selectedScreen.id
            && this.bookingseat[items].cinema.id == this.selectedCinema.id
            && this.bookingseat[items].time == this.selecttime
            ) {
                for (var seats in this.bookingseat[items].seats) {
                    values.push(this.bookingseat[items].seats[seats].id)
                    columns.push((this.bookingseat[items].seats[seats].id - 1) % 8)
                }
            }

        }
        this.seatRows.forEach(seatRow => {
            for (items in this.bookingseat) {
                for (let num in columns) {
                    for (let item in values) {
                        if (seatRow[columns[num]].id == values[item]) {
                            seatRow[columns[num]].status = 'occupied'
                        }
                    }
                }
            }

        })
    },
    methods: {
        onSeatSelect(rowIndex, seatIndex) {
            const seat = this.seatRows[rowIndex][seatIndex];
            if (seat.status !== "occupied") {
                seat.status = seat.isSelected ? "available" : "selected";
                seat.isSelected = !seat.isSelected;
                this.$emit('seats-selected', this.selectedSeats);
                this.$emit('seats-booking', this.bookingseat);
                if (seat.isSelected) {
                    this.selectedSeats.push(seat);
                } else {
                    const index = this.selectedSeats.findIndex(
                        (s) => s.row === seat.row && s.column === seat.column
                    );
                    this.selectedSeats.splice(index, 1);
                }
            }
        },
    },
};

</script>

<style scoped>
.transform {
    transition: transform 0.5s ease-out;
}

.transform:hover {
    transform: translateY(-10px);
}
</style>