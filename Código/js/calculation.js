// Funções de Cálculo

function qlNominal(vetor, quartilNominal, quintilNominal, decentilNominal, percentilNominal) {

    // Ordenando o vetor
    vetor.sort();

    // Declarando variáveis
    let vetFi = [];
    let vetE = [];
    let vetFr = [];
    let vetFac = [];
    let vetFacP = [];
    let vetModa = [];
    let vetMediana = [];
    let k = 0;
    let acum = 0;

    // Tabela provisória (demonstração de dados)
    document.write("Qualitativa Nominal" + "<br>")
    document.write("Descrição ------ Valor------ Fr% ------ Fac ------ Fac%" + "<br>");

    // Acumulando valores e carregando vetores(para uso posterior)
    for (let i = 0; i < vetor.length; i++) {
        for (let j = i; j < vetor.length; j++) {
            if (vetor[i] == vetor[i - 1]) {
                break
            }
            else if (vetor[i] == vetor[j]) {
                acum += 1;
            }
        }
        if (acum > 0) {
            vetFi.push(acum);
            vetE.push(vetor[i]);

            // Carregando vetor da frequência em percentual
            vetFr.push(Math.round((vetFi[k] / vetor.length) * 100));

            // Carregando vetor da frequência acumulada
            if (k == 0) {
                vetFac.push(vetFi[k]);
                vetFacP.push(vetFr[k]);
                k++
            }
            else {
                vetFac.push(vetFac[k - 1] + vetFi[k]);
                vetFacP.push(vetFacP[k - 1] + vetFr[k]);
                k++
            }
        }
        acum = 0;
    }

    // Moda
    vetModa = modaGeral(vetFi, vetE);

    // Mediana
    vetMediana = medianaGeral(vetor);

    // Quartil
    let quartil = quartilGeral(vetor, quartilNominal);

    // Quintil
    let quintil = quintilGeral(vetor, quintilNominal);

    // Decentil
    let decentil = decentilGeral(vetor, decentilNominal);

    // Percentil
    let percentil = percentilGeral(vetor, percentilNominal);

    // Criando a tabela provisória para apresentar dados
    for (let k = 0; k < vetE.length; k++) {
        document.write(`${vetE[k]} ---------------- ${vetFi[k]} ----------- 
        ${vetFr[k]}% ------ ${vetFac[k]} ------- ${vetFacP[k]}% <br>`);
    }
    document.write(`<br>Moda: ${vetModa} </br> Mediana: ${vetMediana}</br> 
    Quartil ${quartilNominal}: ${quartil}</br> Quintil ${quintilNominal}: ${quintil}</br>
    Decentil ${decentilNominal}: ${decentil}</br> 
    Percentil ${percentilNominal}: ${percentil}</br>`);
}

//_____________________________________________ QUALITATIVA ORDINAL ______________________________________________________________________

function qlOrdinal(vetor, vetorOrd, quartilOrdinal, quintilOrdinal, decentilOrdinal, percentilOrdinal) {

    // Ordenando o vetor
    vetor.sort(function (a, b) {
        return a - b;
    });

    // Invertendo o vetor
    //vetor.reverse();

    // Declarando variáveis
    let vetFi = [];
    let vetE = [];
    let vetFr = [];
    let vetFac = [];
    let vetFacP = [];
    let vetModa = [];
    let vetMediana = [];
    let k = 0;
    let acum = 0;

    // Tabela provisória (demonstração de dados)
    document.write("Qualitativa Ordinal" + "<br>")
    document.write("Descrição ------ Valor ------ Fr% ------ Fac ------ Fac%" + "<br>");

    // Acumulando valores e carregando vetores(para uso posterior)
    for (let i = 0; i < vetorOrd.length; i++) {
        for (let j = i; j < vetor.length; j++) {
            if (vetorOrd[i] == vetor[j]) {
                acum += 1;
            }
        }
        if (acum > 0) {
            vetFi.push(acum);
            vetE.push(vetorOrd[i]);

            // Carregando vetor da frequência em percentual
            vetFr.push(Math.round((vetFi[k] / vetor.length) * 100));

            // Carregando vetor da frequência acumulada
            if (k == 0) {
                vetFac.push(vetFi[k]);
                vetFacP.push(vetFr[k]);
                k++
            }
            else {
                vetFac.push(vetFac[k - 1] + vetFi[k]);
                vetFacP.push(vetFacP[k - 1] + vetFr[k]);
                k++
            }
        }
        acum = 0;
    }
    // Moda
    vetModa = modaGeral(vetFi, vetE);

    // Mediana
    vetMediana = medianaGeral(vetor);

    // Quartil
    let quartil = quartilGeral(vetor, quartilOrdinal);

    // Quintil
    let quintil = quintilGeral(vetor, quintilOrdinal);

    // Decentil
    let decentil = decentilGeral(vetor, decentilOrdinal);

    // Percentil
    let percentil = percentilGeral(vetor, percentilOrdinal);

    // Criando a tabela provisória para apresentar dados
    for (let k = 0; k < vetE.length; k++) {
        document.write(`${vetE[k]} ---------------- ${vetFi[k]} ----------- 
        ${vetFr[k]}% ------ ${vetFac[k]} ------- ${vetFacP[k]}% <br>`);
    }
    document.write(`<br>Moda: ${vetModa} </br> Mediana: ${vetMediana}</br> 
    Quartil ${quartilOrdinal}: ${quartil}</br> Quintil ${quintilOrdinal}: ${quintil}</br>
    Decentil ${decentilOrdinal}: ${decentil}</br> 
    Percentil ${percentilOrdinal}: ${percentil}</br>`);
}

