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
    }else{
      lista[i].style.display = "none";
    }
  }
  /* marca el circulita de la imagen actual y los demas los desmarca */
  for(let i = 0; i < circulitos.length; i++){
    if(i == slideIndex){
      circulitos[i].className = circulitos[i].className.replace("circulito", "circulito active");
    }else{
      circulitos[i].className = circulitos[i].className.replace("circulito active", "circulito");
    }
  }
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