direccionesModulo = (function () {
  var servicioDirecciones // Servicio que calcula las direcciones
  var mostradorDirecciones // Servicio muestra las direcciones


    // Agrega la dirección en las listas de puntos intermedios y lo muestra con el street view
  function agregarDireccionClick (ubicacion) {
    that = this
    //var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    mapa.setCenter(ubicacion)
    console.log(mapa.getCenter().lat() + " "+ mapa.getCenter().lng()+ " nuevo centro con click")
    marcadorModulo.mostrarMiMarcador(ubicacion)
    streetViewModulo.cargarPanorama(ubicacion)
  }

  function agregarDireccionEnter (direccion, ubicacion) {
    that = this
    //var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    mapa.setCenter(ubicacion)
    console.log(mapa.getCenter().lat() + " "+ mapa.getCenter().lng()+ " nuevo centro con enter")
    marcadorModulo.mostrarMiMarcador(ubicacion)
    streetViewModulo.cargarPanorama(ubicacion)
  }

    // Inicializo las variables que muestra el panel //
  function inicializar () {

    servicioDirecciones = new google.maps.DirectionsService()
    mostradorDirecciones = new google.maps.DirectionsRenderer({
      draggable: true,
      map: mapa,
      panel: document.getElementById('directions-panel-summary'),
      suppressMarkers: true
    })
  }

  // Dirige a la pagina de carga de variables en form
  function cargarVariables () {

    var test = new google.maps.LatLng(parseFloat(mapa.getCenter().lat()) , parseFloat(mapa.getCenter().lng()));
    // console.log(mapa.getCenter().lat() + "" + mapa.getCenter().lng());
    // // console.log(new google.maps.LatLng(parseFloat(mapa.getCenter().lat()) , parseFloat(mapa.getCenter().lng())));
    // console.log(test.lat() + " " + test.lng());
    window.location.replace("./index0.html?latLng=" + test);

  }

  return {
    inicializar,
    agregarDireccionEnter,
    agregarDireccionClick,
    cargarVariables
  }
}())
