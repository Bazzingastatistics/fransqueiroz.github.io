// Funções de Cálculo

// Quantitativa Continua
function qtContinua(vetor,nameVariable) {

 // Ordenando o vetor
 vetor.sort(function (a, b) {
     return a - b;
 });

 // Determinando limite máximo
 let xMax = Math.max.apply(null, vetor);

 // Determinando limite mínimo
 let xMin = Math.min.apply(null, vetor);

 // Determinando aplitude
 let amp = xMax - xMin;

 // Determinando quantidade de linhas
 let lin = Math.floor(Math.sqrt(vetor.length));

 // Preparando var para calcular intervalo de classe
 let ampI = amp + 1;

 // Looping para determinar a quantidade de linhas e intervalo
 for (; ;) {
     if (ampI % lin == 0) {
         break;
     }
     if (ampI % (lin - 1) == 0) {
         lin--;
         break;
     }
     if (ampI % (lin + 1) == 0) {
         lin++;
         break;
     }
     else {
         ampI++;
     }
 }

 // Calculando intervalo
 let int = ampI / lin;

 // Determinando faixas de valores
 let vetMax = [];
 let vetMin = [];
 let acVal = xMin;

 for (; ;) {

     if (vetMax.length == lin) {
         break;
     }
     vetMin.push(acVal);
     acVal += int;
     vetMax.push(acVal);
 }

 // Separando os valores e realizando contagem
 let vetFi = [];
 let vetFr = [];
 let vetFac = [];
 let vetFacP = [];
 let acMed = 0;
 let med = 0;

 for (let i = 0; i < vetMin.length; i++) {
     let acItem = 0;
     for (let j = 0; j < vetor.length; j++) {
         if (vetor[j] >= vetMin[i] & vetor[j] < vetMax[i]) {
             acItem++
         }
     }
     // Carregando vetor da contagem
     vetFi.push(acItem);

     // Carregando vetor da frequência em percentual
     vetFr.push(Math.round((vetFi[i] / vetor.length) * 100));

     // Carregando vetor da frequência acumulada
     if (i == 0) {
         vetFac.push(vetFi[i]);
     }
     else {
         vetFac.push(vetFac[i - 1] + vetFi[i]);
     }

     // Carregando vetor da frequência acumulada percentual
     vetFacP.push(Math.round((vetFac[i] / vetor.length) * 100));

     //Zerando contador
     acItem = 0;

 }
 // Calcular a média
 for (let k = 0; k < vetMin.length; k++) {
     acMed = acMed + ((vetMin[k] + vetMax[k]) / 2) * vetFi[k];
 }
 med = acMed / vetor.length;
 console.log(med);

 // Calcular a mediana
 let meddiana
 let pos = Math.round(vetor.length * 0.5);
 let limInf
 for (let l = 0; l < vetMin.length; l++) {
     if ((vetMin[l] + int) > vetor[pos]) {
         limInf = vetMin[l];

         meddiana = limInf + ((pos - vetFac[l - 1]) / vetFi[l]) * int
         break;
     }
 }
 tableContinua(nameVariable,lin, vetMin, vetMax, vetFi, vetFr, vetFac, vetFacP);
}

// Gerando Tabelas 
function tableContinua(nameVariable,lin, vetMin, vetMax, vetFi, vetFr, vetFac, vetFacP) {
 let linha = lin;
 let line1 = `<tr>
                 <td class="tdVet tableTitle">${nameVariable}</td>
                 <td class="tdVet tableTitle tableLines">Fi</td>
                 <td class="tdVet tableTitle tableLines">Fr%</td>
                 <td class="tdVet tableTitle tableLines">Fac</td>
                 <td class="tdVet tableTitle tableLines">FacP%</td>
              </tr>`
 $('#tableDemonstration').append(line1);
 for (let i = 0; i < linha; i++) {
     let table = `<tr><td class="tdVet"><p>${vetMin[i]} |--- ${vetMax[i]}</p></td>
                      <td class="tdVet tableLines"><p>${vetFi[i]} </p></td>
                      <td class="tdVet tableLines"><p>${vetFr[i]}% </p></td>
                      <td class="tdVet tableLines"><p>${vetFac[i]} </p></td>
                      <td class="tdVet tableLines"><p>${vetFacP[i]}% </p></td>
     </tr>`
     
     $('#tableDemonstration').append(table);
 }

}
//_______________________________________________________________________________________________________

