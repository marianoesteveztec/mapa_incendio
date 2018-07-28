// Esta es la ip y puerto en que necesitamos que esté el backend disponible
var server = "http://citistriketeam.no-ip.org:8080";

variablesModulo = (function () {
   var variables = [] // El marcador de la direccion buscada


    $.getJSON(server + "/FireFighterWeb/rest/hechos/areas",
        function(data) {
                  for (i = 0; i < data.length; i++) {
                //se duplica una opcion de la lista de selección
                var opcion = $(".area-select option[value='0']").clone();
                //a esa opcion se le asigna como valor el id del genero, dato que luego va a servir para filtrar por id de genero.
                opcion.attr("value", (data)[i].name);
                //se le pone el nombre del genero al texto de la opcion
                opcion.html((data)[i].name);
                //se agrega la opcion a la lista de seleccion
                $(".area-select").append(opcion);
            }
        });



      // Se obtiene de la api el listado de puntos
	  $.getJSON(server+"/FireFighterWeb/rest/params/parametros", function (data) {

      var container = document.getElementById("variables");
      for (var i = 0; i < data.length; i++) {

                 var h = document.createElement("H2");                //creo un h2
                 h.appendChild(document.createTextNode(data[i].name));
                 container.appendChild(h);
                 // container.appendChild(document.createElement("br"));

                 var form = document.createElement("fieldset");
                 form.setAttribute("required","true");
                 form.setAttribute("class","fieldset1");
          for(var j = 0; j<data[i].values.length;j++){
                 // Create an <input> element, set its type and name attributes
                 var input = document.createElement("input");
                 input.type = "radio";
                 input.name = data[i].name;
                 input.value = data[i].values[j].value;
                 input.setAttribute("checked","checked");
                 input.setAttribute("class","atr");
                 form.appendChild(input);

                 var lab = document.createElement("label");                //creo un label
                 lab.appendChild(document.createTextNode(data[i].values[j].value));
                 form.appendChild(lab);
                 form.appendChild(document.createElement("br"));

               }

        container.appendChild(form);

     }

     container.appendChild(document.createElement("br"));
     var aux = document.createElement("input");
     aux.id= "aceptar";
     aux.type = "submit";
     aux.value = "Enviar";
     container.appendChild(aux);

		 });

  //  $("#variables").on("submit",function(e) {
  //    e.preventDefault(); // cancel submission
  //    window.location.replace("index.html");
  // });

   function enviarFormulario (form) {

     //form y latLng a JSON
     let params = new URLSearchParams(document.location.search.substring(1));
     let latLng = params.get("latLng");
     let area = $(".area-select option:selected").attr("value");

     // console.log(params);
     // var variables = JSON.stringify(jQuery(form).serializeArray());
     var variables = jQuery(form).serializeArray();

     var json = {
               'variables' :variables,
               'latLng' : latLng,
               'area': area
             }

   // console.log(JSON.stringify(json));


       var retval = jQuery.ajax({
        type:'post',
        url: server + "/FireFighterWeb/rest/hechos/lotes",
        contentType: 'application/json',
        data: JSON.stringify(json)
    }).done(function(data){

      if(data == "success"){
        setTimeout(function() {
            swal({
                title: "Carga correcta",
                text: "Gracias!",
                type: "success"
            }, function() {
             window.location.replace("./index.html");
            });
        }, 1000);
      }else {
        setTimeout(function() {
            swal({
                title: "Carga incorrecta",
                text: "Por favor seleccione un área correcta",
                type: "error"
            });
        }, 1000);
      }

      });



     }

     return {
       enviarFormulario
     }


})();
