$(function(){
  
  $('.contentMenu').addClass('animated flipInY');
  $('.contentDescritive ').addClass('animated flipInY');
  $('.contentProbability ').addClass('animated flipInY');
  $('.contentCorrelation ').addClass('animated flipInY');
  $('.contentMaintenance').addClass('animated flipInY')
  $('.accessibilityContent').addClass('animated fadeInLeft')

  $('.backPage').click(function(){
    $('.contentDescritive ').addClass('animated flipOutY');
  $('.contentProbability ').addClass('animated flipOutY');
  $('.contentCorrelation ').addClass('animated flipOutY');
  });
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

   /*Apresentação de Inputs de Valores Probabilidade*/
   $('#selectEnter').click(function(){
     if($('#selectLenght').val() == ''){
        $('.inputInsert').html("");
     }else if($('#selectLenght').val() == '<'){
        $('.inputInsert').html("");
        $('.selectLenght').css('flexDirection', 'row');
        let inputInsert = /*html*/` <input type="number" name="insertSmall" id="inputInsertSmaller">`
        $('.inputInsert').append(inputInsert);
     }else if ($('#selectLenght').val() == '>'){
        $('.inputInsert').html("");
        $('.selectLenght').css('flexDirection', 'row');
        let inputInsert = /*html*/` <input type="number" name="InsertBig" id="inputInsertBigger">`
        $('.inputInsert').append(inputInsert);
     }else{
        $('.inputInsert').html("");
        $('.selectLenght').css('flexDirection', 'column');
        let inputInsert = /*html*/` <span>De</span><input type="number" name="" class="inputInsertMiddle" id="inputInsertMiddle">
                                    <span class="text-spacing">Até</span><input type="number" name="" class="inputInsertMiddle" id="inputInsertMiddle2">`
          
        $('.inputInsert').css('display','flex');      
          if (screen.width < 640 || screen.height < 480){
              $('.inputInsert').css('flexDirection','column');
            }else{
              $('.inputInsert').css('flexDirection','row');
            }
        $('.inputInsert').append(inputInsert); 
     }
   });
   /*Apresentação de Inputs de Valores Probabilidade*/
   
   var alturaDocument = $(window).height();
   function alturaSecao(){
    $('.show').height(alturaDocument);
   }
   $(alturaSecao);
    $(".btnCalculation").click(function(event){        
      event.preventDefault();
      $('html body').animate({scrollTop:alturaDocument}, '900');
   }); 

  //  function fonte(e){
  //   var elemento = $(".acessibilidade");
  //   var fonte = elemento.css('font-size');
  //   if (e == 'a') {
  //     elemento.css("fontSize", parseInt(fonte) + 1);
  //   } else if('d'){
  //     elemento.css("fontSize", parseInt(fonte) - 1);
  //   }
  // }  
  // $('.fontA').each(function(){
  //   var font = $('body').css('font-size');
  //   if($('.font').hasClass('fontA')){
  //     $('body').css('fontSize', parseInt(font) - 1);
  //   }else{
  //     $('body').css('fontSize', parseInt(font) + 1);
  //   }
  // }); 
 
  $('#fontA').click(function(){
    var font = $('body').css('font-size');
    $('body').css('fontSize', parseInt(font) + 1);
  });
  $('#fontD').click(function(){
    var font = $('body').css('font-size');
    $('body').css('fontSize', parseInt(font) - 1);
  });
});