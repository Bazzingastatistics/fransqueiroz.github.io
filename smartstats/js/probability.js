$(function(){
 /*Uniforme*/
 $('#btnProbCalc').click(function(){
  let initialValue = $('#inputStart').val();
  let finalValue = $('#inputEnd').val();
  let interVal = $('#selectLenght').val()
  /*Inserção dos Valores de Intervalo no Vetor*/
  let intervalValue = [];
  if($('#selectLenght').val() == '<'){
   intervalValue.push($('#inputInsertSmaller').val());
  }else if($('#selectLenght').val() == '>'){
   intervalValue.push($('#inputInsertBigger').val());
  }else{
   intervalValue.push($('#inputInsertMiddle').val(), $('#inputInsertMiddle2').val());
  }    
  /*Inserção dos Valores de Intervalo no Vetor*/
  console.log(initialValue);
  console.log(finalValue);
  console.log(interVal);
  console.log(intervalValue);

  $('#contentResulUniforme').html('');
  let dvPadrao = /*html*/` <p class="textPresentation">Desvio Padráo</p>`
  let Variance = /*html*/` <p class="textPresentation">Variancia</p>`
  let Mean = /*html*/` <p class="textPresentation">Media</p>`
  let probability = /*html*/` <p class="textPresentation">Probabilidade</p>`
  $('#contentResulUniforme').append(dvPadrao,Variance,Mean,probability);

 });


 /*Binomial*/
 $('#btnBinomialCalc').click(function(){
  let sampleSize = $('#sampleSize').val();
  let success = ($('#inputSuccess').val() / 100);
  let failure = ($('#inputFailure').val() / 100);
  let interval = $('#selectBinomialLenght').val();
  let event = [];
  event.push($('#inputEvent').val());

  console.log(sampleSize);
  console.log(success);
  console.log(failure);
  console.log(interval);
  console.log(event);

  $('#contentResulBinomial').html('');
  let probability = /*html*/` <p class="textPresentation">Probabilidade</p>`
  let Mean = /*html*/` <p class="textPresentation">Media</p>`
  let dvPadrao = /*html*/` <p class="textPresentation">Desvio Padráo</p>`  
  $('#contentResulBinomial').append(probability,Mean,dvPadrao);
 });

 /*Normal*/

 $('#btnNormalCalc').click(function(){
  let mean = $('#inputMean').val();
  let diversion = $('#inputDiversion').val();
  let variance = $('#inputVariance').val();
  let interval = $('#selectNormalLenght').val();
  let value = [];
  value.push($('#valueNormal').val());

  console.log(mean);
  console.log(diversion);
  console.log(variance);
  console.log(interval);
  console.log(value);


  /*Apresentação dos Resultados */
  $('#contentResult').html("");
  let resultPresentation = /*html*/`<p id="resultPresentation" >A média é ${mean}</p>`;
  $('#contentResult').append(resultPresentation);
  $('#resultPresentation').addClass('divActive');

 });
 
});