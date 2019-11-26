$(function () {
    function removeAlert() {
        $('.alertInput').removeClass('alertInput');
    }
    /*Uniforme*/
    function distUniforme(a, b, ind, vetX) {

        let prob;
        let x;
        let med;
        let desvPad;
        let cv;

        // Determinando X

        switch (ind) {
            case ">":
                x = b - vetX[0];
                break;
            case "<":
                x = vetX[0] - a;
                break;
            case "=":
                x = vetX[1] - vetX[0];
                break;
        }
        // Calculando a probabilidade
        prob = (((1 / (b - a)) * x) * 100).toFixed(2);
        // Média
        med = (a + b) / 2
        //Desvio Padrão
        desvPad = (Math.sqrt(((b - a) ** 2 / 12))).toFixed(2);
        //CV
        cv = Math.round((desvPad / med) * 100);
        apresentValue(desvPad, cv, med, prob);
    }

    /*Limpesa dados Uniforme*/
    $(".clearPage").click(function () {
        if (confirm("Deseja Limpar a Tela?")) {
            $('#inputStart').val('');
            $('#inputEnd').val('');
            $('#inputInsertSmaller').val('');
            $('#inputInsertBigger').val('');
            $('#inputInsertMiddle').val('');
            $('#inputInsertMiddle2').val('');
            $('#contentResulUniforme').html('');
        }
    });
    /*Apresentação De Dados*/
    function apresentValue(desvPad, cv, med, prob) {
        $('#contentResulUniforme').html('');
        let dvPadrao = /*html*/` <p class="textPresentation">Desvio Padrão = ${desvPad}</p>`
        let Variance = /*html*/` <p class="textPresentation">Coeficiente de Variação = ${cv}%</p>`
        let Mean = /*html*/` <p class="textPresentation">Média = ${med}</p>`
        let probability = /*html*/` <p class="textPresentation">Probabilidade = ${prob}%</p>`
        $('#contentResulUniforme').append(dvPadrao, Variance, Mean, probability);
        $('.btnlimpar').removeClass('d-none').addClass('d-block')
    }
    $('#btnProbCalc').click(function () {
        removeAlert()
        let initialValue = parseFloat($('#inputStart').val());
        let finalValue = parseFloat($('#inputEnd').val());
        let interVal = $('#selectLenght').val()
        if ($('#inputStart').val() == "") {
            $('#inputStart').addClass('alertInput');
        } else if ($('#inputEnd').val() == "") {
            $('#inputEnd').addClass('alertInput');
        } else if (interVal == "") {
            $('#selectLenght').addClass('alertInput');
        } else {
            let intervalValue = [];
            if ($('#selectLenght').val() == '<') {
                if ($('#inputInsertSmaller').val() == "") {
                    $('#inputInsertSmaller').addClass('alertInput');
                } else {
                    intervalValue.push($('#inputInsertSmaller').val());
                }
            } else if ($('#selectLenght').val() == '>') {
                if ($('#inputInsertBigger').val() == "") {
                    $('#inputInsertBigger').addClass('alertInput');
                } else {
                    intervalValue.push($('#inputInsertBigger').val());
                }
            } else {
                if ($('#inputInsertMiddle').val() == "") {
                    $('#inputInsertMiddle').addClass('alertInput');
                } else if ($('#inputInsertMiddle2').val() == "") {
                    $('#inputInsertMiddle2').addClass('alertInput');
                } else {
                    intervalValue.push($('#inputInsertMiddle').val(), $('#inputInsertMiddle2').val());
                }
            }

            /*Inserção dos Valores de Intervalo no Vetor*/

            distUniforme(initialValue, finalValue, interVal, intervalValue);
        }
        /*Inserção dos Valores de Intervalo no Vetor*/

    });

    /*Binomial*/
    function distBinomial(n, p, q, k, ind) {
        // Declarando Variáveis
        let anaComb;
        let vetComb = [];
        let vetP = [];
        let prob = 0;
        let vetK = [];
        // Determinando vetor que forma os múltiplos "k"
        switch (ind) {
            case "<":
                for (let i = k[0]; i > -1; i--) {
                    vetK.push(i);
                }
                break;
            case "-":
                for (let i = k[0]; i < n + 1; i++) {
                    vetK.push(i);
                }
                break;
            case "=":
                vetK.push(k);
                break;
            case "><":
                for (let i = k[0]; i < k[1] + 1; i++) {
                    vetK.push(i);
                }
                vetK.shift();
                vetK.pop();
                if (vetK == []) {
                    vetK.push(0);
                }
        }
        // Realizando cálculos de Análise Combinatória
        for (let i = 0; i < vetK.length; i++) {
            anaComb = (fatorial(n) / (fatorial(vetK[i]) * fatorial(n - vetK[i]))).toFixed(2);
            vetComb.push(parseFloat(anaComb));
        }
        // Calculando e somando as probabilidades dos múltiplos resultados
        for (let i = 0; i < vetK.length; i++) {
            let P = ((vetComb[i] * (p ** vetK[i]) * (q ** (n - vetK[i]))) * 100).toFixed(2);
            vetP.push(parseFloat(P));
        }
        for (let i = 0; i < vetP.length; i++) {
            prob += vetP[i];
        }
        // Calculando Média
        let med = n * p;
        // Calculando Desvio Padrão
        let desvPad = Math.sqrt((n * p * q)).toFixed(2);
        // Calculando CV
        let cv = ((desvPad / med) * 100).toFixed(2);
        apresentValueBinomial(prob, med, desvPad, cv);
    }

    // _________________________________________________ FATORIAL ________________________________________________________________________

    function fatorial(x) {
        let fat = 1;
        if (x < 0) {
            return 0;
        }
        else if (x == 0) {
            return 1;
        }
        else {
            for (let i = 1; i <= x; i++) {
                fat = fat * i
            }
        }
        return fat
    }

    $(".clearPageBinomial").click(function () {
        if (confirm("Deseja Limpar a Tela?")) {
            $('#sampleSize').val('');
            $('#inputSuccess').val('');
            $('#inputFailure').val('');
            $('#inputEvent').val('');
            $('#contentResulBinomial').html('');
        }
    });
    /*Apresentação dos Dados*/
    function apresentValueBinomial(prob, med, desvPad, cv) {
        $('#contentResulBinomial').html('');
        let probability = /*html*/` <p class="textPresentation">Probabilidade = ${prob.toFixed(2)}%</p>`
        let Mean = /*html*/` <p class="textPresentation">Média = ${med}</p>`
        let dvPadrao = /*html*/` <p class="textPresentation">Desvio Padrão = ${desvPad}</p>`
        let coefv = /*html*/` <p class="textPresentation">Coeficiente de Variação = ${cv}%</p>`
        $('#contentResulBinomial').append(probability, Mean, dvPadrao, coefv);
        $('.btnlimpar').removeClass('d-none').addClass('d-block')
    }
    $('#btnBinomialCalc').click(function () {
        removeAlert()
        if ($('#sampleSize').val() == "") {
            $('#sampleSize').addClass('alertInput');
        } else if ($('#inputSuccess').val() == "") {
            $('#inputSuccess').addClass('alertInput');
        } else if ($('#inputFailure').val() == "") {
            $('#inputFailure').addClass('alertInput');
        } else if ($('#selectBinomialLenght').val() == "") {
            $('#selectBinomialLenght').addClass('alertInput');
        } else {
            let sampleSize = parseFloat($('#sampleSize').val());
            let success = parseFloat(($('#inputSuccess').val() / 100));
            let failure = parseFloat(($('#inputFailure').val() / 100));
            let interval = $('#selectBinomialLenght').val();
            let event = [];
            if ($('#inputEvent').val() == "") {
                $('#inputEvent').addClass('alertInput');
            } else {
                event.push(parseFloat($('#inputEvent').val()));
                distBinomial(sampleSize, success, failure, event, interval);
            }
        }
    });

    /*Normal*/
    function distNormal(vetX, med, desvPad, ind) {
        // Declarando tabela de Distribuição Nornal
        let tabelaNormalZ = [];
        tabelaNormalZ[0] = [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359];
        tabelaNormalZ[1] = [0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753];
        tabelaNormalZ[2] = [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141];
        tabelaNormalZ[3] = [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517];
        tabelaNormalZ[4] = [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879];
        tabelaNormalZ[5] = [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224];
        tabelaNormalZ[6] = [0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549];
        tabelaNormalZ[7] = [0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852];
        tabelaNormalZ[8] = [0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133];
        tabelaNormalZ[9] = [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389];
        tabelaNormalZ[10] = [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621];
        tabelaNormalZ[11] = [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830];
        tabelaNormalZ[12] = [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015];
        tabelaNormalZ[13] = [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177];
        tabelaNormalZ[14] = [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319];
        tabelaNormalZ[15] = [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441];
        tabelaNormalZ[16] = [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545];
        tabelaNormalZ[17] = [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633];
        tabelaNormalZ[18] = [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706];
        tabelaNormalZ[19] = [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767];
        tabelaNormalZ[20] = [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817];
        tabelaNormalZ[21] = [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857];
        tabelaNormalZ[22] = [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890];
        tabelaNormalZ[23] = [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916];
        tabelaNormalZ[24] = [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936];
        tabelaNormalZ[25] = [0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952];
        tabelaNormalZ[26] = [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964];
        tabelaNormalZ[27] = [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974];
        tabelaNormalZ[28] = [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981];
        tabelaNormalZ[29] = [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986];
        tabelaNormalZ[30] = [0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990];
        tabelaNormalZ[31] = [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993];
        tabelaNormalZ[32] = [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995];
        tabelaNormalZ[33] = [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997];
        tabelaNormalZ[34] = [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998];
        tabelaNormalZ[35] = [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998];
        tabelaNormalZ[36] = [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999];
        tabelaNormalZ[37] = [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999];
        tabelaNormalZ[38] = [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999];
        tabelaNormalZ[39] = [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000];
        // Declarando variáveis
        let z = 0;
        let prob = 0;
        let vetZ = [];
        let vetProb = [];
        // Calculando vetZ (determinando valores de Z)
        for (let i = 0; i < vetX.length; i++) {
            let aux = (vetX[i] - med) / desvPad;
            if (aux < 0) {
                aux = aux * -1;
            }
            if (aux > 3.99) {
                aux = 3.99
            }
            vetZ.push(aux);
            aux = 0;
        }
        // Transformando valores a partir do vetZ
        if (vetZ.length == 2) {
            for (let i = 0; i < vetZ.length; i++) {
                z = (vetZ[i] * 10).toFixed(1);
                z = z.toString();
                let vetZStr = z.split(".");
                vetProb.push((tabelaNormalZ[parseInt(vetZStr[0])][parseInt(vetZStr[1])]));
                vetZStr = [];
            }
            if (vetX[0] <= med && vetX[1] >= med) {
                prob = ((parseFloat(vetProb[0]) + parseFloat(vetProb[1])) * 100).toFixed(2);
            }
            if (vetX[0] < med && vetX[1] < med) {
                prob = ((parseFloat(vetProb[0]) - parseFloat(vetProb[1])) * 100).toFixed(2);
            }
            if (vetX[0] > med && vetX[1] > med) {
                prob = ((parseFloat(vetProb[1]) - parseFloat(vetProb[0])) * 100).toFixed(2);
            }
        }
        // Convertendo os valores com base na tabela normal e calculando a probabilidade
        if (vetZ.length == 1) {
            z = (vetZ[0] * 10).toFixed(1);
            z = z.toString();
            let vetZStr = z.split(".");
            vetProb.push((tabelaNormalZ[parseInt(vetZStr[0])][parseInt(vetZStr[1])]));
            vetProb.push(0.5000);
            if ((vetX[0] < med && ind == ">") || (vetX[0] > med && ind == "<")) {
                prob = ((parseFloat(vetProb[0]) + parseFloat(vetProb[1])) * 100).toFixed(2);
            }
            else {
                prob = ((parseFloat(vetProb[1]) - parseFloat(vetProb[0])) * 100).toFixed(2);
            }
        }
        apresentValueNormal(prob)
    }

    $(".clearPageNormal").click(function () {
        if (confirm("Deseja Limpar a Tela?")) {
            $('#inputMean').val('');
            $('#inputDiversion').val('');
            $('#valueNormal1').val('');
            $('#valueNormal2').val('');
            $('#contentResult').html('');
        }
    });
    function apresentValueNormal(prob) {
        $('#contentResult').html("");
        let resultPresentation = /*html*/`<p id="resultPresentation" >Probabilidade = ${prob}%</p>`;
        $('#contentResult').append(resultPresentation);
        $('#resultPresentation').addClass('divActive');
    }
    $('#selectNormalLenght').click(function () {
        $('.valueNormal').html('');
        if ($('#selectNormalLenght').val() == "|") {
            if (screen.width < 640 || screen.height < 480) {
                $('#valueNormal').css('flexDirection', 'column');
                let insertNormal = /*html*/`<div>
                                            <span style="margin-bottom:-10px">Min</span><input type="text" id="valueNormal1"> </input>
                                            <span style="margin-bottom:-10px">Max</span><input type="text" id="valueNormal2"> </input>
                                        </div>`
                $('.valueNormal').append(insertNormal);
            } else {
                $('#valueNormal').css('flexDirection', 'row');
                let insertNormal = /*html*/`<input type="text" id="valueNormal1"> </input>
                                        <input type="text" id="valueNormal2"> </input>`
                $('.valueNormal').append(insertNormal);
            }
        } else {
            let insertNormal = /*html*/`<input type="text" id="valueNormal1"> </input>`
            $('.valueNormal').append(insertNormal);
        }
        $('.btnlimpar').removeClass('d-none').addClass('d-block')
    });
    $('#btnNormalCalc').click(function () {
        removeAlert()
        if ($('#inputMean').val() == "") {
            $('#inputMean').addClass('alertInput');
        } else if ($('#inputDiversion').val() == "") {
            $('#inputDiversion').addClass('alertInput');
        } else if ($('#selectNormalLenght').val() == "") {
            $('#selectNormalLenght').addClass('alertInput');
        } else {
            let mean = parseFloat($('#inputMean').val());
            let diversion = parseFloat($('#inputDiversion').val());
            let interval = $('#selectNormalLenght').val();
            var value = [];
            if ($('#selectNormalLenght').val() == "|") {
                if ($('#valueNormal1').val() == "") {
                    $('#valueNormal1').addClass('alertInput');
                } else if ($('#valueNormal2').val() == "") {
                    $('#valueNormal2').addClass('alertInput');
                } else {
                    value.push(parseFloat($('#valueNormal1').val()));
                    value.push(parseFloat($('#valueNormal2').val()));
                    distNormal(value, mean, diversion, interval);
                }
            } else {
                if ($('#valueNormal1').val() == "") {
                    $('#valueNormal1').addClass('alertInput');
                } else {
                    value.push(parseFloat($('#valueNormal1').val()));
                    distNormal(value, mean, diversion, interval);
                }
            }
        }


        
        /*Apresentação dos Resultados */
    });
});