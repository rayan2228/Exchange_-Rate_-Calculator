// all selectors
const currencyOneElm = document.querySelector('#currency-one');
const currencyTwoElm = document.querySelector('#currency-two');
const amountOneElm = document.querySelector('#amount-one');
const amountTwoElm = document.querySelector('#amount-two');
const rateElm = document.querySelector('#rate');
const swapElm = document.querySelector('#swap');
// Event Listeners
const allActions = () => {
  currencyOneElm.addEventListener('change', validation);
  currencyTwoElm.addEventListener('change', validation);
  amountOneElm.addEventListener('input', validation);
  swapElm.addEventListener('click', swapCurrency)
}

// validation 
const validation = () => {
  if (amountOneElm.value <= 0) {
    rateElm.innerText = "not accept negative number"
    rateElm.style.color = "#2FDD92"
  } else {
    rateElm.style.color = ""
    calculate()
  }
}
// Fetch exchange rates 
async function calculate() {
  currencyOneVal = currencyOneElm.value
  currencyTwoVal = currencyTwoElm.value
  await fetch(`https://free.currconv.com/api/v7/convert?q=${currencyOneVal}_${currencyTwoVal}&compact=ultra&apiKey=4b3e0f853d05719f6d4e`).then(response => response.json()).then(result => {
    showValue(result)
  })
}
//  show value on ui
const showValue = (data) => {
  currencyOneVal = currencyOneElm.value
  currencyTwoVal = currencyTwoElm.value
  const rate = Object.values(data)
  rateElm.innerText = `1 ${currencyOneVal} = ${rate} ${currencyTwoVal}`
  amountTwoElm.innerText = (amountOneElm.value * rate).toFixed(2)
}
//  swap currency
const swapCurrency = () => {
  const temp = currencyOneElm.value;
  currencyOneElm.value = currencyTwoElm.value;
  currencyTwoElm.value = temp;
  validation()
};

// call function
validation()
calculate()
allActions()

// https://free.currconv.com/api/v7/currencies?apiKey=4b3e0f853d05719f6d4e