$(window).on("load",inicio);

function inicio(){
    $("#calcular").on("click",proceso);
}
function proceso(){
    let filas = $("#tablaCoches > tbody > tr");
    let arrayObjetos = [];
    if ($(filas).length > 0) {
        for (let index = 0; index < $(filas).length; index++) {
            let celdas = $(filas).eq(index).find("td");
            let datos = new Object();
            datos.moto=$(celdas).eq(0).text().trim();
            datos.velocidad=$(celdas).eq(1).text().trim();
            datos.aceleracion=$(celdas).eq(2).text().trim();
            datos.tiempo=$(celdas).eq(3).text().trim();
            arrayObjetos.push(datos);
        }
        //convierto los datos a json
        let datosJson = JSON.stringify(arrayObjetos);
        //configuracion
        let configuracion ={
            //url:""
            method:"POST",
            headers:{"Content-Type":"application/json"},
            dataType:"text",
            data:datosJson,
            success:procesar
        }
        //envio con metodo $.ajax()
        $.ajax("php/distancia.php",configuracion);
    }
}

function procesar(resultado) {
    let datos = JSON.parse(resultado);
    let filas = $("#tablaCoches > tbody > tr");
    for (let index = 0; index < $(filas).length; index++) {
        let celdas = $(filas).eq(index).find("td");
        $(celdas).eq(4).text(datos[index].distancia);
    }
}