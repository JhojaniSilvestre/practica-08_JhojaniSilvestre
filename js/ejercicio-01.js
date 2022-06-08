window.onload=inicio;

function inicio(){
    document.formulario.onsubmit = validar;
    
    document.formulario.minuni.onkeypress = admiteNumeros;
    document.formulario.unidades.onkeypress = admiteNumeros;
    document.formulario.precio.onkeypress = admiteNumeroPunto;

    document.formulario.codigo.onfocus = entrarCaja;
    document.formulario.codigo.onblur = salirCaja;
    document.formulario.descripcion.onfocus = entrarCaja;
    document.formulario.descripcion.onblur = salirCaja;
    document.formulario.fecha.onfocus = entrarCaja;
    document.formulario.fecha.onblur = salirCaja;
    document.formulario.precio.onfocus = entrarCajaPrecio;
    document.formulario.precio.onblur = salirCaja;
    document.formulario.empresa.onfocus = entrarCaja;
    document.formulario.empresa.onblur = salirCaja;
    document.formulario.codempre.onfocus = entrarCaja;
    document.formulario.codempre.onblur = salirCaja;
    document.formulario.direccion.onfocus = entrarCaja;
    document.formulario.direccion.onblur = salirCaja;
    document.formulario.localidad.onfocus = entrarCaja;
    document.formulario.localidad.onblur = salirCaja;
    document.formulario.minuni.onfocus = entrarCaja;
    document.formulario.minuni.onblur = salirCaja;
    document.formulario.unidades.onfocus = entrarCaja;
    document.formulario.unidades.onblur = salirCaja;
    document.formulario.familia.onfocus = entrarCaja;
    document.formulario.familia.onblur = salirCaja;
    document.formulario.transporte.onfocus = entrarCaja;
    document.formulario.transporte.onblur = salirCaja;

    //document.formulario.precio.onfocus = resetPunto;
}

function validar(){
    let enviar = true;
    let msj = "";
    
    let codigo = document.formulario.codigo.value.trim();
    let descripcion = document.formulario.descripcion.value.trim().toLowerCase();
    let fecha = document.formulario.fecha.value.trim();
    let precio = document.formulario.precio.value.trim();
    let empresa = document.formulario.empresa.value.trim().toLowerCase();
    let codempre = document.formulario.codempre.value.trim().toLowerCase();
    let direccion = document.formulario.direccion.value.trim().toLowerCase();
    let localidad = document.formulario.localidad.value.trim().toLowerCase();
    let minuni = document.formulario.minuni.value.trim();
    let unidades = document.formulario.unidades.value.trim();
    let familia = document.formulario.familia.value.trim().toLowerCase();
    let transporte = document.formulario.transporte.value.trim().toLowerCase();
    let iva = document.formulario.iva.value;
    let paises = document.formulario.paises;
    /*------Validación exhaustiva ---------------------------*/
    if (!validarCodigo(codigo)) {
        enviar = false;
        msj = "Código incorrecto\n";
    }
    if (!validarDescripcion(descripcion)) {
        enviar = false;
        msj += "Descripción incorrecta\n";
    }
    if (!validarFecha(fecha)) {
        enviar = false;
        msj += "Fecha de alta incorrecta\n";
    }
    if (!validarPrecio(precio)) {
        enviar = false;
        msj += "Precio incorrecto\n";
    }
    /*------Expresiones regulares directas ---------------------------*/
    let expreNombreEmp = /^[a-záéíóúüñ]{3}[a-záéíóúüñ\. ]{6,23}[0-9a-záéíóúüñ]$/i;

    if(!expreNombreEmp.test(empresa)){
        enviar = false;
        msj += "Nombre de empresa incorrecto\n"; 
    }
    let expreCodEmp = /^\d{3}\.((abce)|(cade)|(fegu)|(ijok)|(lima))\d{5,8}\.[0-9a-záéíóúüñ]{5}$/i;
    if (!expreCodEmp.test(codempre)) {
        enviar = false;
        msj += "Código de empresa incorrecto\n"; 
    }
    let expreDirecEmp = /^[a-záéíóúüñ]{2}[\da-záéíóúüñ\,\-\.\/ºª]{7,25}[\da-záéíóúüñ\.]$/i;
    if (!expreDirecEmp.test(direccion)) {
        enviar = false;
        msj += "Dirección de empresa incorrecta\n"; 
    }
    let expreLocalidad = /^[a-záéíóúüñ]{5,20}$/i;
    if (!expreLocalidad.test(localidad)) {
        enviar = false;
        msj += "Localidad de empresa incorrecta\n";   
    }
    /*------Expresiones regulares regex ---------------------------*/

    let regexMinuni = new RegExp("^(((00)?[3-9]\\d)|(0?[1-9]\\d{2})|([1-9]\\d{3}))$","i");
    if(!regexMinuni.test(minuni)){
        enviar = false;
        msj += "Regex: Unidades min incorrectas\n"; 
    }
    let regexUnidades = new RegExp("^\\d{2,7}$","i");
    if (!regexUnidades.test(unidades)) {
        enviar = false;
        msj += "Regex: Unidades de producto incorrecto\n"; 
    }
    let regexFamilia = new RegExp("^[a-záéíóúüñ]{5}[\\da-záéíóúüñ \\-\\.\\|]{2,13}[a-záéíóúüñ]{3}$","i");
    if (!regexFamilia.test(familia)) {
        enviar = false;
        msj += "Regex: Familia del producto incorrecto\n"; 
    }
    let regexTransporte = new RegExp("\\b((seur)|(nacex)|(dhl)|(mrw))\\b","i");
    if (!regexTransporte.test(transporte)) {
        enviar = false;
        msj += "Regex: Nombre empresa transporte incorrecto\n";   
    }
    /*------validar IVA ---------------------------*/
    if (iva.length < 1) {
        enviar = false;
        msj += "Se debe seleccionar un tipo de IVA\n";  
    }
    /*------validar sector ---------------------------*/
    let cont = 0;
    let elementos = document.formulario.elements;
    for(let i=0; i<elementos.length;i++)
        if (elementos[i].type == "checkbox")
            if(elementos[i].checked)
                cont+=1;
    if (cont < 1) {
        enviar = false;
        msj += "Se deben seleccionar al menos un sector de producción\n"; 
    }
    /*------validar paises ---------------------------*/
    cont = 0;
    for(let i=0; i<paises.length;i++)
        if (paises[i].selected)
            cont+=1;
    
    if (cont < 3) {
        enviar = false;
        msj += "Se deben seleccionar al menos tres países en los que se vende el producto\n";  
    }
    /*---------------------------------*/
    if (!enviar) {
        alert(msj);
    }
    return enviar;
}