// ______________________________________________________________________________________________

$(document).ready(function () {
 //Adicionando o Nome da Variável
 let nameVariable;

 const inputEnter1 = document.querySelector('.nameVariable');
 inputEnter1.addEventListener('keyup', function (e) {
     var key = e.which || e.keyCode;
     if (key == 13) {
         if (!$(this).val()) {
             alert('Campo de Valores Vazio');
         } else {
             var valtext = '<span>' + '' + '</span>';
             $('#variavelText').append(valtext);
             nameVariable = $(this).val();
             console.log(nameVariable);
             $('#variavelPresent').removeClass('variavelPresent').addClass('variavelPresentActive');
             // valtext =   $(this).val() + '</span>';
             $('#variavelText').append($(this).val());
             inputEnter1.value = "";
         }
     }
 });

 //Adicionando Valores para em um vetor
 var Present = $('#chipsPresent');
 var chipPresent = $('.chipsPresent');
 var chipActive = $('.chipsActive');
 var presentText = $('#presentText');
 var valuesVector = [];

 $('.enter').keyup(function (e) {
     if (e.keyCode == 13) {
         if (!$(this).val()) {
             alert("Campo de Valores Vazio");
         }
         else {
             valuesVector.push($(this).val());
             console.log(valuesVector);
             Present.removeClass('chipsPresent').addClass('chipsActive');
             var text = '<p data-posicao="' + ($(this).val()) + '" class="delet">' + $(this).val() + '<label >x</label> </p>'
             presentText.append(text);
             $(this).val("");
         }
     }
 });

 $(document).on('click', '.delet', function () {
     $(this).remove();
     valuesVector.splice(valuesVector.indexOf($(this).attr('data-posicao')), 1);
     console.log(valuesVector);

 });

 $('#selectVariable').click(function () {
     if ($('#selectVariable').val() == "ordinal") {
         $('#modalValue').attr("id", "modalValue-Active");

     } else {
         if ($('#selectVariable').val() == "nominal" || $('#selectVariable').val() == "discreta" || $('#selectVariable').val() == "continua" || $('#selectVariable').val() == "") {
             $("#modalValue-Active").attr('id', 'modalValue');
         }
     }

 });



 $('.btnCalculate').click(function () {
     let type = $('#selectVariable').val();




     switch (type) {
         case 'ordinal':

             if ($('#valueOrganize').val() == null || $('#valueOrganize').val() == "") {
                 alert('Campo de Ordenação Vazio');

                 return false;
             }
             alert('Ordinaaall');
             break;
         case 'nominal':
             alert('Nominaaal');
             break
         case 'discreta':
             alert('Discretaaa');
             break;
         case 'continua':
             qtContinua(valuesVector,nameVariable);
             break
     }

     if (type == '') {
         alert("Escolha um tipo de Variável")
     } else {
         $(".content-Result").attr('class', 'content-ResultActive');
     }


 });

 function break()
 $('#selectBreaker').click(function () {
    let selectValue = $('#selectBreaker').val();
   if (selectValue == "4"){
       $('.quartil').toggle('selectBreaker-Active')
   }
     if (selectValue == "5"){
    $('.quintl').toggle('selectBreaker-Active')
    }
 if (selectValue == "10"){
        $('.decil').toggle('selectBreaker-Active')
    }
    if (selectValue == "100"){
        $('.porcentil').toggle('selectBreaker-Active')
    }

    

    // if(selectValue == '4' || (selectValue == '5') || (selectValue == '10') || (selectValue == '100')){
        
    // } 

    // switch(selectValue){
    //     case '4':
    //         $('.quartil').css('display', 'block');
    //         break
    //     case '5':
    //         $('.quintil').css('display', 'block');
    //         break
    //     case '10':
    //         $('.decil').css('display', 'block');
    //         break
    //     case '100':
    //         $('.porcentil').css('display', 'block');
    //         break
    // }

 });
});    