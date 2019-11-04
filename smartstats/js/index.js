$(function(){

 /*Active Menu Mobile*/
 $('.navbar-toggler').click(function(){
 $('#navbarNavMobile').toggleClass('navbarMobile-Active');
 });
 /*Active Menu Mobile*/

 /*Reload Page*/
 $(".reloadPage").click(function() {
  if(confirm("Deseja Limpar a Tela?")){
      location.reload();
    }
  });
 /*Reload Page*/

 /*Demonstrar Valor Input Separatriz*/
 let InputBreaker = $('#inputBreaker');
 if(InputBreaker){
    $('#etiqueta').html(InputBreaker.val());

    $('#inputBreaker').on('input', function(){
     $('#etiqueta').html(InputBreaker.val());
    })
 }else{ false};

   $('#inputBreaker').click(function(){
     if(!$('#selectBreaker').val()){
       alert('Selecione uma Medida Separatriz')
       $('#inputBreaker').val(1);
       $('#etiqueta').html(1);
     }
   });
   /*Demonstrar Valor Input Separatriz*/
});