/*--------------------------------------------------------------------*/

function validarPrecio(dato){
    let valido = true;
    let pos = dato.indexOf(".");
    if (pos == -1) {
        valido = false;
    }
    else{
        let entero = dato.substring(0,pos);
        let decimal = dato.substring(pos+1);

        entero = parseInt(entero,10);
        if (entero < 11) {
            valido = false;
        }
        else{
            if (decimal.length > 2) {
                valido = false;
            }
        }
    }
    return valido;
}
/*--------------------------------------------------------------------*/
function validarFecha(dato) {
    let valido = true;

    if (dato.length < 10 || dato.length > 10) {
        valido = false;
    }else{
        //obtenemos la posicion del primer separador si es un guion
        let pos1 = dato.indexOf("-");
        //comprobamos si existe
        if (pos1 != -1) {
        //si existe buscamos el segundo guion desde una posicion mayor al primer guion
            pos2 = dato.indexOf("-",pos1+1);
        }
        else {
            //si no existe comprobamos que la separacion es una barra
            pos1 = dato.indexOf("/");
            pos2 = dato.indexOf("/",pos1+1);
        }
        //comprobamos si las posiciones no existen
        if (pos1 == -1 || pos2 == -1) {
            valido = false;
        }
        else{ // si existen obtenemos las subcadenas del dia, mes, año
            let dia = dato.substring(0,pos1);
            let mes = dato.substring(pos1+1,pos2);
            let anyo = dato.substring(pos2+1);
            //comprobamos si el formato de dia no es valido
            if ((dia.length < 2 || dia.length > 2) && !solonumeros(dia)) {
                valido = false;
            } //comprobamos si el mes no es valido
            else if ((mes.length < 2 || mes.length > 2) && !solonumeros(mes)) {
                valido = false;
            } //comprobamos si el año no es valido
            else if ((anyo.length < 4 || anyo.length > 4) && !solonumeros(anyo)) {
                valido = false;
            }
            else{ // si el formato es valido, comprobamos ahora el valor
                //convertimos a numero de base decimal, ya que antes era una cadena
                let valorDia = parseInt(dia,10);
                let valorMes = parseInt(mes,10);
                let valorAnyo = parseInt(anyo,10);

                if (valorAnyo < 1930 || valorAnyo > 2022) {
                    valido = false;
                }
                else{
                    //establecemos en un array el numero de dias de cada mes en su orden correspondiente
                    let diasMeses = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
                    //ahora comprobamos si el año es bisiesto
                    //si es divisible exacto entre 400
                    if (valorAnyo % 400 == 0) {
                        //cambiamos el num de dias del mes febrero
                        diasMeses[1]=29;
                    } //si es entre 100 no es exacto pero si entre 4
                    else if (valorAnyo % 100 != 0 && valorAnyo % 4 ==0){
                        diasMeses[1]=29;
                    }
                    //comprobamos si el valor mes no es valido
                    if ( valorMes < 1 || valorMes > 12){
                        valido=false;
                    } //si no lo es, comprobamos el del dia
                    else if (valorDia < 1 || valorDia > diasMeses[valorMes - 1]){
                        valido=false;
                    }
                }
            }
        }
    }
    return valido;
}

