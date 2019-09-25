$(function(){
 $('.toggle').click(function(){
     $('.hamburguer').toggleClass('Active')
     $('#menuMobile').toggleClass('MobileActive')
     $('.btn-PopSam label').toggle(function(){
         $('.btn-PopSam label').css('position', ''),
         $('.btn-PopSam').css('display', 'block')
     });
 });

 
 $("#content div:nth-child(1)").show();
     $(".abas li:first div").addClass("selected");       
     $(".aba").click(function(){
         $(".aba").removeClass("selected");
         $(this).addClass("selected");
         var indice = $(this).parent().index();
         indice++;
         $("#content div").hide();
        $("#content div:nth-child("+indice+")").show();
     });
     
     $(".aba").hover(
         function(){$(this).addClass("ativa")},
         function(){$(this).removeClass("ativa")}
     ); 

     $(".reloadPage").click(function() {
       location.reload();
});

if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function() {
      var $voicelist = $('#voices');

      if($voicelist.find('option').length == 0) {
        speechSynthesis.getVoices().forEach(function(voice, index) {
          var $option = $('<option>')
          .val(index)
          .html(voice.name + (voice.default ? ' (default)' :''));

          $voicelist.append($option);
        });

        $voicelist.material_select();
      }
    }

    $('#speak').click(function(){
      var text = $('#message').val();
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[$('#voices').val()];
      msg.rate = $('#rate').val() / 10;
      msg.pitch = $('#pitch').val();
      msg.text = text;

      msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
      };

      speechSynthesis.speak(msg);
    })
  } else {
    $('#modal1').openModal();
  }
});