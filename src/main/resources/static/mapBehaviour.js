window.onLoad = function () {

    var cityCenter = {lat: 59.328977, lng: 18.068174};
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        library: {
            icon: iconBase + 'library_maps.png'
        }
    };

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(cityCenter)
    });
    var userCoords = {lat: 1, lng: 1};
    var markers = [];
    var toiletList = null;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

            toiletList = JSON.parse(xmlHttp.responseText);

            for (var i = 0; i < toiletList.length; i++) {
                addMarker(toiletList[i], map);
            }
        }

    };
    xmlHttp.open("GET", "/toilets", true); // true for asynchronous
    xmlHttp.send(null);

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {

        userCoords["lat"] = position.coords.latitude;

        userCoords["lng"] = position.coords.longitude;
        console.log(userCoords);
        document.getElementById("latitudeField").value = userCoords.lat;
        document.getElementById("longitudeField").value = userCoords.lng;
        map.setCenter(userCoords);

        var userLoc = new google.maps.Marker({
            position: userCoords,
            icon: icons.library.icon,
            map: map
        });
    }

    var submitButton = document.getElementById("submit");

    var inputListener = function () {
        console.log(markers);
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
            markers.pop();
        }
        var form = document.getElementsByClassName("form");
        var url = "/filter";
        //
        // for (i = 0; i < form.length; i++) {
        //     var val = form[i].checked; // If value is text "on", set to true, if not, set false
        //     url = url + form[i].name + "=" + val + "&"; // SEND TO JAVA
        // }
        // url = url + form[form.length - 1].name + "=" + form[form.length - 1].value;

        // if(userCoords.lat != 1){
        //     url = url + "latitude" + "=" + userCoords.lat + "&" + "longitude" + "=" + userCoords.lng;
        // }

        console.log(url);

        if (markers.length > 0) {

            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                toiletList = JSON.parse(xmlHttp.responseText);
                for (i = 0; i < toiletList.length; i++) {
                    addMarker(toiletList[i], map);
                }
            }
        }

        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);

        var destinationToa = {lat: toiletList[0].latitude, lng: toiletList[0].longitude}
        var trip = {origin: userCoords, destination: destinationToa};

        drawDirections(trip);

    };

    submitButton.addEventListener("click", inputListener);

    console.log(userCoords);
    console.log(userCoords.lat);
    console.log(userCoords.lng);


    function error(output) {
        output.innerHTML = "Unable to retrieve your location";
    }

    function addMarker(position, map) {
        markers.push(new google.maps.Marker({
            position: {lat: position.latitude, lng: position.longitude},
            map: map
        }));
    }

    var renderer;

    function drawDirections(trip) {
        var rendererOptions = {
            map: map
        };
        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: new google.maps.LatLng(trip.origin),
            destination: new google.maps.LatLng(trip.destination),
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(directionsRequest, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                if (renderer != null) {
                    renderer.setMap(null);
                    renderer = null;
                }
                renderer = new google.maps.DirectionsRenderer(rendererOptions);
                renderer.setMap(map);
                renderer.setDirections(response);
            }
            else {
                //Error has occured
                console.log("Nope, error stuff");
            }
        });
    }
};

