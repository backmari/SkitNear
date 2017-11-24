window.onLoad = function () {

    var cityCenter = {lat: 59.328977, lng: 18.068174};
    var iconBase = '/';
    var icons = {
        user: {
            icon: iconBase + 'user_marker_point.png'
        },
        toilet: {
            icon: iconBase + 'Marker_point.png'
        }
    };
    var zoom = 10;

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: new google.maps.LatLng(cityCenter.lat, cityCenter.lng),
        styles: [
            {elementType: 'geometry', stylers: [{color: '#705018'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#000000'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#8f6e35"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "gamma": 0.01
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": -31
                    },
                    {
                        "lightness": -33
                    },
                    {
                        "weight": 2
                    },
                    {
                        "gamma": 0.8
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 30
                    },
                    {
                        "saturation": 30
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": 20
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 20
                    },
                    {
                        "saturation": -20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 10
                    },
                    {
                        "saturation": -30
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": 25
                    },
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": -20
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f5fd3c"
                    }
                ]
            }
        ]
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
            icon: icons.user.icon,
            map: map
        });
    }


    function error(output) {
        output.innerHTML = "Unable to retrieve your location";
    }

    var markers = [];
    var infoWindows = [];
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
                markers.push(
                    new google.maps.Marker({
                        position: {lat: toiletList[i].latitude, lng: toiletList[i].longitude},
                        icon: icons.toilet.icon,
                        map: map,
                        title: toiletList[i].address
                    }))
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

