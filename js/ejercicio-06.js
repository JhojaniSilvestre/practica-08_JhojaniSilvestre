if(document.addEventListener)
    window.addEventListener("load",inicio)
else if(document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio(){
    let selectEquipos = document.getElementById("equipos");
    let selectTempo = document.getElementById("temporadas");
    if(document.addEventListener){
        selectEquipos.addEventListener("change",proceso);
        selectTempo.addEventListener("change",proceso);
    }
    else if(document.attachEvent){
        selectEquipos.attachEvent("onchange",proceso);
        selectTempo.attachEvent("onchange",proceso);
    }
}
let peticion;
function proceso(){
    let equipo = document.getElementById("equipos").value.trim();
    let temporada = document.getElementById("temporadas").value.trim();
    
    if (equipo != "" && temporada != "") {
        let xml ="<datos><resultado><equipo>"+equipo+"</equipo><temporada>"+temporada+"</temporada></resultado></datos>";

        //crear el objeto
        if(window.XMLHttpRequest)
            peticion = new XMLHttpRequest()
        else if(window.ActiveXObject)
            peticion = new ActiveXObject("Microsoft.XMLHTTP");
        
        //asigno evento readystatechange
        if(document.addEventListener)
            peticion.addEventListener("readystatechange",procesar)
        else if(document.attachEvent)
            peticion.attachEvent("onreadystatechange",procesar); 

        //establecer conexion con el servidor php
        peticion.open("POST","php/resultados.php");

        //establecer cabecera (post/xml)
        peticion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        peticion.send(xml);  

    }

}

function procesar(){
    if (peticion.readyState == 4) {
        if(peticion.status == 200){
            let datos = peticion.responseXML;
            let puesto = datos.getElementsByTagName("puesto").item(0).textContent;
            let puntos = datos.getElementsByTagName("puntos").item(0).textContent;
            let ganados = datos.getElementsByTagName("ganados").item(0).textContent;
            let perdidos = datos.getElementsByTagName("perdidos").item(0).textContent;
            let empatados = datos.getElementsByTagName("empatados").item(0).textContent;
            let favor = datos.getElementsByTagName("favor").item(0).textContent;
            let contra = datos.getElementsByTagName("contra").item(0).textContent;
            
            document.getElementById("puesto").value = puesto;
            document.getElementById("puntos").value = puntos;
            document.getElementById("ganados").value = ganados;
            document.getElementById("perdidos").value = perdidos;
            document.getElementById("empatados").value = empatados;
            document.getElementById("favor").value = favor;
            document.getElementById("contra").value = contra;
        }
    }
}