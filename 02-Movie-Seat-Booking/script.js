const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied'); // All Acts like an array
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const selectAll = document.getElementById('selectAll');

populateUI();

// Turn String -> Integer
let ticketPrice = parseInt(movieSelect.value);// Avengers returns 10 as a string

// Save the selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update the seat count and total cost
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
 
    // Copy selected seats into arr
    // Map through array
    // return a new array of indexes
    const seatsIndex = [...selectedSeats].map( (seat) => [...seats].indexOf(seat));// indexOf gets the 0-index of the curr seat);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatLength = selectedSeats.length;
    count.innerText = selectedSeatLength;
    total.innerText = selectedSeatLength * ticketPrice;
}

// Get Data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach( (seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {//indexOf(3) -> 2 in [1,2,3]
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    checkAllSelected();
}

function checkAllSelected() {
    const allSelected = seats.length > 0 && [...seats].every( seat => seat.classList.contains('selected'));
    selectAll.classList.toggle('active', allSelected);
}

function selectAllSeats() {
    const isActive = selectAll.classList.toggle('active');
    // Local storage can only store strings
    // localStorage.setItem('selectAllButton', isActive); <- not needed now with checkAllSelected()
    // isActive === true which gets turned into "true"
    seats.forEach( (seat) => {
        seat.classList.toggle('selected', isActive);
    });
    updateSelectedCount();
}

selectAll.addEventListener('click', () => {
    selectAllSeats();
});

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;// change the value of the ticketPrice to update the total
    setMovieData(e.target.selectedIndex, e.target.value);// value returns the ticket price
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {// e for element clicked
    if (e.target.classList.contains('seat') 
        && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
    checkAllSelected();
});

// Initial count and total set
// Show seats and price on load
updateSelectedCount();





