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
 });
 
});