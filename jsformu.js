/* js del select */
function mostrarPartidos(x){
    let seleccion = document.getElementById("seleccion");
    let partidos = document.getElementsByClassName("partidos");

    if(x == 0){//limpia el cartel de la compra
      let cartel = document.getElementById("lista_errores");
      cartel.innerHTML = "";
    }
  
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
    let label_seleccion = document.getElementById("label-seleccion");
    cartel.innerHTML = "";

    if(!validar()){
      cartel.classList.remove("comprada");
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
      cartel.classList.add("comprada");
      //limpio el formulario
      pais.value = "";
      mail.value = "";
      document.getElementById("nombre-tarjeta").value = "";
      document.getElementById("num-tarjeta").value = "";
      document.getElementById("cvv").value = "";
      document.getElementById("f_vencimiento").value = "";
      document.getElementById("visa").checked = false;
      document.getElementById("master").checked = false;
      mostrarPartidos(1);
      //label_seleccion.classList.remove("subrayado");
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

    nombre_tarjeta.classList.remove("error");
    num_tarjeta.classList.remove("error");
    cvv.classList.remove("error");
    fecha_vencimiento.classList.remove("error");
    mail.classList.remove("error");
    
  
    /* validacion del select ------------------------------------------------- */
    let label_seleccion = document.getElementById("label-seleccion");
    if(seleccion.value == ""){
        errores.push("Seleccione un Pais");
        label_seleccion.classList.add("subrayado");
    }else{
      label_seleccion.classList.remove("subrayado");
    }

    /* validacion del input nombre tarjeta ------------------------------------------------- */
    if(nombre_tarjeta.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo Nombre Tarjeta Vacio");
      nombre_tarjeta.classList.add("error");
    }else{
      if(nombre_tarjeta.value.length > 20){//comprueba que la camtidad de caracteres no sea mayor a 20
        errores.push("Nombre Tarjeta No Puede Exceder los 20 Caracteres");
        nombre_tarjeta.classList.add("error");
      }else{
        let = valNom = /^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$/;
        if(!valNom.test(nombre_tarjeta.value)){
          errores.push("Nombre Invalido");
          nombre_tarjeta.classList.add("error");
        }
      }
    }
  
    /* validacion del input numero de la tarjeta ------------------------------------------------- */
    if(num_tarjeta.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo Numero Tarjeta Vacio");
      num_tarjeta.classList.add("error");
    }else{
      if(num_tarjeta.value.length != 19 && num_tarjeta.value.length != 16){//comprueba que la camtidad de numeros no sea mayor a 19
        errores.push("Numero Tarjeta Demasiado Corto o Largo");
        num_tarjeta.classList.add("error");
      }else{
        let valVisa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
        let valMaster = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
        let tarjetaVisa = document.getElementById("visa");
        let tarjetaMaster = document.getElementById("master");
        
        if(tarjetaVisa.checked){
          if(!valVisa.test(num_tarjeta.value)){
            errores.push("Número de Tarjeta Visa Incorrecto");
            num_tarjeta.classList.add("error");
          }
        }
        if(tarjetaMaster.checked){
          if(!valMaster.test(num_tarjeta.value)){
            errores.push("Número de Tarjeta Mastercard Incorrecto");
            num_tarjeta.classList.add("error");
          }
        }
      }
    }
  
    /* validacion del cvv ------------------------------------------------- */
    if(cvv.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo CVV Vacio");
      cvv.classList.add("error");
    }else{
      if(cvv.value.length != 3){//comprueba que la camtidad de numeros no sea mayor a 3
        errores.push("El CVV Debe Ser de 3 Numeros");
        cvv.classList.add("error");
        if(isNaN(cvv.value)){
          errores.push("Campo CVV Debe Ser Solo Numeros");
          cvv.classList.add("error");
        }
      }else{
        if(isNaN(cvv.value)){
          errores.push("Campo CVV Debe Ser Solo Numeros");
          cvv.classList.add("error");
        }
      }
    }

    /* validacion de la fecha de vencimiento ------------------------------------------------- */
    let val_fecha = validarFechaVencimiento(fecha_vencimiento.value);
    if(typeof val_fecha == "string"){
        errores.push(val_fecha);
        fecha_vencimiento.classList.add("error");
    }

    /* validacion del input del mail ------------------------------------------------- */
    let expresion_regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if(mail.value.trim() == ""){//comprueba si el campo esta vacio
      errores.push("Campo Mail Vacio");
      mail.classList.add("error");
    }else{
      if(!expresion_regular.test(mail.value)){//comprueba que sea un texto tipo email valido
        errores.push("Mail Invalido");
        mail.classList.add("error");
      }
    }
  
    /* validacion de los inputs radio de tipo de tarjeta ------------------------------------------------- */
    let marcada = false;
    let medio_pago = document.getElementById("medio-pago");
  
    for(let i = 0; i < tipo_tarjeta.length; i++){
      marcada |= tipo_tarjeta[i].checked;
    }
  
    if(!marcada){
      errores.push("Debe Marcar un Tipo de Tarjeta");
      medio_pago.classList.add("subrayado");
    }else{
      medio_pago.classList.remove("subrayado");
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
    /*
    if(isNaN(fecha[0]) || ((fecha[0] > 1 || fecha[0] < 0))){//que sean numeros validos
        return "Fecha Incorrecta";
    }*/
    if(fecha[0] != "0" && fecha[0] != "1"){
      console.log("el primero");
      return "Fecha Incorrecta";
    }

    /*if(isNaN(fecha[1]) || (fecha[1] > 2 || fecha[1] < 0)){//que sean numeros validos
        return "Fecha Incorrecta";
    }*/
    if(fecha[0] == 0){
      if(isNaN(fecha[1]) || !(fecha[1] >= 1 && fecha[1] <= 9)){
        console.log("el segundo, el if");
        return "Fecha Incorrecta";
      }
    }else{
      if(isNaN(fecha[1]) || (fecha[1] != 0 && fecha[1] != 1 && fecha[1] != 2)){
        console.log("el segundo, el else");
        return "Fecha Incorrecta";
      }
    }

    if(fecha[2] != '/'){//que el 3ro sea una barra
        console.log("el tercero");
        return "Formato Incorrecto";
    }

    /*if(isNaN(fecha[3]) || (fecha[3] > 3 || fecha[3] < 2)){//que sean numeros validos
        return "Fecha Incorrecta";
    }
    if(isNaN(fecha[4]) || (fecha[4] > 9 || fecha[4] < 0)){//que sean numeros validos
        return "Fecha Incorrecta";
    }*/
    if(isNaN(fecha[3]) || isNaN(fecha[4])){
      console.log("el cuarto o quinto");
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
    case "wal": return "Gales";
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