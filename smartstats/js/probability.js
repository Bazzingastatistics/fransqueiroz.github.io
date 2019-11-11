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
});