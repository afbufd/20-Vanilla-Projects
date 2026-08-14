const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied'); // All Acts like an array
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Turn String -> Integer
let ticketPrice = parseInt(movieSelect.value);// Avengers returns 10 as a string

//Update the seat count and total cost
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatLength = selectedSeats.length;
    count.innerText = selectedSeatLength;
    total.innerText = selectedSeatLength * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') 
        && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});








