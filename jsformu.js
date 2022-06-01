/* js del select */
function mostrarPartidos(){
    let seleccion = document.getElementById("seleccion");
    let partidos = document.getElementsByClassName("partidos");
  
    for(let i = 0; i < partidos.length; i++){
      if(partidos[i].id == seleccion.value){
        partidos[i].style.display = "block";
      }else{
        partidos[i].style.display = "none";
      }
    }
  }
  //---------------------------------------------------------------------------------------------------------------
  
  var errores = [];

  function enviar(){
    let cartel = document.getElementById("lista_errores");
    cartel.innerHTML = "";

    if(!validar()){
      for(let i = 0; i < errores.length; i++){
        let li = document.createElement("li");
        li.innerHTML = errores[i];
        cartel.appendChild(li);
      }
    }else{
      let li = document.createElement("li");
      let pais = document.getElementById("seleccion");
      let mail = document.getElementById("mail");
      li.innerHTML = "¡Entradas para Ver a La seleccion de " + obtenerNombrePais(pais.value) + " Compradas !</br>La Misma fue Enviada a Su eMail (" + mail.value + ")";
      cartel.appendChild(li);
    }
  
    return false;
  }
  
  function validar(){
    errores = [];
  
    /* obtengo los inputs */
    let nombre_tarjeta = document.getElementById("nombre-tarjeta");
    /*otras formas de obtenes los inputs
    let nombre_tarjeta2 = document.querySelector("#nombre_tarjeta");
    let nombre_tarjeta3 = document.formu.nombre_tarjeta;
    */
    let num_tarjeta = document.getElementById("num-tarjeta");
    let cvv = document.getElementById("cvv");
    let f_vencimiento = document.getElementById("f_vencimiento");
    let mail = document.getElementById("mail");
    let tipo_tarjeta = document.getElementsByName("tipo-targeta");
    let seleccion = document.getElementById("seleccion");
    let bordes = document.getElementsByTagName("input");
    let fecha_vencimiento = document.getElementById("f_vencimiento");
    //---------------------------------------------------------------------------------------------------

    for(let i = 0; i < bordes.length; i++){
        bordes[i].style.border = "1px solid black";
    }
  
    /* validacion del select ------------------------------------------------- */
    if(seleccion.value == ""){
        errores.push("Seleccione un Pais");
    }

    /* validacion del input nombre tarjeta ------------------------------------------------- */
    if(nombre_tarjeta.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo Nombre Tarjeta Vacio");
      nombre_tarjeta.style.border = "2px solid red";
    }else{
      if(nombre_tarjeta.value.length > 20){//comprueba que la camtidad de caracteres no sea mayor a 20
        errores.push("Nombre Tarjeta No Puede Exceder los 20 Caracteres");
        nombre_tarjeta.style.border = "2px solid red";
      }else{
        let = valNom = /^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$/;
        if(!valNom.test(nombre_tarjeta.value)){
          errores.push("Nombre Invalido");
          nombre_tarjeta.style.border = "2px solid red";
        }
      }
    }
  
    /* validacion del input numero de la tarjeta ------------------------------------------------- */
    if(num_tarjeta.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo Numero Tarjeta Vacio");
      num_tarjeta.style.border = "2px solid red";
    }else{
      if(num_tarjeta.value.length > 19){//comprueba que la camtidad de numeros no sea mayor a 19
        errores.push("Numero Tarjeta No Puede Exceder los 19 Numeros");
        num_tarjeta.style.border = "2px solid red";
        if(isNaN(num_tarjeta.value)){
          errores.push("Campo Numero Tarjeta Debe Contener Solo Numeros");
          num_tarjeta.style.border = "2px solid red";
        }
      }else{
        if(isNaN(num_tarjeta.value)){
          errores.push("Campo Numero Tarjeta Debe Contener Solo Numeros");
          num_tarjeta.style.border = "2px solid red";
        }
      }
    }
  
    /* validacion del cvv ------------------------------------------------- */
    if(cvv.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo CVV Vacio");
      cvv.style.border = "2px solid red";
    }else{
      if(cvv.value.length != 3){//comprueba que la camtidad de numeros no sea mayor a 3
        errores.push("El CVV Debe Ser de 3 Numeros");
        cvv.style.border = "2px solid red";
        if(isNaN(cvv.value)){
          errores.push("Campo CVV Debe Ser Solo Numeros");
          cvv.style.border = "2px solid red";
        }
      }else{
        if(isNaN(cvv.value)){
          errores.push("Campo CVV Debe Ser Solo Numeros");
          cvv.style.border = "2px solid red";
        }
      }
    }

    /* validacion de la fecha de vencimiento ------------------------------------------------- */
    let val_fecha = validarFechaVencimiento(fecha_vencimiento.value);
    if(typeof val_fecha == "string"){
        errores.push(val_fecha);
        fecha_vencimiento.style.border = "2px solid red";
    }

    /* validacion del input del mail ------------------------------------------------- */
    let expresion_regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if(mail.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo Mail Vacio");
      mail.style.border = "2px solid red";
    }else{
      if(!expresion_regular.test(mail.value)){//comprueba que sea un texto tipo email valido
        errores.push("Mail Invalido");
        mail.style.border = "2px solid red";
      }
    }
  
    /* validacion de los inputs radio de tipo de tarjeta ------------------------------------------------- */
    let marcada = false;
  
    for(let i = 0; i < tipo_tarjeta.length; i++){
      marcada |= tipo_tarjeta[i].checked;
    }
  
    if(!marcada){
      errores.push("Debe Marcar un Tipo de Tarjeta");
      tipo_tarjeta.border = "2px solid red";
    }

    for(let i = 0; i < errores.length; i++){
        console.log(errores[i]);
    }
  
    console.log(errores.length);
  
    return errores.length == 0;
  }/* fin de validar() */

