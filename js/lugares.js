lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar():
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección.  */

          var direccion = document.getElementById('direccion');

          //Crea el autocompletar para cada elemento
          autoDireccion = new google.maps.places.Autocomplete(direccion);

          //Limita el área de búsqueda de un autocomplete
          function limite(autocomplete) {
            var circle = new google.maps.Circle({
              radius: 20000
            });
            autocomplete.setBounds(circle.getBounds());
          }

          //Limira el área de los autocomplete
          limite(autoDireccion);
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
        /* que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro */

    var tipoDeLugar = document.getElementById('tipoDeLugar').value;
    var radio = document.getElementById('radio').value;
    var request = {
          location: posicion,
          radius: radio,
          type: tipoDeLugar
        };
    servicioLugares.nearbySearch(request, marcadorModulo.marcarLugares);

  }
  return {
    inicializar,
    buscarCerca
  }
})()
