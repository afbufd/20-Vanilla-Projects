const toggle = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const openBtn = document.getElementById('open');
const modal = document.getElementById('modal');
const form = document.querySelector('.modal-form');
const submitBtn = document.getElementById('submitBtn');


function closeModal() {
    modal.classList.add('close');
}

function openModal() {
    modal.classList.add('show-modal');
}

modal.addEventListener('animationend', (e) => {
    if(e.animationName === 'modalclose') {
        // Remove both classes from modal
        modal.classList.remove('show-modal', 'close');
    }
})

// Toggle nav
toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
})

// Show modal
openBtn.addEventListener('click', openModal);
// Hide modal
closeBtn.addEventListener('click', closeModal);
// Hide modal outside click
window.addEventListener('click', (e) =>{
    e.target == modal ? closeModal() : false
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    closeModal();
})