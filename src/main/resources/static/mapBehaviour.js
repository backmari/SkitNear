function initMap() {
    var zoom = 10;
    var toilets = [
        {latitude: 59.32544622, longitud: 18.07585976 },
        {latitude: 59.3136511, longitud: 18.0589745 },
        {latitude: 59.3164926, longitud: 18.0835784 },
        {latitude: 59.31573162, longitud: 18.08713373 },
        {latitude: 59.31172369, longitud: 18.09105638 }
    ];
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: {lat: toilets[1].latitude, lng: toilets[1].longitud}});

    for(var i = 0; i<toilets.length; i++){
        new google.maps.Marker({
            position: {lat: toilets[i].latitude, lng: toilets[i].longitud},
            map: map
        });
    }

}
