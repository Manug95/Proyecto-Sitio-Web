var slideIndex = 0;
mostrarSlide(slideIndex);

/* js del boton toTop */
var toTopButton = document.getElementById("toTop");
    
window.onscroll = function() {scrollFunction()};
    
function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}
    
function topFunction() {
    document.body.scrollTop = 130;//para Safari
    document.documentElement.scrollTop = 130;//Para Chrome, Firefox, IE y Opera
}
//--------------------------------------------------------------------------------------------------------------

/* js del carrusel */
function mostrarSlide(n){
  let lista = document.getElementsByClassName("slides");
  let circulitos = document.getElementsByClassName("circulito");
  let catptionsEstadios = document.getElementsByClassName("estadio");

  if (n == lista.length){
    slideIndex = 0;
  }
  if (n < 0){
    slideIndex = lista.length-1;
  }

  /* muestra la imagen deseada y las demas las oculta */
  for(let i = 0; i < lista.length; i++){
    if(i == slideIndex){
      lista[i].style.display = "block";
      catptionsEstadios[i].style.display = "block";
      circulitos[i].className = circulitos[i].className.replace("circulito", "circulito active");
    }else{
      lista[i].style.display = "none";
      catptionsEstadios[i].style.display = "none";
      circulitos[i].className = circulitos[i].className.replace("circulito active", "circulito");
    }
  }
  /* muestra el caption deseado y los demas los ocualta */
  /*for(let i = 0; i < catptionsEstadios.length; i++){
    if(i == slideIndex){
      
    }else{
      
    }
  }
  /* marca el circulita de la imagen actual y los demas los desmarca */
  /*for(let i = 0; i < circulitos.length; i++){
    if(i == slideIndex){
      
    }else{
      
    }
  }*/
}

function cambiarSlide(n){
  slideIndex += n;
  mostrarSlide(slideIndex);
}

function slideActual(n){
  slideIndex = n;
  mostrarSlide(slideIndex);
}
//--------------------------------------------------------------------------------------------------------------

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
  let nombre_tarjeta = document.getElementById("nombre_tarjeta");
  /*otras formas de obtenes los inputs
  let nombre_tarjeta2 = document.querySelector("#nombre_tarjeta");
  let nombre_tarjeta3 = document.formu.nombre_tarjeta;
  */
  let num_tarjeta = document.getElementById("num_tarjeta");
  let cvv = document.getElementById("cvv");
  let f_vencimiento = document.getElementById("f_vencimiento");
  let mail = document.getElementById("mail");
  let tipo_tarjeta = document.getElementsByName("tipo-targeta");
  //------------------------------------------------------------------------------------

  /* validacion del input nombre tarjeta */
  if(nombre_tarjeta.value.trim() == ""){//comprueba si el campo esta vacio
    console.log("Campo Nombre Tarjeta Vacio");
    errores.push("Campo Nombre Tarjeta Vacio");
  }else{
    if(nombre_tarjeta.value.length > 20){//comprueba que la camtidad de caracteres no sea mayor a 20
      console.log("Nombre Tarjeta No Puede Exceder los 20 Caracteres");
      errores.push("Nombre Tarjeta No Puede Exceder los 20 Caracteres");
    }
  }

  /* validacion del input numero de la tarjeta */
  if(num_tarjeta.value.trim() == ""){//comprueba si el campo esta vacio
    console.log("Campo Numero Tarjeta Vacio");
    errores.push("Campo Numero Tarjeta Vacio");
  }else{
    if(num_tarjeta.value.length > 19){//comprueba que la camtidad de numeros no sea mayor a 19
      console.log("Numero Tarjeta No Puede Exceder los 19 Numeros");
      errores.push("Numero Tarjeta No Puede Exceder los 19 Numeros");
      if(isNaN(num_tarjeta.value)){
        console.log("Campo Numero Tarjeta Debe Contener Solo Numeros");
        errores.push("Campo Numero Tarjeta Debe Contener Solo Numeros");
      }
    }else{
      if(isNaN(num_tarjeta.value)){
        console.log("Campo Numero Tarjeta Debe Contener Solo Numeros");
        errores.push("Campo Numero Tarjeta Debe Contener Solo Numeros");
      }
    }
  }

  /* validacion del input del mail */
  let expresion_regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(mail.value.trim() == ""){//comprueba si el campo esta vacio
    console.log("Campo Mail Vacio");
    errores.push("Campo Mail Vacio");
  }else{
    if(!expresion_regular.test(mail.value)){//comprueba que sea un texto tipo email valido
      console.log("Mail Invalido");
      errores.push("Mail Invalido");
    }
  }

  /* validacion del cvv */
  if(cvv.value.trim() == ""){//comprueba si el campo esta vacio
    console.log("Campo CVV Vacio");
    errores.push("Campo CVV Vacio");
  }else{
    if(cvv.value.length > 3){//comprueba que la camtidad de numeros no sea mayor a 3
      console.log("El CVV No Puede Exceder los 3 Numeros");
      errores.push("El CVV No Puede Exceder los 3 Numeros");
      if(isNaN(cvv.value)){
        console.log("Campo CVV Debe Ser Solo Numeros");
        errores.push("Campo CVV Debe Ser Solo Numeros");
      }
    }else{
      if(isNaN(cvv.value)){
        console.log("Campo CVV Debe Ser Solo Numeros");
        errores.push("Campo CVV Debe Ser Solo Numeros");
      }
    }
  }

  /* validacion de la fecha de vencimiento */


  /* validacion de los inputs radio de tipo de tarjeta */
  let marcada = false;

  for(let i = 0; i < tipo_tarjeta.length; i++){
    marcada |= tipo_tarjeta[i].checked;
  }

  if(!marcada){
    console.log("Debe Marcar un Tipo de Tarjeta");
    errores.push("Debe Marcar un Tipo de Tarjeta");
  }

  console.log(errores.length);

  return errores.length == 0;
}