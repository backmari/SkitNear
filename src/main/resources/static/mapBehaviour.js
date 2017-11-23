window.onLoad = function () {

    var cityCenter = {lat: 59.328977, lng: 18.068174};
    var user = {lat: 59.328977, lng: 18.068174};
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        library: {
            icon: iconBase + 'library_maps.png'
        }
    };
    var zoom = 10;

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: new google.maps.LatLng(cityCenter.lat, cityCenter.lng)
    });



    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude + " " + longitude);
        document.getElementById("latitudeField").value = latitude;
        document.getElementById("longitudeField").value = longitude;
        map.setCenter(new google.maps.LatLng(latitude, longitude));
        
        var userLoc = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            icon: icons.library.icon,
            map: map
        });
    }


    function error(output) {
        output.innerHTML = "Unable to retrieve your location";
    }

    //Send request to java to get JSON-array that contains all java-objects
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var toiletList = JSON.parse(xmlHttp.responseText);
            if (!map) {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: zoom,
                    center: cityCenter
                });
            }

            for (var i = 0; i < toiletList.length; i++) {
                new google.maps.Marker({
                    position: {lat: toiletList[i].latitude, lng: toiletList[i].longitude},
                    map: map
                });
            }
        }
    };
    xmlHttp.open("GET", "/toilets", true); // true for asynchronous
    xmlHttp.send(null);

    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: "59.3136511,18.0589745",
        destination: "59.3164926,18.0835784",
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    directionsService.route(directionsRequest, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(response);
            }
            else {
                //Error has occured
                console.log("Nope, error stuff");
            }
        }
    );
};