function validarFechaVencimiento(fecha){
    
    if(fecha.trim() == ""){//que no este vacio
        return "Campo Fecha Vencimiento Vacio";
    }
    if(fecha.length != 5){//que tenga 5 caracteres
        return "Fecha de Vencimiento Incorrecta";
    }

    if(isNaN(fecha[0]) || ((fecha[0] > 1 || fecha[0] < 0))){//que sean numeros validos
        return "Fecha Incorrecta";
    }
    if(isNaN(fecha[1]) || (fecha[1] > 2 || fecha[1] < 0)){//que sean numeros validos
        return "Fecha Incorrecta";
    }
    if(fecha[2] != '/'){//que el 3ro sea una barra
        return "Formato Incorrecto";
    }
    if(isNaN(fecha[3]) || (fecha[3] > 3 || fecha[3] < 2)){//que sean numeros validos
        return "Fecha Incorrecta";
    }
    if(isNaN(fecha[4]) || (fecha[4] > 9 || fecha[4] < 0)){//que sean numeros validos
        return "Fecha Incorrecta";
    }

    return true;
}

function obtenerNombrePais(pais){
  switch(pais){
    case "ger": return "Alemania";
    case "ksa": return "Arabia Saudita";
    case "arg": return "Argentina";
    case "bel": return "Belgica";
    case "bra": return "Brasil";
    case "cam": return "Camerun";
    case "can": return "Canadá";
    case "kor": return "Corea Del Sur";
    case "cro": return "Croacia";
    case "den": return "Dinamarca";
    case "ecu": return "Ecuador";
    case "usa": return "Estados Unidos";
    case "esp": return "España";
    case "fra": return "Francia";
    case "gha": return "Ghana";
    case "eng": return "Inglaterra";
    case "irn": return "Irán";
    case "jpn": return "Japón";
    case "mar": return "Marruecos";
    case "mex": return "México";
    case "ned": return "Paises Bajos";
    case "pol": return "Polonia";
    case "por": return "Portugal";
    case "qat": return "Qatar";
    case "sen": return "Senegal";
    case "srb": return "Serbia";
    case "sui": return "Suiza";
    case "tun": return "Tunez";
    case "uru": return "Uruguay";
    default: return "Un Pais";
  }
}