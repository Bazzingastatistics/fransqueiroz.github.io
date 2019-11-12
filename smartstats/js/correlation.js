$(function(){
 var modalPresent = $('#resultIndepApresent');
 var modalPresentText = $('#presentIndText');
 var valuesIndepInput = [];

 $('#inputIndepent').keyup(function (e) {
     if (e.keyCode == 13) {
         if (!$(this).val()) {
             alert("Campo de Valores Vazio");
         }
         else {
             valuesIndepInput.push($(this).val());
             console.log(valuesIndepInput);
             modalPresent.removeClass('IndepApresent').addClass('IndepApresent-Active');
             let indepText = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '<label >x</label> </p>'
             modalPresentText.append(indepText);
             $(this).val("");
         }
     }
 });

    $(document).on('click', '.deletOrdination', function () {
        $(this).remove();
        valuesIndepInput.splice(valuesIndepInput.indexOf($(this).attr('data-posicao')), 1);
        console.log(valuesIndepInput);
    });

 var modalPresent2 = $('#resultDepApresent');
 var modalPresentText2 = $('#presentDepText');
 var valuesDepInput = [];

 $('#inputDependent').keyup(function (e) {
     if (e.keyCode == 13) {
         if (!$(this).val()) {
             alert("Campo de Valores Vazio");
         }
         else {
             valuesDepInput.push($(this).val());
             console.log(valuesDepInput);
             modalPresent2.removeClass('DepApresent').addClass('DepApresent-Active');
             let depTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '<label >x</label> </p>'
             modalPresentText2.append(depTest);
             $(this).val("");
         }
     }
 });
    $(document).on('click', '.deletOrdination', function () {
        $(this).remove();
        valuesDepInput.splice(valuesDepInput.indexOf($(this).attr('data-posicao')), 1);
        console.log(valuesDepInput);
    }); 
});
