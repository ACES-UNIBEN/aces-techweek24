// Select elements
const customBtn = document.getElementById("custom-btn");
const customForm = document.getElementById("custom-tip-form");
const billAmountInput = document.getElementById("bill-amount");
const numPeopleInput = document.getElementById("bill-splitters");
const tipButtons = document.querySelectorAll(".tip-buttons button");
const billPerPerson = document.getElementById("b-p-p");

const tipPerPerson = document.getElementById("t-p-p");

// Toggle custom button and form
customBtn.addEventListener("click", function() {
  customBtn.style.display = "none";
  customForm.style.display = "flex";
});

// Validate number of people
function validateNumberOfPersons() {
  const personValue = parseInt(numPeopleInput.value);
  if (personValue === 0) {
    numPeopleInput.classList.add("error-border");
  } else {
    numPeopleInput.classList.remove("error-border");
  }
}

// Update bill and tip per person
function updateBillPerPerson() {
  const billAmount = parseFloat(billAmountInput.value);
  const numPeople = parseFloat(numPeopleInput.value);
  const customTipInput = document.querySelector('.custom-input-field');
  let tipPercentage = 0;

  // Validate input values
  if (isNaN(billAmount) || isNaN(numPeople)) {
       return; // Exit if values are invalid
  }

  // Check for custom tip input first
  if (customTipInput.value !== "") {
    tipPercentage = parseFloat(customTipInput.value);
  } else {
    // If no custom tip, check for selected percentage button
    for (let i = 0; i < tipButtons.length; i++) {
      if (tipButtons[i].classList.contains("active")) {
        tipPercentage = parseFloat(tipButtons[i].textContent.replace("%", ""));
        break;
      }
    }
  }

  // Proceed with calculations only if a tip percentage is found
  if (tipPercentage > 0) {
    const bpp = (billAmount + (billAmount * (tipPercentage / 100))) / numPeople;
    const tpp = ((billAmount * (tipPercentage / 100))) / numPeople;

    billPerPerson.textContent = `$${bpp.toFixed(2)}`;
    tipPerPerson.textContent = `$${tpp.toFixed(2)}`;
  } else {
    // Handle cases where no tip percentage is selected (e.g., display message)
  }
}


// Handle tip button clicks
tipButtons.forEach(button => {
  button.addEventListener("click", function() {
    tipButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    updateBillPerPerson();
  });
});

// Call update function initially and on number input change
updateBillPerPerson();
numPeopleInput.addEventListener('onchange', validateNumberOfPersons());

 // Keyup for real-time updates


