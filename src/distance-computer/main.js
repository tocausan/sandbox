'use strict';

/*** Init ***/
function initialize() {

    // bounds
    var bounds = new google.maps.LatLngBounds();
    // map
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(50.8504500, 4.3487800),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
    });
    // Current location
    var infoWindow = new google.maps.InfoWindow({map: map});


    /*** Location error handler ***/
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    /*** Variables ***/
        //var geocoder = new google.maps.Geocoder();
    var pickupAddress = document.getElementById("pickupAddress");
    var dropAddress = document.getElementById("dropAddress");
    var pickupPosition = document.getElementById("pickupPosition");
    var dropPosition = document.getElementById("dropPosition");
    var distance = document.getElementById("distance");
    var path = new google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    var autocompleteOptions = {
        //componentRestrictions: {country: 'be'}
    };
    // Set pickup completion
    var pickup = {
        autocomplete:	new google.maps.places.Autocomplete(pickupAddress, autocompleteOptions),
        place: '',
        name: '',
        vicinity: '',
        position: '',
        marker: {}
    };

    // Set drop completion
    var drop = {
        autocomplete:	new google.maps.places.Autocomplete(dropAddress, autocompleteOptions),
        place: '',
        name: '',
        vicinity: '',
        position: '',
        marker: {}
    };


    /*** Functions ***/
        // Compute distance
    var computeDistance = function(pickup, drop){
            if(pickup && drop){
                var a = google.maps.geometry.spherical.computeDistanceBetween(pickup, drop) / 1000;
                return a.toFixed(3);
            } else {
                return '-';
            }
        };

    // Manage marker
    var manageMarker = function(location, title, map){

        // Remove marker and set previous marker
        if(Object.keys(location.marker).length > 0){
            location.previousMarker = location.marker;
            location.marker.setMap(null);
        }

        // Add marker
        var marker = new google.maps.Marker({
            position: location.place.geometry.location,
            map: map,
            title: title,
            label: title
        });
        location.marker = marker;

        // Extend bound
        bounds.extend(location.marker.position);
        map.fitBounds(bounds);
    };

    // Manage path
    var managePath = function(pickup, drop, map){

        // Update path
        if(Object.keys(pickup.marker).length > 0
            && Object.keys(drop.marker).length > 0){
            var coordinates = [];
            coordinates.push({lat: pickup.marker.getPosition().lat(), lng: pickup.marker.getPosition().lng()});
            coordinates.push({lat: drop.marker.getPosition().lat(), lng: drop.marker.getPosition().lng()});

            path.setPath(coordinates);
            path.setMap(map);
        }
    };


    /*** Event listeners ***/
    // Pickup
    google.maps.event.addListener(pickup.autocomplete, 'place_changed', function () {
        // Set pickup
        pickup.place = pickup.autocomplete.getPlace();
        pickup.name = pickup.place.name;
        pickup.vicinity = pickup.place.vicinity;
        pickup.position	= pickup.place.geometry.location;

        // Manage marker
        manageMarker(pickup, 'Pickup', map);
        // Manage path
        managePath(pickup, drop, map);
        // Set pickup value
        pickupPosition.value = pickup.position.toString()
        // Compute distance
        distance.value = computeDistance(pickup.position, drop.position);
    });

    // Drop
    google.maps.event.addListener(drop.autocomplete, 'place_changed', function () {
        // set drop
        drop.place = drop.autocomplete.getPlace();
        drop.name = drop.place.name;
        drop.vicinity = drop.place.vicinity;
        drop.position = drop.place.geometry.location;

        // Manage marker
        manageMarker(drop, 'Drop', map);
        // Manage path
        managePath(pickup, drop, map);
        // Set pickup value
        dropPosition.value = drop.position.toString()
        // Compute distance
        distance.value = computeDistance(pickup.position, drop.position);
    });
}
google.maps.event.addDomListener(window, 'load', initialize);



