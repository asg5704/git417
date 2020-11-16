// Initialize function creates an HTTP request on load with default options
function initialize () {
  const apiKey = `1a1872a1-9c00-4650-8d3a-6dc6be211b16`;
  const url = `https://api.harvardartmuseums.org/exhibition?apikey=${apiKey}&status=current`;

  // Uses the Fetch API to create a Promise-based HTTP request with url & default options
  fetch(url, {
    method: 'GET',
    mode: "cors"
  })
  // Uses callback method to transform response data into usable JSON format
  .then(response => response.json())
  // Uses callback method to take the formatted JSON data and invokes the generateResults method
  .then(data => generateResults(data));
}

// Function that dynamically builds current exibitions
function generateResults({ records }) {
  // Loops through the records response array and creates an article to append to the #exhibitions element
  records.forEach(({begindate = '-', enddate = '-', title, url, poster}) => {
    // Creates an article with default className & innerHTML with our response data
    var article = document.createElement('article');
    article.className = "md:flex bg-gray-900 rounded-lg p-6 mr-4 mt-4 shadow max-w-3xl"
    article.innerHTML = `<div class="flex-col"><h3 class="text-gray-400 text-left"><a href="${url}">${title}</a></h3><span class="block text-xs text-white">${begindate} thru ${enddate}</span></div>`
    // Creates an img element with default classNames
    var img = document.createElement('img');
    img.className = "h-16 w-16 rounded-full mx-auto md:mx-0 md:mr-6";
    
    // If there isn't a poster object put in default, else from response data
    if(!poster) {
      img.alt = 'No poster'
      img.src = './assets/images/empty.png';
    } else {
      img.alt = poster.caption;
      img.src = poster.imageurl;
    }
    // Add the img element to the start of the article
    article.prepend(img);
    // Find the #exhibitions id and add the article
    document.getElementById('exhibitions').appendChild(article);
  })
}

// Add event listeners window object on load if not IE8
if(window.addEventListener) {
  window.addEventListener('load', initialize, false);
} else {
  window.attachEvent('onload', initialize, false);
}
