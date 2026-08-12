const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input err msg
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show sucess outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(isBlank(username.value)) {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if(isBlank(email.value)) {
        showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email is not valid');
    }
    else {
        showSuccess(email);
    }
});

const isBlank = (str) => !str || str.trim().length === 0; // !str checks for falsy -> null, undef, "", false, 0, NaN
// trim() -> removes whitespace by mutating the original string