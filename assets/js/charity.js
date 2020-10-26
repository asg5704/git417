// Custom object/class RaffleEntry
    // constructor are the name, email, and phone values
    function RaffleEntry(name, email, phone, pieces) {
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.pieces = pieces;
    }

    // Function that checks if
    function createUniqueArray(arr) {
      // Instantiate an empty array
      var uniqueArr = [];

      // Loops through each item in the array
      for (var i = 0, length = arr.length; i < length; i++) {
        //Check if the item already exists and adds it to the uniqueArray array
        if(uniqueArr.indexOf(arr[i]) == -1) {
          uniqueArr.push(arr[i]);
        }
      }
      // Returns a unique array
      return uniqueArr;
  }

    // Function that randomly generates an index for
    function generateRandomEntry(nodeList) {
      // Instantiates an empty array and random entries count
      var tempArray = [];
      var numberOfChecked = Math.floor(Math.random() * nodeList.length);

      // If we get a zero value, just put 1
      if(numberOfChecked == 0) {
        numberOfChecked = 1;
      }

      // Loops through the random entries count and creates a random index
      for(var i = 0; i < numberOfChecked; i++) {
        // Generate a random index
        var randomIndex = Math.floor(Math.random() * nodeList.length);

        // Push the node into our temporary array
        tempArray.push(nodeList[randomIndex].value);
      }

      // Returns the value of a uniqueArray
      return createUniqueArray(tempArray);
    }

    // Creates a RaffleEntry
    function createRaffleEntry() {
      // Variables for the current values in the form inputs
      var currentName = document.getElementById('formName').value;
      var currentEmail = document.getElementById('formEmail').value;
      var currentPhone = document.getElementById('formPhone').value;
      var pieces = []; // Empty array

      // Gets all the checkbox inputs into a RadioNodeList
      var piecesNodelist = document.forms[0].elements["charityPieces"];

      // Loops through each checkbox and sees which items are checked
      piecesNodelist.forEach(function(checkbox) {
        if(checkbox.checked) {
          pieces.push(checkbox.value)
        }
      });

      // If no Charity Item is selected generate randomly
      if(pieces.length === 0) {
        pieces = generateRandomEntry(piecesNodelist);
      }

      // Creates a new instantiation of the RaffleEntry class/object
      var entry = new RaffleEntry(currentName, currentEmail, currentPhone, pieces);

      // Use addEntryToTable function to add entries to global entries variable
      addEntryToTable(entry);
    }

    // Takes an entry parameter and adds it to the end of the global entries variable
    function addEntryToTable(raffleEntry) {
      // Short-circuits the function if there are errors
      if(window.hasErrors) {
        return;
      }

      // Grabs the #tableBody and assigns it to a variable
      var tableBody = document.getElementById('tableBody');

      // If the first child in the #tableBody has an innerText of 'No entries' remove that node and replace with raffle entry
      if(tableBody.children[0].innerText == 'No entries...') {
        tableBody.removeChild(tableBody.children[0]);
      }

      // Creates a table row <tr> and adds classes for styling
      var tableRow = document.createElement('tr');
          tableRow.className = 'border-b border-gray-400';

      // Sets a variable from the length/size of all our properties in our custom object (RaffleEntry)
      var raffleEntryPropertyCount = Object.keys(raffleEntry).length;

      // Loop through each property (name, email, phone, entries) in the custom object of RaffleEntry
      for(var i = 0; i < raffleEntryPropertyCount; i++) {
        // Create a table data <td> and adds classes for styling
        var tableData = document.createElement('td');
            tableData.className = 'px-6 py-4 whitespace-no-wrap';
              
        // Create an inner div inside the table data cell and add classes for styling
        var innerDiv = document.createElement('div');
            innerDiv.className = 'flex items-center text-sm leading-text-gray-800';
        
        // Gets the value of our custom object RaffleEntry at the index and sets it to variable value
        var value = Object.values(raffleEntry)[i];

        // Reformats value if value is an Array (object)
        if(typeof value === 'object') {
          value = value.join(', ')
        }

        // Set the innerText to our value
        innerDiv.innerText = value;

        // Append the current container <div> to the <td>
        tableData.appendChild(innerDiv);

        // Append the current <td> to the row for each iteration
        tableRow.appendChild(tableData)
      }

      // Lastly append all of our <tr> to the <tbody>
      tableBody.appendChild(tableRow);
    }

  // Adds button event listener
  function addListeners() {
    // Create variable for submit button
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', createRaffleEntry, false);
  }

  // Adds button attach
  function attachEvents() {
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.attachEvent('onclick', createRaffleEntry);
  }

  // A function that displays No entries upon load so we don't have an ugly/empty table
  function checkDisplay() {
    // Grabs the current #tableBody node
    var tbody = document.getElementById('tableBody');

    // Check if the tbody children NodeList is less than 1
    if(tbody.children.length < 1) {
      // Creates a table row with No entries innerHTML
      var tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3" class="text-center">No entries...</td>';
      //Appends the <tr> to the <tbody>
      tbody.appendChild(tr)
    }
  }

  // Add event listeners to button on load if not IE8
  if(window.addEventListener) {
    window.addEventListener('load', function() {
      // Add event listners function
      addListeners()
      // Also runs the checkDisplay function on load
      checkDisplay()
    }, false);
  } else {
    window.attachEvent('onload', function() {
      // Attachs the attachEvents for IE8 support
      attachEvents()
      // Also runs the checkDisplay function in IE8
      checkDisplay()
    });
  }