window.onload = function () {

    navigator.geolocation.getCurrentPosition(success, error);
    var map;
    var cityCenter = {lat: 59.328977, lng: 18.068174};
    var zoom = 10;

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        document.getElementById("latitudeField").value = latitude;
        document.getElementById("longitudeField").value = longitude;
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: {lat: latitude, lng: longitude}
        });
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location"
    }

    var toilets = [
        {latitude: 59.32544622, longitude: 18.07585976},
        {latitude: 59.3136511, longitude: 18.0589745},
        {latitude: 59.3164926, longitude: 18.0835784},
        {latitude: 59.31573162, longitude: 18.08713373},
        {latitude: 59.31172369, longitude: 18.09105638}
    ];

    if (!map) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: cityCenter
        });
    }

    for (var i = 0; i < toilets.length; i++) {
        new google.maps.Marker({
            position: {lat: toilets[i].latitude, lng: toilets[i].longitude},
            map: map
        });
    }
};


// region OldCode
// function initMap() {
//     var zoom = 10;
//
//     navigator.geolocation.getCurrentPosition(success, error);
//
//     function success(position) {
//         window.userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
//
//         document.getElementById("latitudeField").value = window.userCoords.lat;
//         document.getElementById("longitudeField").value = window.userCoords.lng;
//     }
//
//     function error() {
//         output.innerHTML = "Unable to retrieve your location";
//     }
//
//     var toilets = [
//         {latitude: 59.32544622, longitude: 18.07585976 },
//         {latitude: 59.3136511, longitude: 18.0589745 },
//         {latitude: 59.3164926, longitude: 18.0835784 },
//         {latitude: 59.31573162, longitude: 18.08713373 },
//         {latitude: 59.31172369, longitude: 18.09105638 }
//     ];
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: zoom,
//         center: userCoords
//     });
//
//     for(var i = 0; i<toilets.length; i++){
//         new google.maps.Marker({
//             position: {lat: toilets[i].latitude, lng: toilets[i].longitude},
//             map: map
//         });
//     }
//
// }
// endregion