window.onLoad = function () {

    var cityCenter = {lat: 59.328977, lng: 18.068174};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(cityCenter)
    });
    var userCoords = {lat: 1, lng: 1};

    var toiletList;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            toiletList = JSON.parse(xmlHttp.responseText);
            // if (!map) {
            //     map = new google.maps.Map(document.getElementById('map'), {
            //         zoom: zoom,
            //         center: cityCenter
            //     });
            // }
            for (var i = 0; i < toiletList.length; i++) {
                addMarker(toiletList[i], map);
            }
        }
    };

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        userCoords["lat"] = position.coords.latitude;
        userCoords["lng"] = position.coords.longitude;
        console.log(userCoords);
        document.getElementById("latitudeField").value = userCoords.lat;
        document.getElementById("longitudeField").value = userCoords.lng;
        map.setCenter(userCoords);

    }
    var submitButton = document.getElementById("submit");

    var inputListener = function(){

        var destinationToa = {lat: toiletList[0].latitude, lng: toiletList[0].longitude}
        var trip = {origin: userCoords, destination: destinationToa};
        console.log(userCoords);
        console.log(toiletList[0]);
        drawDirections(trip);

    };

    submitButton.addEventListener("click", inputListener);

    console.log(userCoords);
    console.log(userCoords.lat);
    console.log(userCoords.lng);
    //Send request to java to get JSON-array that contains all java-objects

    // getDirections(trip);


    function error(output) {
        output.innerHTML = "Unable to retrieve your location";
    }


    xmlHttp.open("GET", "/toilets", true); // true for asynchronous
    xmlHttp.send(null);

    function addMarker(position, map) {
        new google.maps.Marker({
            position: {lat: position.latitude, lng: position.longitude},
            map: map
        });
    }



    function drawDirections(trip) {
        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: new google.maps.LatLng(trip.origin),
            destination: new google.maps.LatLng(trip.destination),
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(directionsRequest, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                var renderer = new google.maps.DirectionsRenderer();
                renderer.setMap(map);
                renderer.setDirections(response);
            }
            else {
                //Error has occured
                console.log("Nope, error stuff");
            }
        });
    }

    function standardOptions() {
        var options = {};
        options["suppressMarkers"] = true;

    }

    function changeOption(element) {
    }
};

