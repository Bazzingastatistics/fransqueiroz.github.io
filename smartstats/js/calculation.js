// Funções de Cálculo

// Qualitativa Nominal

function qlNominal(vetor) {

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
            vetFr.push(((vetFi[k] / vetor.length) * 100).toFixed(2));

            // Carregando vetor da frequência acumulada
            if (k == 0) {
                vetFac.push(vetFi[k]);
                vetFacP.push((parseFloat(vetFr[k])).toFixed(2));
                k++
            }
            else {
                vetFac.push(vetFac[k - 1] + vetFi[k]);
                vetFacP.push(((parseFloat(vetFacP[k - 1])) + parseFloat(vetFr[k])).toFixed(2));
                k++
            }
        }
        acum = 0;
    }

    // Moda
    vetModa = modaGeral(vetFi, vetE);

    // Mediana
    vetMediana = medianaGeral(vetor);

    tableFull(nameVariable, lin,vetE, vetFi, vetFr, vetFac, vetFacP);
}

// Qualitativa Ordinal

function qlOrdinal(vetor, vetorOrd) {

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
    let k = 0;
    let acum = 0;

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
            vetFr.push(((vetFi[k] / vetor.length) * 100).toFixed(2));

            // Carregando vetor da frequência acumulada
            if (k == 0) {
                vetFac.push(vetFi[k]);
                vetFacP.push((parseFloat(vetFr[k])).toFixed(2));
                k++
            }
            else {
                vetFac.push(vetFac[k - 1] + vetFi[k]);
                vetFacP.push(((parseFloat(vetFacP[k - 1])) + parseFloat(vetFr[k])).toFixed(2));
                k++
            }
        }
        acum = 0;
    }
    // Moda
    vetModa = modaGeral(vetFi, vetE);

    // Mediana
    vetMediana = medianaGeral(vetor);

    tableFull(nameVariable, lin,vetE, vetFi, vetFr, vetFac, vetFacP);
}

// Quantitativa Discreta

function qtDiscreta(vetor, nameVariable, analiseDiscreta) {

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
            vetFr.push(((vetFi[k] / vetor.length) * 100).toFixed(2));

            // Carregando vetor da frequência acumulada
            if (k == 0) {
                vetFac.push(vetFi[k]);
                vetFacP.push((parseFloat(vetFr[k])).toFixed(2));
                k++
            }
            else {
                vetFac.push(vetFac[k - 1] + vetFi[k]);
                vetFacP.push(((parseFloat(vetFacP[k - 1])) + parseFloat(vetFr[k])).toFixed(2));
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

    // Desvio Padrão e Coeficiente da Variável
    let acumDesv = 0;
    let desvPad = 0;
    let cv = 0;

    if (analiseDiscreta == "amostra") {
        for (let l = 0; l < vetFi.length; l++) {
            acumDesv += (((vetE[l] - med) ** 2) * vetFi[l]);
        }
        desvPad = Math.sqrt((acumDesv / (vetor.length - 1))).toFixed(2);
    }
    if (analiseDiscreta == "população") {
        for (let l = 0; l < vetFi.length; l++) {
            acumDesv += (((vetE[l] - med) ** 2) * vetFi[l]);
        }
        desvPad = Math.sqrt((acumDesv / (vetor.length))).toFixed(2);
    }

    cv = Math.round(((desvPad / med) * 100));

    tableFull(nameVariable, lin,vetE, vetFi, vetFr, vetFac, vetFacP);
}

// Quantitativa Continua
function qtContinua(vetor, nameVariable, analiseContinua) {

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
        vetFr.push(((vetFi[i] / vetor.length) * 100).toFixed(2));

        // Carregando vetor da frequência acumulada
        if (i == 0) {
            vetFac.push(vetFi[i]);
        }
        else {
            vetFac.push(vetFac[i - 1] + vetFi[i]);
        }

        // Carregando vetor da frequência acumulada percentual
        vetFacP.push(((vetFac[i] / vetor.length) * 100).toFixed(2));

        //Zerando contador
        acItem = 0;

    }

    // Moda
    let vetModa = [];
    let eMax = Math.max.apply(null, vetFi);
    let posModa = vetFi.indexOf(eMax);
    vetModa.push((vetMin[posModa] + vetMax[posModa]) / 2);

    // Calcular a média
    for (let k = 0; k < vetMin.length; k++) {
        acMed = acMed + ((vetMin[k] + vetMax[k]) / 2) * vetFi[k];
    }
    med = (acMed / vetor.length).toFixed(2);

    // Calcular a mediana
    let vetMediana = [];
    let pos = Math.round(vetor.length * 0.5);
    let limInf
    for (let l = 0; l < vetMin.length; l++) {
        if ((vetMin[l] + int) > vetor[pos]) {
            limInf = vetMin[l];
            if (l == 0) {
                vetMediana.push(limInf + (((pos - 0) / vetFi[l]) * int));
                break;
            } else
                vetMediana.push(limInf + (((pos - vetFac[l - 1]) / vetFi[l]) * int));
            break;
        }
    }

    // Desvio Padrão e Coeficiente da Variável
    let acumDesv = 0;
    let desvPad = 0;
    let cv = 0;

    if (analiseContinua == "amostra") {
        for (let n = 0; n < vetFi.length; n++) {
            acumDesv += (((((vetMin[n] + vetMax[n]) / 2) - med) ** 2) * vetFi[n]);
        }
        desvPad = Math.sqrt((acumDesv / (vetor.length - 1))).toFixed(2);
    }
    if (analiseContinua == "população") {
        for (let n = 0; n < vetFi.length; n++) {
            acumDesv += (((((vetMin[n] + vetMax[n]) / 2) - med) ** 2) * vetFi[n]);
        }
        desvPad = Math.sqrt((acumDesv / (vetor.length))).toFixed(2);
    }

    cv = Math.round(((desvPad / med) * 100));



    tableContinua(nameVariable, lin, vetMin, vetMax, vetFi, vetFr, vetFac, vetFacP);
}

