$(function(){
    function removeAlert(){
        $('.alertInput').removeClass('alertInput');
      }
    function scatterChart(dados,dados1,indValX,depY){
        var myChart = Highcharts.chart('container', {
            chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    yAxis: { //--- Primary yAxis
        title: {
            text: depY
        }
    },
    title: {
        text: 'Gráfico de Correlação',
        enabled:true,
        color:'rgb(13, 60, 66,)',
    },
    responsive: {  
        rules: [{  
          condition: {  
            maxWidth: 400  
          },  
          chartOptions: {  
            legend: {  
              enabled: false  
            }  
          }  
        }]
    },  
    series: [{
        name: indValX,
        color: 'rgba(223, 83, 83, .5)',
        data: dados
        },
        {
            type: 'line',
            name: 'Linha de Regressão',
            data: dados1,
            marker: {
                enabled: false
            }
        }]
    });
        
    }
    
    
    //______________________________________
    var regA,regB;

    //_________Função_______
    function correlacao(vetX, vetY,indValX,depY) {

        // Declaração de Variáveis
        let eXI = 0;
        let eYI = 0;
        let eXIYI = 0;
        let eXI2 = 0;
        let eYI2 = 0;
        let vetXIYI = [];
        let vetXI2 = [];
        let vetYI2 = [];
        let cor = 0;

        // Criando vetores para calculo da correlação
        for (let i = 0; i < vetX.length; i++) {
            vetXIYI.push(vetX[i] * vetY[i]);
            vetXI2.push(vetX[i] ** 2);
            vetYI2.push(vetY[i] ** 2);
            eXI += vetX[i];
            eYI += vetY[i];
            eXIYI += vetXIYI[i];
            eXI2 += vetXI2[i];
            eYI2 += vetYI2[i];
        }

        // Calculando Correlação
        cor = ((((vetX.length * eXIYI) - (eXI * eYI)) / Math.sqrt((vetX.length * eXI2 - (eXI) ** 2) * ((vetY.length * eYI2) - (eYI) ** 2))) * 100).toFixed(2);
        if (cor < 0) {
            cor = cor * -1;
        }

        // Calculando A e B para equação de regressão
        regA = (((vetXIYI.length * eXIYI) - (eXI * eYI)) / ((vetX.length * eXI2) - (eXI) ** 2)).toFixed(2);
        regB = ((eYI / vetY.length) - (regA * (eXI / vetX.length))).toFixed(2);
        apresent(cor);

        let dados = [];
        let dados1 = [];
       
        if(vetX.length == vetY.length){
            let ultposition = vetX.length - 1;
            dados1.push([vetX[0],vetY[0]]);
            dados1.push([vetX[ultposition],vetY[ultposition]]); 
            for(let i = 0; i < vetX.length; i++){
                dados.push([vetX[i],vetY[i]]);       
            }
        }
        let min = dados.map(Number).reduce(function(a,b,c,d){
            return Math.min(a, b,c,d);
        });
        
        
        
        
        scatterChart(dados,dados1,indValX,depY);
        apresentTable(vetX, vetY,indValX,depY)
        $('.reloadPage').removeClass('d-none').addClass('d-block');     
    }

    function apresent(cor){
        let text = /*html*/`<p class="textCorrelation">Correlação ${cor}</p>`;
        $('#apresent').append(text);
    }

    //Tabela Correlacao
    function apresentTable(vetX, vetY,indValX,depY){
        let line1 = /*html*/`<tr>
                                <td class="tdVet tableTitle">${indValX}</td>
                                <td class="tdVet tableTitle tableLines">${depY}</td>
                            </tr>`
        $('#tableDemonstration').append(line1);
        for(let i = 0; i < vetX.length; i++){
            let line2 = /*html*/`<tr>
                                    <td class="tdVet tableTitle">${vetX[i]}</td>
                                    <td class="tdVet tableTitle tableLines">${vetY[i]}</td>
                                </tr>`
            $('#tableDemonstration').append(line2);
        }
       
    }
    //____________________Projeção
    function projecao(vlProj, ind,indValX,depY) {

        let proj = 0;

        if (ind == "x") {                  
            proj = parseFloat((regA * vlProj)) + parseFloat(regB);
            
        }
        if (ind == "y") {
            proj = parseFloat(((vlProj - regB) / regA)).toFixed(2);
        }

        if (proj < 0) {
            proj = proj * -1
        }
        

        if (ind == "x") {
            let apresentX= /*html*/`<p>Projeção para <strong>${indValX} = ${vlProj}</strong> : <strong>${depY}</strong> é igual a <strong>${proj}</strong></p>`;
            
            $('#apresent2').append(apresentX);
        }
        if (ind == "y") {
            let apresentY= /*html*/`<p>Projeção para <strong>${depY} = ${vlProj}</strong> : <strong>${indValX}</strong> é igual a <strong>${proj}</strong></p>`;
            
            $('#apresent2').append(apresentY);
        }
        
    }

    //______________________________________________________
    var modalPresentVal = $('#contentValueInd');
    var modalPresentTextVal = $('#Indtext');
    var indValX;

    $('#independentValue').keyup(function (e) {
        if (e.keyCode == 13) {
            if (!$(this).val()) {
                alert("Campo Vazio");
            }
            else {
                indValX = $(this).val();
                modalPresentVal.removeClass('IndepValue').addClass('IndepValue-Active');
                let depTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '</p>'
                modalPresentTextVal.append(depTest);
                $(this).val("");
                
            }
        }
    });
    //    $(document).on('click', '.deletOrdination', function () {
    //        $(this).remove();
    //        indValX.splice(indValX.indexOf($(this).attr('data-posicao')), 1);
    //    }); 
    var modalPresentVal2 = $('#contentValueDep');
    var modalPresentTextVal2 = $('#Deptext');
    var depY;

    $('#dependentValue').keyup(function (e) {
    if (e.keyCode == 13) {
        if (!$(this).val()) {
            alert("Campo Vazio");
        }
        else {
            depY = $(this).val();
            modalPresentVal2.removeClass('depValue').addClass('depValue-Active');
            let depTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '</p>'
            modalPresentTextVal2.append(depTest);
            $(this).val("");
            
        }
    }
    });
    // $(document).on('click', '.deletOrdination', function () {
    //     $(this).remove();
    //     depY.splice(depY.indexOf($(this).attr('data-posicao')), 1);
    // }); 

 var modalPresent = $('#resultIndepApresent');
 var modalPresentText = $('#presentIndText');
 var valuesIndepInput = [];

 $('#inputIndepent').keyup(function (e) {
     if (e.keyCode == 13) {
         if (!$(this).val()) {
             alert("Campo de Valores Vazio");
         }
         else {
             valuesIndepInput.push(parseFloat($(this).val()));
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
             valuesDepInput.push(parseFloat($(this).val()));
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
    }); 

    /*importação do arquivo, pego o arquivo da tela e jogo no fileReader*/
    var Reader = new FileReader();
 $('#btn-Import').change(function(){
    var file = document.getElementById('btn-Import').files[0];
    Reader.readAsText(file);
});

Reader.onload = function(evt){
    let fileArr = evt.target.result.split('\n').filter(x => x && x != " ");
    let fileVetX = fileArr[0].toString().split(';');
    let fileVetY = fileArr[1].toString().split(';');

    for(let item of fileVetX){
       
        valuesIndepInput.push(parseFloat(item));
        modalPresent.removeClass('IndepApresent').addClass('IndepApresent-Active');
        let indepText = '<p data-posicao="' + item + '" class="deletOrdination">' + item + '<label >x</label> </p>'
        modalPresentText.append(indepText);
    }
    for(let item of fileVetY){
        
        valuesDepInput.push(parseFloat(item));
        modalPresent2.removeClass('DepApresent').addClass('DepApresent-Active');
        let depTest = '<p data-posicao="' + item + '" class="deletOrdination">' + item + '<label >x</label> </p>'
        modalPresentText2.append(depTest);
     }
   
};
   
   
    $('#btn-Calc').click(function(){
         removeAlert()
         if(valuesIndepInput == ""){
            alert('Campo de Valor Vazio');
            $('#inputIndepent').addClass('alertInput');
        }else if( valuesDepInput == ""){
            alert('Campo de Valor Vazio');
            $('#inputDependent').addClass('alertInput');
        }else{
         let corX = valuesIndepInput;
        let corY = valuesDepInput;
        correlacao(corX,corY,indValX,depY);
        $('#tableCorrelation').removeClass('d-none').addClass('d-block');
        $('#apresentChat').removeClass('apresentChat').addClass('apresentChat-Active');
         $('#projection').css('display', 'block');
         let apresentSelect = /*html*/`<span>Para</span>
         <select class="textVariable" name="variable" id="selectProjectionLenght">
           <option class="textVariable" value=""> </option>
           <option class="textVariable" value="x"> ${indValX} </option>
           <option class="textVariable" value="y"> ${depY} </option>
         </select>
         <input type="number" id="valueprojectInput">`
          $('#selectProject').append(apresentSelect);
        }
    });

    //Projeção
    
    

    $('#CalcProject').on('click',function(){
        removeAlert()

        if($('#selectProjectionLenght').val() == ""){
            $('#selectProjectionLenght').addClass('alertInput');
        }else if($('#valueprojectInput').val() == ""){
            $('#valueprojectInput').addClass('alertInput');
        }else{
            let selectProj = $('#selectProjectionLenght').val()
            let valueProj = parseFloat($('#valueprojectInput').val());
            projecao(valueProj,selectProj,indValX,depY);
        }
        
    });
});



