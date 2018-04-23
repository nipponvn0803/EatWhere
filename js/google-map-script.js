///////////////////////////////////////
// Start params processing from URL
//////////////////////////////////////

var currentUrl = location.search;
var params = getParams(currentUrl);

function getParams(url) {
    var params = {};

    // Remove "?" from the string
    url
        .substr(1)
        .split("&")
        .forEach(function (item) {
        typeof item;

        var paramKey,
            paramValue;

        var temp = item.split("=");

        paramKey = temp[0];
        paramValue = temp[1];

        params[paramKey] = paramValue;
    });

    return params;
}

////////////////////////////////////
// End params processing from URL
///////////////////////////////////

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var map, infoWindow, marker;
function initMap() {
    var markerArray = [];
    var stepDisplay = new google.maps.InfoWindow;


    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var googleAPIkey = "AIzaSyCZLDYFzM1gGyeShXvl6btJ50jR8HcFsAg";
    var res_coords = {};

    $.ajax({
        method: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + params.restaurant_address + "&key=" + googleAPIkey
    })
    .done(function(res) {
        console.log(res);
        var latitude = res.results[0].geometry.location.lat,
            longitude = res.results[0].geometry.location.lng;

        showRestaurantLocation({
            lat: latitude,
            lng: longitude
        });

        res_coords.lat = latitude;
        res_coords.lng = longitude;
    })
    .fail(function(err) {
        console.log(err);
    });

    function showRestaurantLocation(coordianator) {
        console.log("Start rendering the map");
        console.log(coordianator);
        map = new google.maps.Map(document.getElementById('map'), {
            center: coordianator,
            zoom: 15,
            gestureHandling: "cooperative"
        });

        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(coordianator);
    }

    function calculateAndDisplayRoute(restaurantLocation) {
        // var options = {
        //   enableHighAccuracy: true,
        //   timeout: 5000,
        //   maximumAge: 0
        // };

        console.log("Oh yeah");

        var currentLocation = {
          lat: 64.999662,
          lng: 25.510683
        };

        console.log(currentLocation);
        console.log(restaurantLocation);

        directionsService.route({
          origin: currentLocation,
          destination: restaurantLocation,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });


      //   navigator.geolocation.getCurrentPosition(
      //     ,
      //
      //   function() {
      //     console.log("Dis me loi roi");
      //     setTimeout(function() {
      //       window.location.reload(true);
      //     }, 1000);
      //   },
      //
      //   options
      // );

    }

    function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
            }
        }

    function attachInstructionText(stepDisplay, marker, text, map) {
      google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
      });
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}
