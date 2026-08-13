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
function checkEmail(input) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not Valid')
    }
}

// Check passwords match
function passwordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

// Check password is valid
function checkPasswordRe(input) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,25}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else if(input.value.length < 6) {
        showError(input, `${getFieldName(input)} must be at least 6 characters`);
    } else if(input.value.length > 25) {
        showError(input, `${getFieldName(input)} must be less than 25 characters`);
    } else {
        showError(input, "Have 1 uppercase, number and special character")
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required
function checkRequired(inputArr) {
    inputArr.forEach( (input) => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
};

// Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPasswordRe(password);
    checkPasswordRe(password2);
    passwordsMatch(password, password2);
});

const form = document.getElementById('form');

function checkEmail2(email) {
    // emailRegex here
    // if (emailRegex.test(email.value.trim())) is true showSuccess, otherwise showError
}

function passwordsMatch2(input1, input2) {
    if(input2.value !== input2.value){
        showError(input2, 'Passwords do not match')
    }
}

function checkRequired2(inputArr) {
    inputArr.forEach((input) => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

function getFieldName2(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError();
    } else if(input.value.length > max) {
        showError();
    } else{
        showSuccess();
    }
}

function showError(input, msg) {
    const formControl2 = input.parentElement;
    formControl2.className = 'form-control error';
    const small = formControl2.querySelector('small');
    small.innerText = msg;
}

function showSuccess(input) {
    const formControl2 = input.parentElement;
    formControl2.className = 'form-control success';
}



const isBlank = (str) => !str || str.trim().length === 0; // !str checks for falsy -> null, undef, "", false, 0, NaN
// trim() -> removes whitespace by mutating the original string