/*
  This is code carried over from the GIT417 course
*/

// Function used to validate the form
function validateForm(event) {
  // Prevents the default behavior of a button within a form tag which refreshes the page
  event.preventDefault();
  // Creates variables for code reuse
  var isFormInvalid = false;
  var form = document.getElementById('form');

  // Try/catch handles errors
  try {
    // Creates variables to grab the values of our inputs
    var formName = document.getElementById('formName');
    var formEmail = document.getElementById('formEmail');
    var formPhone = document.getElementById('formPhone');

    // Checks if both values are blank
    if(formName.value == '' && formEmail.value == '' && formPhone.value == '') {
      throw 'Fields cannot be left blank';
    }

    // Checks if formName value is blank
    if(formName.value == '') {
      throw 'Name field cannot be left blank';
    }

    // Checks if formEmail value is blank
    if(formEmail.value == '') {
      throw 'Email field cannot be left blank';
    }

    // Checks if formEmail value is blank
    if(formPhone.value == '') {
      throw 'Phone field cannot be left blank';
    }

    // Uses built-in method checkValidity to check for valid email
    if(!formEmail.checkValidity()) {
      throw 'Email is not valid';
    }
  } catch(err) {
    // Sets isFormValid to true because there are errors
    isFormInvalid = true;
    window.hasErrors = isFormInvalid;
    // Grab the div [role='alert'] if there is one and set it variable errorDiv
    var errorDiv = document.querySelector('div [role="alert"]');
    // If the error div exists/truthy remove it so we can add our success modal
    if(errorDiv) {
      // Remove the error div from the NodeList
      errorDiv.remove();
    }

    // Using the results from createErrorModal appends child element to the form
    if(isFormInvalid) {
      form.appendChild(createErrorModal(err));
    }
    return;
  } finally {
    // Appends success modal if form was successfully validated
    if(!isFormInvalid) {
      // Grab the div [role='alert'] if there is one and set it variable errorDiv
      var errorDiv = document.querySelector('div [role="alert"]');
      // If the error div exists/truthy remove it so we can add our success modal
      if(errorDiv) {
        // Remove the error div from the NodeList
        errorDiv.remove();
      }
      // Reset errorCount
      window.hasErrors = false;
      // Append to the form a success modal with the artwork label
      form.appendChild(createSuccessModal());
    }
  }
}

// Function that creates an error modal
function createErrorModal(type) {
  var div = document.createElement('div');
  div.innerHTML = '<div role="alert" class="shadow max-w-lg mt-8 transition transform duration-500">' + '<h2 class="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error</h2>' + '<div class="border border-t-0 border-red-400 rounded-b bg-red-100 text-red-700 py-2 px-4"><p>' + type + '</p>' + '</div>' + '</div>';
  return div;
}

// Function that creates a success modal
function createSuccessModal() {
  var div = document.createElement('div');
  div.innerHTML = '<div class="mt-8 bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">' + '<div class="flex">' +
      '<div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>' +
      '<div>' +
        '<p class="font-bold">Successfully submitted</p>' +
        '<p class="text-sm">We will contact you in 2-3 business days about your interest in our raffle!</p>' +
      '</div>' +
    '</div>' +
  '</div>';
  return div;
}

// Adds button event listener
function addListeners() {
  // Create variable for submit button
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', validateForm, false);
}

// Adds button attach
function attachEvents() {
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.attachEvent('onclick', validateForm);
}

// Add event listeners to button on load if not IE8
if(window.addEventListener) {
  window.addEventListener('load', addListeners, false);
} else {
  window.attachEvent('onload', attachEvents);
}