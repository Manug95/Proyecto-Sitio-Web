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
  
  function enviar(){
    if(validar()){
  
    }
  
    return false;
  }
  
  function validar(){
    let errores = [];
  
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
      if(cvv.value.length > 3){//comprueba que la camtidad de numeros no sea mayor a 3
        errores.push("El CVV No Puede Exceder los 3 Numeros");
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
        return "Fecha Demasiado Larga";
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