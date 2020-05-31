// Function to add tickets to cart
function addToCart(event) {
  // Prevents the default behavior of <button> in a form which refreshes the page
  event.preventDefault();

  // constants for adult & child prices
  var ADULT_PRICE = 55;
  var CHILD_PRICE = 35;

  // Variables for the amount of tickets
  var numberOfAdults = Number(document.getElementById('adult-ticket').value);
  var numberOfKids = Number(document.getElementById('child-ticket').value);
  var numberOfBoth = numberOfAdults + numberOfKids;

  // Variables for the prices of tickets
  var adultSubtotal = numberOfAdults * ADULT_PRICE;
  var childSubtotal = numberOfKids * CHILD_PRICE;
  var grandTotal = adultSubtotal + childSubtotal;

  // Hide the #no-cart DOM element
  document.getElementById('no-cart').style.display = 'none';

  // Creates HTML template to add to the #cart element
  var htmlTemplate = '<span>' + numberOfAdults + 'x Adult <span class="text-right">$' + adultSubtotal + '</span></span>' +
  '<span>' + numberOfKids + 'x Child <span class="text-right">$' + childSubtotal + '</span></span>' + '<strong class="mt-8">(' + numberOfBoth + 'x) Subtotal <span class="text-right">$' + grandTotal + '</span></strong>';

  // Appends the htmlTemplate to the innerHTML & appends a 'Purchase' button to the #cart passing in the total as a parameter
  // Gets the #cart DOM element and assigns to a variable
  var cartElement = document.getElementById('cart');
  cartElement.innerHTML = htmlTemplate;
  cartElement.appendChild(createPurchaseBtn(grandTotal));
};

// Creates the purchase button & returns a button element
function createPurchaseBtn (amount) {
  // Creates the button
  var button = document.createElement('button');

  // Checks if amount is zero
  if(amount == 0) {
    // Disables any click events by applying disabled attribute
    button.disabled = 'disabled';
    // Updates innerText
    button.innerText = 'Empty Cart';
    // Sets cursor icon to disabled/not-allowed
    button.style.cursor = 'not-allowed';
    // Applies different class stylings
    button.classList.value = 'block w-full mt-8 bg-gray-400 font-semibold text-gray-600 px-4 py-2 rounded-lg shadow'
  } else {
    // Adds TailwindCSS classes to the classList
    button.classList.value = 'block w-full mt-8 bg-gray-500 hover:bg-gray-400 font-semibold text-white px-4 py-2 rounded-lg shadow';
    // Changes the buttons text
    button.innerText = 'Purchase';
    // Adds an event listener for a click, stops the event propagation to parent button
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      alert('Your credit card will be charged $' + amount);
    }, false);
  }
  // returns button element
  return button;
}

// Event listener for Add to Cart button, points to the addToCart function
var btn = document.getElementById('addToCartBtn');
btn.addEventListener('click', addToCart, false);

// Event listener for input changes to blank/negative values
var childInput = document.getElementById('child-ticket')
  .addEventListener('change', createChangeListener, false)
var adultInput = document.getElementById('adult-ticket')
  .addEventListener('change', createChangeListener, false)

// Creates a change listener for inputs and evaluates their value
function createChangeListener(event) {
  // Parses event.target.value as a number instead of a string
  var input = Number(event.target.value);
  // Checks if input is empty or less than zero
  if(input == '' || input < 0) {
    event.target.value = 0;
  }
}
