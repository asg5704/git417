// Gets the #cart DOM element and assigns to a variable
const cartElement = document.getElementById('cart');

// Function to add tickets to cart
const addToCart = (evt) => {
  // Prevents the default behavior of <button> in a form which refreshes the page
  evt.preventDefault();
  // Constants for adult & child prices
  const ADULT_PRICE = 55;
  const CHILD_PRICE = 35;

  // Tickets object with adult, child and total
  const tickets = {
    adult: Number(document.getElementById('adult-ticket').value),
    child: Number(document.getElementById('child-ticket').value),
    total: () => tickets.adult + tickets.child,
    getAdults: () => tickets.adult * ADULT_PRICE,
    getChild: () => tickets.child * CHILD_PRICE,
    getTotal: () => (tickets.adult * ADULT_PRICE) + (tickets.child * CHILD_PRICE)
  }
  // Short circuits the addToCart function if zero or negative values
  if(tickets.adult <= 0 || tickets.child <= 0) {
    return;
  }
  // Hide the #no-cart DOM element
  document.getElementById('no-cart').style.display = 'none';

  // Creates HTML template to add to the #cart element
  const htmlTemplate = `
    <span>${tickets['adult']}x Adult <span class="text-right">$${tickets['getAdults']()}</span></span>
    <span>${tickets['child']}x Child <span class="text-right">$${tickets['getChild']()}</span></span>
    <strong class="mt-8">(${tickets['total']()}x) Subtotal <span class="text-right">$${tickets['getTotal']()}</span></strong>
  `;

  // Appends the htmlTemplate to the innerHTML & appends a 'Purchase' button to the #cart passing in the total as a parameter
  cartElement.innerHTML = htmlTemplate;
  cartElement.appendChild(createPurchaseBtn(tickets['getTotal']()));
};

// Creates the purchase button & returns a button element
const createPurchaseBtn = (amount) => {
  // Creates the button
  const button = document.createElement('button');
  // Adds TailwindCSS classes to the classList
  button.classList.value = 'block w-full mt-8 bg-gray-500 hover:bg-gray-400 font-semibold text-white px-4 py-2 rounded-lg shadow';
  // Changes the buttons text
  button.innerText = 'Purchase';
  // Adds an event listener for a click, stops the event propagation to parent button
  button.addEventListener('click', (evt) => {
    evt.stopPropagation();
    alert(`Your credit card will be charged $${amount}`);
  }, false);
  // returns button element
  return button;
}

// Event listener for Add to Cart button, points to the addToCart function
const btn = document.getElementById('addToCartBtn');
btn.addEventListener('click', addToCart, false);