//__________________________________________________________________________

// Moda Geral
function modaGeral(vetFi, vetE) {
    let eMax = Math.max.apply(null, vetFi);
    let indices = [];
    let vetModa = [];
    let posModa = vetFi.indexOf(eMax);
    while (posModa != -1) {
        indices.push(posModa);
        posModa = vetFi.indexOf(eMax, posModa + 1);
    }
    for (let l = 0; l < indices.length; l++) {
        vetModa.push(vetE[indices[l]]);
    }
    return vetModa;
}

// Mediana Geral
function medianaGeral(vetor) {
    let vetMediana = [];
    if (vetor.length % 2 == 0) {
        vetMediana.push(vetor[(vetor.length / 2) - 1]);
        vetMediana.push(vetor[Math.round((vetor.length / 2))]);
    } else {
        vetMediana.push(vetor[Math.round((vetor.length / 2)) - 1]);
    }
    return vetMediana;
}

//Separatriz Geral
function sepGeral(vetor, sepGeral) {
    let pos = Math.round((vetor.length * (sepGeral / 100)) - 1);
    if (pos < 0) {
        pos = 0;
    }
    return vetor[pos];
}

//Separatriz Continua

function sepCt(vetor, sepContinua) {

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
        vetFr.push(((vetFi[i] / vetor.length) * 100).toFixed(2));

        // Carregando vetor da frequência acumulada
        if (i == 0) {
            vetFac.push(vetFi[i]);
        }
        else {
            vetFac.push(vetFac[i - 1] + vetFi[i]);
        }

        //Zerando contador
        acItem = 0;

    }

    // Medidas Separatrizes da Contínua
    let posQa = (vetor.length * (sepContinua / 100)).toFixed(2);
    let limInfSep;
    let sepQtContinua;
    for (let m = 0; m < vetMin.length; m++) {
        if ((vetMin[m] + int) > vetor[Math.round(posQa)]) {
            limInfSep = vetMin[m];
            if (m == 0) {
                sepQtContinua = (limInfSep + (((posQa - 0) / vetFi[m]) * int)).toFixed(2);
                break;
            } else
                sepQtContinua = (limInfSep + (((posQa - vetFac[m - 1]) / vetFi[m]) * int)).toFixed(2);
            break;
        }
    }
    return sepQtContinua;
}

//_______________________________________________________________________________

// Gerando Tabelas 

//Tabela Nominal, Ordinal, Discreta

function tableFull(nameVariable,vetE, vetFi, vetFr, vetFac, vetFacP) {
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
        let table = `<tr><td class="tdVet"><p>${vetE[i]}</p></td>
                      <td class="tdVet tableLines"><p>${vetFi[i]} </p></td>
                      <td class="tdVet tableLines"><p>${vetFr[i]}% </p></td>
                      <td class="tdVet tableLines"><p>${vetFac[i]} </p></td>
                      <td class="tdVet tableLines"><p>${vetFacP[i]}% </p></td>
     </tr>`

        $('#tableDemonstration').append(table);
    }
    let table2 = `<tr>
                 <td class="tdVet tableTitle">Medias</td>
                 <td class="tdVet tableTitle tableLines">Moda</td>
                 <td class="tdVet tableTitle tableLines">Mediana%</td>
                 <td class="tdVet tableTitle tableLines">Desvio Padrão</td>
                 <td class="tdVet tableTitle tableLines">Coeficiente de Variação%</td>
              </tr>`
    
              $('#tableDemonstration-Medias').append(table2);
    let table3 = `<tr><td class="tdVet"><p>${vetMin[i]} |--- ${vetMax[i]}</p></td>
                <td class="tdVet tableLines"><p>${vetFi[i]} </p></td>
                <td class="tdVet tableLines"><p>${vetFr[i]}% </p></td>
                <td class="tdVet tableLines"><p>${vetFac[i]} </p></td>
                <td class="tdVet tableLines"><p>${vetFacP[i]}% </p></td>
                </tr>`


}

