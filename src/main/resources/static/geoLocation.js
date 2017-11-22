window.onload = function() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        document.getElementById("latitudeField").value = latitude;
        document.getElementById("longitudeField").value = longitude;
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
};