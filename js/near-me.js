var map;
var markerArray = [];
function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -33.8688197, lng: 151.20929550000005}
  });
  var geocoder = new google.maps.Geocoder();
  var myLatLng = {lat: -33.8688197, lng: 151.20929550000005};
  var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Sydney'
        });

//    downloadUrl('near-me.php', function(data) {
downloadUrl('http://www.students.oamk.fi/~t6trso00/EatWhere/near-me.php', function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElem) {
          var id = markerElem.getAttribute('id');
          var name = markerElem.getAttribute('name');
          var address = markerElem.getAttribute('address');
          geocodeAddress(name, address, geocoder, map, id);
        });
});

}

$(document).ready(function(){
        initMap();
        //onload, get user location if fail after 2seconds, set current location at Kotkantie
        navigator.geolocation.getCurrentPosition(onSuccess,errorCallback,{timeout:2000});

    })
var curLat;
var curLong;
//Get current location
var onSuccess = function(position) {
  curLat = position.coords.latitude;
  curLong = position.coords.longitude;
  showLocation();
};
// when showLocation fail, put marker at Kotkantie
function errorCallback() {
  console.log("error");
  map.setCenter({lat: 64.999784, lng: 25.512721});
  map.setZoom(15);

  var curLatLng = {lat: 64.999784, lng: 25.512721};
  //create marker at Kotkantie
  var marker = new google.maps.Marker({
          position: curLatLng,
          map: map,
          label: "You are here",
          icon: {
            url: "img/user.png", // url
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
            labelOrigin: new google.maps.Point(70, 12)},
        });
}
// show current location and put a marker
function showLocation() {
  console.log("show");
  map.setCenter({lat: curLat, lng: curLong});
  map.setZoom(15);
  var curLatLng = {lat: curLat, lng: curLong};
  //create marker at current location
  var marker = new google.maps.Marker({
          position: curLatLng,
          map: map,
          label: "You are here",
          icon: {
            url: "img/user.png", // url
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
            labelOrigin: new google.maps.Point(70, 12)},
        });
}

  function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        request.onreadystatechange = doNothing;
        callback(request, request.status);
      }
    };
    request.open('GET', url, true);
    request.send(null);
  }

  function geocodeAddress(restaurantName, addressName, geocoder, resultsMap, restaurantID) {
    geocoder.geocode({'address': addressName}, function(results, status) {
      if (status === 'OK') {

        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          label: restaurantName,
          icon: {
            url: "img/pin.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
            labelOrigin: new google.maps.Point(30, -20),
            customId : restaurantID,
            customName : restaurantName,
            customAddress: addressName
          }
        });
        marker.addListener('click', function() {

          var id = marker.icon.customId;
          var restaurantName = marker.icon.customName;
          var addressName = marker.icon.customAddress;

          window.location = "restaurant-detail.html?restaurant_id="
              + id
              + "&restaurant_address="
              + addressName
              + "&restaurant_name="
              + restaurantName;
          console.log(link);
      });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

 function doNothing() {}
