$(function(){
    //Function Chart
    var ctx = $('#myChart');

    function scatterChart(dados,name){
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: name,
                data: dados
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
        return true
    }
    //______________________________________
    var regA,regB;

    //_________Função_______
    function correlacao(vetX, vetY) {

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

        let dados ={};

         for(let i = 0; i < vetX.length; i++){
             dados= vetX[0],vetY[0];
         }

         console.log(dados);

    }

    function apresent(cor){
        let text = /*html*/`<p>Correlação ${cor}</p>`;
        $('#apresent').append(text);
    }

    //____________________Projeção
    function projecao(vlProj, ind) {

        let proj = 0;

        if (ind == "x") {                  
            proj = parseFloat((regA * vlProj + regB)).toFixed(2);
            
        }
        if (ind == "y") {
            proj = parseFloat(((vlProj - regB) / regA)).toFixed(2);
        }

        if (proj < 0) {
            proj = proj * -1
        }

        if (ind == "x") {
            let apresentX= /*html*/`<p>Projeção para ${ind} = ${vlProj} : Y é igual a ${proj}</p>`;
            $('#apresent2').append(apresentX);
        }
        if (ind == "y") {
            let apresentY= /*html*/`<p>Projeção para ${ind} = ${vlProj} : X é igual a ${proj}</p>`;
            $('#apresent2').append(apresentY);
        }
      
      
    }


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


    $('#btn-Calc').click(function(){
        let corX = valuesIndepInput;
        let corY = valuesDepInput;
        correlacao(corX,corY);
        
    });

    //Projeção

    
    $('#Calc').click(function(){
        let selectProj = $('#selectProjectionLenght').val()
         let valueProj = parseFloat($('#valueprojectInput').val());
        projecao(valueProj,selectProj);
    });
});
