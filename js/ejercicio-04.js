if(document.addEventListener)
    window.addEventListener("load",inicio)
else if(document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio(){
    let boton = document.getElementById("calcular");
    if(document.addEventListener)
        boton.addEventListener("click",proceso)
    else if(document.attachEvent)
        boton.attachEvent("onclick",proceso);
}

function proceso(){
    let lineas = document.querySelectorAll("tbody tr");
    if (lineas.length > 0) {
        let resultado = "<resultado>";
        for (let index = 0; index < lineas.length; index++) {
            let celdas = lineas.item(index).getElementsByTagName("td");
            resultado = resultado+"<vehiculos><coche>"+celdas.item(0).textContent.trim()+
            "</coche><velocidad>"+celdas.item(1).textContent.trim()+
            "</velocidad><aceleracion>"+celdas.item(2).textContent.trim()+
            "</aceleracion><tiempo>"+celdas.item(3).textContent.trim()+"</tiempo></vehiculos>";
            
        }
        let xml = resultado+"</resultado>"
        //console.log(xml);
        let estado = {
            method : "POST",
            headers : {"Content-Type":"application/x-www-form-urlencoded"},
            body : xml
        }
        fetch("php/velocidad.php",estado)
            .then(tratar)
            .catch(errores);
    }
}

function errores(){
    alert("Se ha producido un error");
}

function tratar(respuesta){
    if (respuesta.ok) {
        respuesta.text().then(procesar);
    }
}

function procesar(resultado){
    let parsar = new DOMParser();
    let datos = parsar.parseFromString(resultado,"application/xml");
    let velfinal = datos.getElementsByTagName("velfinal");
    let filas = document.querySelectorAll("tbody tr");
    for (let index = 0; index < velfinal.length; index++) {
        let celdas = filas.item(index).getElementsByTagName("td");
        celdas.item(4).textContent = velfinal.item(index).textContent;
    }

}