//_____________________________________________ QUANTITATIVA DISCRETA ______________________________________________________________________

function qtDiscreta(vetor, quartilDiscreta, quintilDiscreta, decentilDiscreta, percentilDiscreta) {

    // Ordenando o vetor
    vetor.sort(function (a, b) {
        return a - b;
    });

    // Declarando variáveis
    let vetFi = [];
    let vetE = [];
    let vetFr = [];
    let vetFac = [];
    let vetFacP = [];
    let vetModa = [];
    let vetMediana = [];
    let acum = 0;
    let k = 0;
    let acMed = 0;

    // Tabela provisória (demonstração de dados)
    document.write("Quantitativa Discreta" + "<br>");
    document.write("Descrição -------- Quantidade ------ Fr% ------ Fac ------ Fac%" + "<br>");

    // Acumulando valores e carregando vetores(para uso posterior)
    for (let i = 0; i < vetor.length; i++) {
        for (let j = i; j < vetor.length; j++) {
            if (vetor[i] == vetor[i - 1]) {
                break
            }
            else if (vetor[i] == vetor[j]) {
                acum += 1;
            }
        }
        if (acum > 0) {
            vetE.push(vetor[i]);
            vetFi.push(acum);
            acMed = acMed + (vetor[i] * acum);

            // Carregando vetor da frequência em percentual
            vetFr.push(Math.round((vetFi[k] / vetor.length) * 100));

            // Carregando vetor da frequência acumulada
            if (k == 0) {
                vetFac.push(vetFi[k]);
                vetFacP.push(vetFr[k]);
                k++
            }
            else {
                vetFac.push(vetFac[k - 1] + vetFi[k]);
                vetFacP.push(vetFacP[k - 1] + vetFr[k]);
                k++
            }
        }
        acum = 0;
    }

    // Moda
    vetModa = modaGeral(vetFi, vetE);

    // Média
    let med = (acMed / vetor.length).toFixed(2);

    // Mediana
    vetMediana = medianaGeral(vetor);

    // Quartil
    let quartil = quartilGeral(vetor, quartilDiscreta);

    // Quintil
    let quintil = quintilGeral(vetor, quintilDiscreta);

    // Decentil
    let decentil = decentilGeral(vetor, decentilDiscreta);

    // Percentil
    let percentil = percentilGeral(vetor, percentilDiscreta);

    // Criando a tabela provisória para apresentar dados
    for (let k = 0; k < vetE.length; k++) {
        document.write(`${vetE[k]} ------------------- ${vetFi[k]} ------------- 
        ${vetFr[k]}% ------- ${vetFac[k]} -------- ${vetFacP[k]}% <br>`);
    }
    document.write(`<br>Moda: ${vetModa} </br> Mediana: ${vetMediana}</br>Média: ${med}</br> 
    Quartil ${quartilDiscreta}: ${quartil}</br> Quintil ${quintilDiscreta}: ${quintil}</br>
    Decentil ${decentilDiscreta}: ${decentil}</br> 
    Percentil ${percentilDiscreta}: ${percentil}</br>`);
}

//_____________________________________________ QUANTITATIVA CONTÍNUA ______________________________________________________________________
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
            if ($('#selectVariable').val() == "nominal" || $('#selectVariable').val() == "discreta" || $('#selectVariable').val() == "continua") {
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
});    