function validarCodigo(dato){
    let valido = true;
    if (dato.length < 7 || dato.length > 11)
        valido = false;
    else
        if (!solonumeros(dato))
            valido = false;
    return valido;
}

function validarDescripcion(dato){
    let valido = true;

    if (dato.length < 10 || dato.length > 23) {
        valido = false;
    }
    else{
        //validar los primeros 4 caracteres
        let inicio = dato.substring(0,4);
        let cont = 0;
        let esp="áéíóúüñ";
        while (valido && cont < inicio.length) {
            if(inicio.charAt(cont) < "a" || inicio.charAt(cont) > "z"){
                if (!inicio.charAt(cont).includes(esp))
                    valido = false;
            }
            cont+=1;
        }
        //validar final
        let final = dato.charAt(dato.length - 1);
        console.log(final);
        if(final < "a" || final > "z"){
            if (!final.includes(esp))
                valido = false;
        }
        console.log("validar final result "+ valido);
        //validar mitad
        let mitad = dato.substring(4,-1);
        let otros = "- ";
        cont = 0;
        while (valido && cont < mitad.length) {
            if (mitad.charAt(cont) < "0" || mitad.charAt(cont) > "9") {
                if(mitad.charAt(cont) < "a" || mitad.charAt(cont) > "z"){
                    if (!mitad.charAt(cont).includes(esp) && !mitad.charAt(cont).includes(otros))
                        valido = false;
                }
            }
            cont+=1;
        }
    }
    return valido;
}

/*--------------------------------------------------------------------*/
function solonumeros(dato){
    let valido = true;
    let cont = 0;
    while (valido && cont < dato.length) {
        if(dato.charAt(cont) < "0" || dato.charAt(cont) > "9"){
            valido = false;
        }
        cont+=1;
    }
    return valido;
}

/*--------------------------------------------------------------------*/
function admiteNumeros(evento){
    let eventos = evento || window.event;
    let dato=String.fromCharCode(eventos.charCode); //hago la conversion
    if(dato < "0" || dato > "9") 
        return false;
    else
        return true;
}
/*--------------------------------------------------------------------*/
var puntoPrecio = 0;

function admiteNumeroPunto(evento){
let valido = true;
let eventos = evento || window.event;
let dato = String.fromCharCode(eventos.charCode);

if (dato < "0" || dato > "9"){
    console.log("es punto"+puntoPrecio);
    if (dato == "." && puntoPrecio == 0)
        puntoPrecio = 1;
    else
        valido = false;
}
return valido;
}
/*--------------------------------------------------------------------*/
function entrarCaja(evento) {
    //console.log("entra caja"+puntoPrecio);
    let eventos = evento || window.event;
    eventos.target.value = "";
    eventos.target.style.color = "yellow";
    eventos.target.style.backgroundColor = "red";
}

function entrarCajaPrecio(evento) {
    let eventos = evento || window.event;
    puntoPrecio = 0;
    eventos.target.value = "";
    eventos.target.style.color = "yellow";
    eventos.target.style.backgroundColor = "red";
}

function salirCaja(evento) {
    let eventos = evento || window.event;
    eventos.target.style.color = "black";
    eventos.target.style.backgroundColor = "white";
}
/*--------------------------------------------------------------------*/
