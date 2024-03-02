const customButton2 = document.getElementById('custom-btn');
const customTipForm = document.querySelector('.custom-tip-form');

customButton2.addEventListener('click', function() {
// Hide the button
this.style.display = 'none';

// Show the form
customTipForm.style.display = 'inline-block';
});

//this Script toggles user input
//I love breaking my codes not into SRP functions but Single responsiblity files