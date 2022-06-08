//cargo el documento
if(document.addEventListener)
    window.addEventListener("load",inicio)
else if(document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio(){
    if(document.addEventListener){
        document.getElementById("borrar").addEventListener("click",borrarPais)
        document.getElementById("localidad").addEventListener("change",anyadirMonumento);
    }
    else if(document.attachEvent){
        document.getElementById("localidad").attachEvent("onchange",anyadirMonumento);
        document.getElementById("borrar").attachEvent("onclick",borrarPais);
    }
}

let paisOpt = new Array("Alemania","España","Francia","Grecia","Inglaterra","Italia","Portugal");
let paisEval = new Array("alemania","espanya","francia","grecia","inglaterra","italia","portugal");
let alemania = new Array("Baden-Wurtemberg", "Baviera", "Berlín", "Brandeburgo", "Bremen", "Hamburgo", "Hesse", "Mecklemburgo-Pomerania Occidental", "Baja Sajonia", "Renania del Norte-Westfalia", "Renania-Palatinado", "Sarre", "Sajonia", "Sajonia-Anhalt", "Schleswig-Holstein", "Turingia");
let espanya = new Array("Asturias", "Galicia", "Cantabria", "Cáceres","País Vasco", "Navarra", "Aragón", "Cataluña", "Castilla y León", "Madrid", "La Rioja", "Extremadura", "Castilla La Mancha", "Valencia", "Murcia", "Andalucía", "Canarias", "Baleares","Zamora");
let francia = new Array("Alsacia", "Aquitania", "Auvernia", "Borgoña", "Bretaña", "Valle del Loira", "Champagne-Ardenas", "Córcega", "Franche-Comte", "Paris / Ile de France", "Languedoc - Roussillon", "Limousin", "Lorena", "Midi-Pyrénées", "Nord Pas-de-Calais", "Normandía", "País del Loira", "Picardía", "Poitou-Charentes", "Provenza-Alpes-Costa Azul", "Rhône-Alpes", "Riviera Costa Azul");
let grecia = new Array("Tracia", "Macedonian", "Tesalia", "Epiro", "Grecia Central", "Peloponeso", "Islas del Egeo", "Islas Jónicas", "Creta");
let inglaterra = new Array("Gran Londres (Greater London)", "Sudeste de Inglaterra (South East England)", "Sudoeste de Inglaterra (South West England)", "Midlands del Oeste (West Midlands)", "Noroeste de Inglaterra (North West England)", "Nordeste de Inglaterra (North East England)", "Yorkshire y Humber (Yorkshire and the Humber)", "Midlands Oriental (East Midlands)" , "Inglaterra mega (East of England)");
let italia = new Array("Abruzzo", "Basilicata", "Calabria", "Campania", "Cerdeña", "Emilia Romagna", "FriuliVeneziaGiulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piamonte", "Puglia", "Sicilia", "Toscana", "Trentino Alto Adige", "Umbria", "Valle d'Aosta", "Veneto");
let portugal = new Array("Algarve", "Alto Alentejo", "Baixo Alentejo", "Beira Alta", "BeiraBaixa", "Beira Litoral",     "Douro Litoral", "Estremadura", "Minho", "Ribatejo", "Trás-os-Montes", "Alto Douro");

function borrarPais(){
    let paises = document.getElementById("paises");
        let valorPais = paises.options[paises.selectedIndex].value.trim();
        let pos = paisOpt.indexOf(valorPais);
        if (pos != -1) {
            let arrayRegion = eval(paisEval[pos]);
            //borrar regiones de la tabla
            borrarRegionTabla(arrayRegion);
            //borrar pais de la select
            paises.options[paises.selectedIndex].remove();
        }
        if(paises.options.length == 0){
            //cambio el valor del boton borrar a Añadir
            let boton = document.getElementById("borrar");
            boton.value = "Añadir";
            if (document.removeEventListener)
                boton.removeEventListener("click",borrarPais)
            else if(document.detachEvent)
                boton.detachEvent("onclick",borrarPais);
            
            if (document.addEventListener)
                boton.addEventListener("click",anyadirRegiones)
            else if(document.attachEvent)
                boton.attachEvent("onclick",anyadirRegiones);

            //vuelvo a añadir los paises a la select
            let newPaises = new Array("Alemania","España","Francia","Grecia","Inglaterra","Italia","Portugal");
            for (let i = 0; i < newPaises.length; i++) {
                let newOption = document.createElement("option");
                let newText = document.createTextNode(newPaises[i]);
                newOption.appendChild(newText);
                paises.appendChild(newOption);
            }

            //borro las filas vacias de la tabla
            let tbody = document.querySelector("#regiones tbody");
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
        }
}

function borrarRegionTabla(arrayRegion) {
    let tabla = document.getElementById("regiones");
    let tbody = tabla.querySelector("tbody");
    let tr = tbody.getElementsByTagName("tr");
    for (let i = 0; i < arrayRegion.length; i++) {
        let ausente = true;
        let posRow = 0;
        while (ausente && posRow < tr.length) {
            let td = tr.item(posRow).getElementsByTagName("td");
            let posData = 0;
            while (ausente && posData < td.length) {
                if (arrayRegion[i] == td.item(posData).textContent.trim()) {
                    ausente = false;
                    //console.log("para borrar "+td.item(posData).textContent);
                    td.item(posData).remove();
                }
                posData+=1;
            }
            posRow+=1;
        }
    }
}
let paisAnyadido = [];
function anyadirRegiones(){    
    let valorPais = paises.options[paises.selectedIndex].value.trim();
    if (!paisAnyadido.includes(valorPais)) {
        paisAnyadido.push(valorPais);
        let pos = paisOpt.indexOf(valorPais);
        if (pos != -1) {
            let arrayRegion = eval(paisEval[pos]);
            //añado las regiones
            let tabla = document.getElementById("regiones");
            let tbody = tabla.querySelector("tbody");
            let newFila = document.createElement("tr");
            for (let i = 0; i < arrayRegion.length; i++) {
                let newCelda = document.createElement("td");
                let newText = document.createTextNode(arrayRegion[i]);
                newCelda.appendChild(newText);
                newFila.appendChild(newCelda);
                let celdas = newFila.getElementsByTagName("td");
                if (celdas.length == 3) {
                    tbody.appendChild(newFila);
                    newFila = document.createElement("tr");
                }
            }
        }       
    }
    if (paisAnyadido.length == paisEval.length) {
        let boton = document.getElementById("borrar");
        boton.value = "Borrar"
        if (document.removeEventListener) {
            boton.removeEventListener("click",anyadirRegiones);
        }
        else if(document.detachEvent){
            boton.detachEvent("onclick",anyadirRegiones);
        }
        if (document.addEventListener) {
            boton.addEventListener("click",borrarPais);
        }
        else if(document.attachEvent){
            boton.attachEvent("onclick",borrarPais);
        }
    }
}

function anyadirMonumento(){
    let nomopt = new Array("Burgos","Córdoba","A Coruña","León","Mérida","Salamanca","Segovia","Sevilla","Zamora");
    let nomval = new Array("burgos","cordoba","corunya","leon","merida","salamanca","segovia","sevilla","zamora");
    let burgos = new Array("Arco de Santa María", "Monasterio de San Juan", "Puente de Santa María", "Arco de San Esteban", "Solar del Cid", "Arco de Fernán González", "Antiguo Seminario Mayor", "Monasterio de Santa María la Real de las Huelgas", "Catedral", "El Cid Campeador");
    let cordoba = new Array("Mezquita-Catedral","Alcázares de los Reyes Cristianos","Medina Azahara","Puente Romano","Caballerizas Reales","Torre de la Calahorra","Templo Romano","Torre de la Malmuerta","Alminar de San Juan","Mausoleos Romanos","Capilla de San Bartolomé");
    let corunya = new Array("Torre de Hércules","Obelisco Millenium","iglesia de las Capuchinas","Castillo de San Antón","Convento de Santa Bárbara","Convento de Santo Domingo","Iglesia de San Jorge","iglesia de San Nicolás","Colegiata de Santa María","Iglesia de Santiago");
    let leon = new Array("Catedral", "Basílica de San Isidoro", "Casa de Botines", "Convento de las Concepciones", "Cripta de Puerta Obispo", "Iglesia de los Padres Capuchinos", "Iglesia de Nuestra Señora del Camino", "Iglesia de San Marcelo", "Iglesia de Santa Ana");
    let merida = new Array("Teatro Romano", "Templo de Diana", "Acueducto de los Milagros", "Puente romano sobre el Guadiana", "Anfiteatro Romano", "Arco de Trajano", "Alcazaba árabe", "Basílica de Santa Eulalia",  "Foro romano", "Circo Romano", "Catedral de Santa María", "Puente romano sobre el Albarregas", "Templo de Marte");
    let salamanca = new Array("Catedral Nueva", "Catedral Vieja", "Fachada de la Universidad", "Casa de las Conchas", "La Clerencia", "convento de San Esteban", "Plaza Mayor", "Casa Lis");
    let segovia = new Array("Alcázar", "Acueducto", "Catedral", "Real Casa de Moneda", "Casa de los Picos", "Iglesia de San Martín", "Iglesia de la Santísima Trinidad", "Iglesia de San Esteban", "Iglesia de San Millán", "Iglesia de la Vera Cruz", "Iglesia del Corpus Cristi", "Monasterio del Parral");
    let sevilla = new Array("Giralda", "Torre del Oro", "Archivo de Indias", "Casa Pilatos", "Catedral", "Palacio de San Telmo", "Hospital de la Caridad", "Parque de María Luisa", "Reales Alcázares", "Real Maestranza de Caballería", "Plaza España", "Baílica de la Macarena", "Jardines de Murillo");
    let zamora = new Array("Catedral", "Puente de Piedra", "Puerta del Obispo", "Puerta de Doña Urraca", "Muralla", "Monasterio de la Carballeda", "Puerta de la Traición", "Molinos de Agua", "Castillo", "Palacio de los Monos");
    //obtengo el nodo select de las localidades
    let localidad = document.getElementById("localidad");
    //obtengo todos los options
    let optionLoc = localidad.options;
    //obtengo el nodo de la lista
    let listaOl = document.getElementById("monumetos");
    //obtengo todos los nodos li de la lista ol
    let nodosLi = listaOl.getElementsByTagName("li");
    let nomLoc;
    let pos;
    let arrayMonum;

    /*borrar li monumentos---------------*/
    while (listaOl.firstChild) {
        listaOl.removeChild(listaOl.firstChild);
    }
    /*-------------------------------------------------------------*/
    for (let i = 0; i < optionLoc.length; i++) {
        if (optionLoc.item(i).selected) {
            //obtengo el nombre la localidad seleccionada
            nomLoc=optionLoc.item(i).value.trim();
            //obtengo la posición del mismo en el array nomopt
            pos = nomopt.indexOf(nomLoc);
            if (pos!= -1) {
                arrayMonum = eval(nomval[pos]);
                for (let i = 0; i < arrayMonum.length; i++) {
                    let ausente=true;
                    pos = 0;
                    while (ausente && pos < nodosLi.length) {
                        if (arrayMonum[i] < nodosLi.item(pos).textContent) {
                            ausente=false;
                            let nuevoLi = document.createElement("li");
                            let nuevoText = document.createTextNode(arrayMonum[i]+" "+nomLoc);
                            nuevoLi.appendChild(nuevoText);
                            listaOl.insertBefore(nuevoLi,nodosLi.item(pos));
                        }  
                        pos+=1;
                    }
                    if (ausente) {
                        let nuevoLi = document.createElement("li");
                        let nuevoText = document.createTextNode(arrayMonum[i]+" "+nomLoc);
                        nuevoLi.appendChild(nuevoText);
                        listaOl.appendChild(nuevoLi);
                    }
                }
            }
        }
    }
}