// Esta es la ip y puerto en que necesitamos que esté el backend disponible
var server = 'http://citistriketeam.no-ip.org:8080';


marcadorRiesgoModulo = (function () {
   var MarcadorRiesgo = [] // El marcador de la direccion buscada


    function inicializar () {

      // Se obtiene de la api el listado de puntos
		    $.getJSON(server+"/FireFighterWeb/rest/hechos/lotes", function (data) {


     MarcadorRiesgo = data;


     for (var i = 0; i < MarcadorRiesgo.length; i++) {
       var pos = new google.maps.LatLng(MarcadorRiesgo[i].coords.coordY,MarcadorRiesgo[i].coords.coordX);

       if (MarcadorRiesgo[i].riesgo == "ALTO") {
         var  auxMiMarcador = new google.maps.Marker({
                             position: pos,
                             map: mapa,
                             title: MarcadorRiesgo[i].riesgo,
                             icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                             animation: google.maps.Animation.DROP
                             });
          addInfoWindow(auxMiMarcador,auxMiMarcador.getPosition().toString());

        } else if (MarcadorRiesgo[i].riesgo == "MEDIO"){
           var  auxMiMarcador = new google.maps.Marker({
                               position: pos,
                               map: mapa,
                               title: MarcadorRiesgo[i].riesgo,
                               icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                               animation: google.maps.Animation.DROP
                               });
                               addInfoWindow(auxMiMarcador,auxMiMarcador.getPosition().toString());
           } else if (MarcadorRiesgo[i].riesgo == "BAJO"){
             var  auxMiMarcador = new google.maps.Marker({
                                 position: pos,
                                 map: mapa,
                                 title: MarcadorRiesgo[i].riesgo,
                                 icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                                 animation: google.maps.Animation.DROP
                                 });
                                 addInfoWindow(auxMiMarcador,auxMiMarcador.getPosition().toString());
             }else {
               var  auxMiMarcador = new google.maps.Marker({
                                   position: pos,
                                   map: mapa,
                                   title: MarcadorRiesgo[i].riesgo,
                                   icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                   animation: google.maps.Animation.DROP
                                   });
                                   addInfoWindow(auxMiMarcador,auxMiMarcador.getPosition().toString());
           }
     }


		 });


    }

    function addInfoWindow(marker, latLng) {

            google.maps.event.addListener(marker, 'click', function () {

              $.getJSON(server + "/FireFighterWeb/rest/hechos/lotes/"+ latLng , function(data) {

                var parametros = data.params
                var contentString = null
                var parametros_vivienda = data.vivienda.params
                var infoWindow = new google.maps.InfoWindow({

                });

                // console.log( JSON.stringify(data))
                for (var i = 0; i < parametros.length; i++) {

                  if(i==0){
                    contentString = "<p>" + parametros[i].parametro.name + " - " + parametros[i].valor.value +  "</p>"
                  }else{
                    contentString = contentString + "<p>" + parametros[i].parametro.name + " - " + parametros[i].valor.value +  "</br> </p>"
                  }};

                  for (var i = 0; i < parametros_vivienda.length; i++) {
                      contentString = contentString + "<p>" + parametros_vivienda[i].parametro.name + " - " + parametros_vivienda[i].valor.value +  "</br> </p>"
                    };

                infoWindow.setContent(contentString);

                infoWindow.open(map, marker);

                  });
            });
        }

  return {
    inicializar,
    addInfoWindow

  }
})()
