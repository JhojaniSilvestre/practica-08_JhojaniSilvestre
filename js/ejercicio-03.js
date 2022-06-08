$(window).on("load",inicio);

function inicio(){
    $("#aplicar").on("click",estiloCoches);
    $(".salamanca").on("mouseenter",estiloCajaTexto);
    $(".salamanca").on("mouseleave",estiloCajaTexto);
    $("#cambiar").on("click",borrarProvincias);
}

function borrarProvincias(){
    let arrayComunidades= new Array("Galicia","Asturias","Cantabria","País Vasco","Navarra",
	"Aragón","Cataluña","Comunidad Valenciana","La Rioja","Castilla-León","Castilla-La Mancha",
	"Extremadura","Murcia","Andalucia","Islas Canarias","Islas Baleares","Madrid","Ceuta","Melilla");
	let Comunidades= new Array("galicia","asturias","cantabria","vasco","navarra",
	"aragon","catalunia","valenciana","rioja","castillaleon","castillamancha",
	"extremadura","murcia","andalucia","canarias","baleares","madrid","ceuta","melilla");
	let galicia= new Array("A Coruña","Lugo","Ourense","Pontevedra");
	let asturias= new Array("Asturias");
	let cantabria= new Array("Cantabria");
	let vasco= new Array("Álava","Guipúzcoa","Vizcaya");
	let navarra= new Array("Navarra");
	let aragon= new Array("Huesca","Teruel","Zaragoza");
	let catalunia= new Array("Barcelona","Gerona","Lléida","Tarragona");
	let valenciana= new Array("Alicante","Castellón","Valencia");
	let rioja= new Array("La Rioja");
	let castillaleon= new Array("Ávila","Burgos","León","Palencia","Salamanca","Segovia","Soria","Valladolid","Zamora");
	let castillamancha= new Array("Albacete","Ciudad Real","Cuenca","Guadalajara","Toledo");
	let extremadura= new Array("Badajoz","Cáceres");
	let murcia= new Array("Murcia");
	let andalucia= new Array("Almería","Cádiz","Córdoba","Granada","Huelva","Jaén","Málaga","Sevilla");
	let canarias= new Array("Las Palmas","Santa Cruz de Tenerife");
	let baleares= new Array("Islas Baleares");
	let madrid= new Array("Madrid");
	let ceuta=new Array("Ceuta");
	let melilla=new Array("Melilla");
    
    
    let comunidades = $("#comunidades option:selected"); // o $("#comunidades").val() esto devolverá solo los seleccionados
    let provincias;
    let pos;
    
    if ($(comunidades).length > 0) {
        let ol = $("ol");
        if ($(ol).length == 0) {
            //creo la lista ordenada para las provincias a borrar
            $("#cambiar").after("<ol id='prov'></ol>");       
        }
        for (let index = 0; index < $(comunidades).length; index++) {
            pos = arrayComunidades.indexOf($(comunidades).eq(index).val().trim());
            console.log("pos "+pos);
            if (pos!=-1) {
                provincias = eval(Comunidades[pos]);
                console.log(provincias.length);
                //recorro cada provincia e itero la tabla ciudades hasta encontrar la que sea igual
                for (let j = 0; j < provincias.length; j++) {
                    let ausente = true;
                    pos = 0;
                    while(ausente && pos < $("#ciudades td").length){
                        if (provincias[j] == $("#ciudades td").eq(pos).text().trim()) {
                            ausente=false;
                            $("#ciudades td").eq(pos).remove();
                            //añadir la provincia a la lista ordenada
                            $("#prov").append("<li>"+provincias[j]+"</li>");
                        }
                        pos+=1;
                    }                    
                }
                
            }
            
        }    
    }


}

function estiloCajaTexto(){
    $(".salamanca").toggleClass("saltarina");
}

function estiloCoches(){
    //obtiene a todos los th y td de la tabla coches
    //la posicion empieza en 0, para todos los pares
    $("#coches th, #coches td").even().css({"color": "green","background-color":"orange"});
    //la posicion empieza en 0, para todos los impares
    $("#coches th, #coches td").odd().css({"color": "red","background-color":"yellow"});

    /*
    //filas impares
    let filasOdd = $("#coches tr").odd();
    for (let index = 0; index < $(filasOdd).length; index++) {
        let celdas = $(filasOdd).eq(index).find("td");
        //ahora tengo una colleccion de td donde la posicion empieza en 0
        //para los extremos al ser 0 y 2, son pares, aplico even()
        $(celdas).even().css({"color": "green","background-color":"orange"});
        //celda del medio tiene posicion 1, impar, aplico odd()
        $(celdas).odd().css({"color": "red","background-color":"yellow"});
    }
    //filas pares
    let filasEven = $("#coches tr").even();
    for (let index = 0; index < $(filasEven).length; index++) {
        let celdas = $(filasEven).eq(index).find("td");
        //ahora tengo una colleccion de td donde la posicion empieza en 0
        //para los extremos al ser 0 y 2, son pares, aplico even()
        $(celdas).even().css({"color": "red","background-color":"yellow"});
        //celda del medio tiene posicion 1, impar, aplico odd()
        $(celdas).odd().css({"color": "green","background-color":"orange"});
    }
    */
}