//Tabela Continua
function tableContinua(nameVariable, lin, vetMin, vetMax, vetFi, vetFr, vetFac, vetFacP) {
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
    let table2 = `<tr>
                 <td class="tdVet tableTitle">Medias</td>
                 <td class="tdVet tableTitle tableLines">Moda</td>
                 <td class="tdVet tableTitle tableLines">Mediana</td>
                 <td class="tdVet tableTitle tableLines">Desvio Padrão</td>
                 <td class="tdVet tableTitle tableLines">Coeficiente de Variação%</td>
              </tr>`
    
              $('#tableDemonstration-Medias').append(table2);
    // let table3 = `<tr><td class="tdVet"><p>${vetMin[i]} |--- ${vetMax[i]}</p></td>
    //             <td class="tdVet tableLines"><p>${vetFi[i]} </p></td>
    //             <td class="tdVet tableLines"><p>${vetFr[i]}% </p></td>
    //             <td class="tdVet tableLines"><p>${vetFac[i]} </p></td>
    //             <td class="tdVet tableLines"><p>${vetFacP[i]}% </p></td>
    //             </tr>`


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

    //Campo de ordenação

    var modalPresent = $('#modalPresent');
    var modalPresentText = $('#organizeText');
    var valuesOrdination = [];

    $('.enterOrganize').keyup(function (e) {
        if (e.keyCode == 13) {
            if (!$(this).val()) {
                alert("Campo de Ordenação Vazio");
            }
            else {
                valuesOrdination.push($(this).val());
                console.log(valuesOrdination);
                modalPresent.removeClass('modalPresent').addClass('modalPresentActive');
                let ordenationTest = '<p data-posicao="' + ($(this).val()) + '" class="deletOrdination">' + $(this).val() + '<label >x</label> </p>'
                modalPresentText.append(ordenationTest);
                $(this).val("");
            }
        }
    });

    $(document).on('click', '.deletOrdination', function () {
        $(this).remove();
        valuesOrdination.splice(valuesOrdination.indexOf($(this).attr('data-posicao')), 1);
        console.log(valuesOrdination);
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

    let universe;

    $('#selectSampling').click(function () {
        universe = $(this).val();
        console.log(universe);
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
        if ($('#selectVariable').val() == null || $('#selectVariable').val() == "") {
            alert("Escolha um tipo de Variável")
        } else {

            switch (type) {
                case 'ordinal':

                    if ($('#valueOrganize').val() == null || $('#valueOrganize').val() == "") {
                        alert('Campo de Ordenação Vazio');

                        return false;
                    }

                    qlOrdinal(valuesVector, valuesOrdination, nameVariable);
                    //  Adicionar esse no botão calcular da Separatriz adicionando uma variavel.
                    //  let sepQlOrdinal = sepGeral(valuesVector, sepOrdinal);
                    break;
                case 'nominal':

                    qlNominal(valuesVector, nameVariable);
                    // let sepQlNominal = sepGeral(valuesVector, sepNominal);
                    break
                case 'discreta':

                    qtDiscreta(valuesVector, nameVariable, universe);
                    // let sepQtDiscreta = sepGeral(valuesVector, sepDiscreta);
                    break;
                case 'continua':

                    qtContinua(valuesVector, nameVariable, universe);
                    // let sepQtContinua = sepCt(valuesVector, sepContinua);
                    break
            }
            $(".content-Result").attr('class', 'content-ResultActive');


        }


    });

    $('#selectBreaker').click(function () {
        console.log();

        if ($(this).val() == "4") {

            $('#inputBreaker').attr('max', 4);
        }
        if ($(this).val() == "5") {

            $('#inputBreaker').attr('max', 5);
        }
        if ($(this).val() == "10") {

            $('#inputBreaker').attr('max', 10);
        }
        if ($(this).val() == "100") {

            $('#inputBreaker').attr('max', 100);
        }
    });




});
