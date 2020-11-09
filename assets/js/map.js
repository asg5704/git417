

function generateMap () {
  // Sets the accessToken property on the global mapboxgl object
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNnNTcwNCIsImEiOiJja2hhczVnb2YwMTFtMnJwZW9kaW9nNG5qIn0.P4kjyPj7opceF2nfGwVibQ';

  // Instantiates the mapboxgl Map class with some default option
  var map = new mapboxgl.Map({
    container: 'map', //This is the div id in the tickets.html page
    style: 'mapbox://styles/mapbox/light-v9', // Adds light-mode styling from mapbox
    center: [-96, 37.8], // Centers for middle of US
    zoom: 3 // Zoom is set at 3 to see the entire US
  });

  if(window.navigator && window.navigator.geolocation) {
    // Uses the browsers Geolocation API to get the latitude & longitude 
    window.navigator.geolocation.getCurrentPosition(data => {
      // Uses ES6 object destructuring to grab only the latitude and longitude properties from the returned data object
      var { latitude, longitude } = data.coords;

      // Uses the MapboxGL Marker class to instantiate a Marker
      var marker = new mapboxgl.Marker()
        // Uses MapboxGL built-in methods to both set the lat/long and add the marker to the map
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Programmatically update the center & zoom to location
      map.setCenter([longitude, latitude])
      map.zoomTo(8, { duration: 2000, animate: true })

    }, errorCallback);
  }
}

function errorCallback (err) {
  console.log(err);
}

// Add event listeners on load if not IE8
if(window.addEventListener) {
  window.addEventListener('load', generateMap, false);
} else {
  window.attachEvent('onload', generateMap);
}