// Variables Globales para el Mapa y el Marcador
let map;
let marker;


// Función para inicializar el mapa y configurar la geolocalización
function initMap() {
    // Verificar si el navegador soporta la geolocalizacion
    if (navigator.geolocation) {
        // Obtenemos la posición actual del usuario y motrar el mapa
        navigator.geolocation.getCurrentPosition(verMapa, error);

    } else {
        alert("Su navegador no soporta la geolocalicación.")
    }

    setInterval(() => {
        if (navigator.geolocation) {
            // obtenemos nuevamente la posición del usuario y actualiza la imagen
            navigator.geolocation.getCurrentPosition(actualizarMap, error);
        } else {
            alert("Su navegador no soporta la geolocalicación.")
        }
    }, 10000) //Cierre del setInterval -> 10000 ms = 10 seg

} //fin funcion



function verMapa(pos) {
    let latitud = pos.coords.latitude;
    let longitud = pos.coords.longitude;
    let mostrarLonLat = document.querySelector("#localizacion-info");
    mostrarLonLat.innerHTML = `Latitud = ${latitud} | Longitud = ${longitud}`;
    let latlon=new google.maps.LatLng(latitud, longitud);

    // Opciones de visualizacion en el Google Maps
    let myOptions={
        zoom:15,
        center:latlon,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    // Crear el mapa y un marcador
    map=new google.maps.Map(document.querySelector("#map-canvas"),myOptions);
    // let map=new google.maps.Map(document.querySelector("#map-canvas"));
    marker=new google.maps.Marker({
        position:latlon,
        map:map,
        title:"Estás aquí"
    });
}



function actualizarMap(pos) {
    let latitud = pos.coords.latitude;
    let longitud = pos.coords.longitude;
    let mostrarLonLat = document.querySelector("#localizacion-info");

    mostrarLonLat.innerHTML = `Latitud = ${latitud} | Longitud = ${longitud}`;
    
    let latlon=new google.maps.LatLng(latitud, longitud);

    // Mover el marcador a una nueva posición.
    marker.setPosition(latlon);

    // Centrar el mapa en la nueva posicion.
    map.setCenter(latlon);

}



function error(pos) {
    alert("Error al obtener la Geolocalización");
}



window.onload=()=>{
    initMap();
}

