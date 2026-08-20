const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn  = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const wealthEl = document.getElementById('total-wealth');
const msgError = document.getElementById('msg-error');

let wealthVisible = false;
const MAX_USERS = 10;

let data = [];

let currView = data;

getRandomUser();
getRandomUser();
getRandomUser();

function showError(msg) {
    msgError.classList.add('error');
    msgError.innerText = msg;
}

function clearError() {
    msgError.innerText = '';
    msgError.classList.remove('error');
}

// Fetch random user and add money
async function getRandomUser() {
    // Safety Net
    if (data.length >= MAX_USERS) {
        showError(`Maximum of ${MAX_USERS} users reached.`);
        return;
    }
    
    // Call API to get random users
    const response = await fetch('https://randomuser.me/api');
    const json = await response.json();
    // Json holds results and info and we grab results that has an array with 1 user object
    const user = json.results[0];
    
    // Grab the users first and last name 
    // Create the users amount in money
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    
    addData(newUser);
}

// Add new obj to data arr
function addData(userObj) {
    data.push(userObj);

    // Render list again and set new currView while clearing errors
    updateDOM();
    
    // If wealth is visible run calcTotalWealth()
    if (wealthVisible) {
        calcTotalWealth();
    }
    
    // Every we click add user once data.length reaches
    // MAX_USERS show err and disable button
    if (data.length >= MAX_USERS) {
        showError(`Maximum of ${MAX_USERS} users reached.`);
        addUserBtn.disabled = true;
        addUserBtn.innerText = 'Max users';
    }
}

function doubleMoney() {
    // Reasign data to an array of user objects with money doubled
    data = data.map( user => {
        // REMEMBER THAT .map RETURNS AN ARRAY
        return {...user, money: user.money * 2}; // Return an object of user
        // user.money doesn't work because we are just returning 
        // an array of current users money * 2, e. [251808,622250,1580233]
    });

    // Render list again and set new currView while clearing errors
    updateDOM();

    if(wealthVisible) {
        calcTotalWealth();
    }
}

function sortByRichest() {
    // Sort in desc order
    data.sort( (a,b) => b.money - a.money);
    
    // Render list again and set new currView while clearing errors
    updateDOM();
}

function showOnlyMillionaires() {
    // Create new data arr that holds users with more than 1 million dollars
    const millionaires = data.filter( user => user.money >= 1000000)
    // .filter() creates a new arr where the statement is true
    
    // Pass in a new currView
    // Render list again and set new currView while clearing errors
    updateDOM(millionaires);

    // Calculate based on curr view
    calcTotalWealth();
}

// Sum of wealth
function calcTotalWealth() {
    wealthVisible = true;

    // Calc sum of wealth with reduce()
    const totalWealth = currView.reduce( (total, user) => total + user.money, 0);
    // Fill div with formatted money
    wealthEl.innerHTML = `<h3>Total Wealth: 
        <strong>${formatMoney(totalWealth)}</strong></h3>`;
}

// Update DOM
function updateDOM(providedData = data) {
    // Set currView to the data arr to be the truth
    currView = providedData;
    
    // Clear error div
    clearError();
    
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    // For each user in data create a div with class="person" 
    // that holds users name and money then append to main
    providedData.forEach( user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    }); 
}

// Format number as money
function formatMoney(number) {
    // Regex Formatter
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calcTotalWealth);

