const currencyE1_one = document.getElementById('currency-one');
const amountE1_one = document.getElementById('amount-one');
const currencyE2_two = document.getElementById('currency-two');
const amountE2_two = document.getElementById('amount-two');
const rateE1 = document.getElementById('rate');

// Fetch exchange rates and update the DOM
async function calculate() {
    const currency_one = currencyE1_one.value;
    const currency_two = currencyE2_two.value;
    const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`);
    const data = await response.json();
    const rate = (data.rates[currency_two] / data.rates[currency_one]);
    rateE1.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    amountE2_two.value = (amountE1_one.value * (rate)).toFixed(2);
}

// Event listeners
currencyE1_one.addEventListener('change', calculate);
amountE1_one.addEventListener('input', calculate);
currencyE2_two.addEventListener('change', calculate);
amountE2_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyE1_one.value;
    currencyE1_one.value = currencyE2_two.value;
    currencyE2_two.value = temp;
    calculate();
});

calculate();