//<![CDATA[
window.onload=function(){

    console.log('vamos ver...')

	$("#btnCompare").click(function(){
		var word1 = $("#word1").val();
		var word2 = $("#word2").val();
		$("#msgs").html("Diferenca entre: " + word1 + " <==> " + word2 + " = " +distance(word1, word2));
	});
	

    $("#btnLoadJSON").click(function(){

    $("#wordsDistancesTbl").empty(); // Limpa o panel para 

// ==============================================================================================
// ------------------------ VARIAVEIS PRINCIPAIS ------------------------------------------------
// ===============================================================================================
    // Separa os dados da resposta do JSON em duas Arrays: cabecalho e respostas -- -- -- -- -- --
    var cabecalhoDados = Array(); // Array que recebera o cabecalho dos dados
    var respostasDados = Array(); // Array que recebera os resultados dos dados   
    var distEntrePalavras = Array(); // Array que recebera o resultado da analise de distancia entre as palavras
// -----------------------------------------------------------------------------------------------
    // Recebe o a fonte de dados (JSON)
    var JSONdataSource = $("#dataSource  option:selected").val();
    // Recuper criterio para analise de distancia ---   ---   ---   ---   ---   ---   ---  ---   --
    var tipoAnalise = $("#tipoAnalise  option:selected").val();    
    // Recupera tipo de retorno (return) ---   ---   ---   ---   ---   ---   ---  ---   --
    var outputType = $("#outputType  option:selected").val();
// ===============================================================================================
          
    // FIM - Recupera tipo de retorno (return) ---   ---   ---   ---   ---   ---   ---  --
    // -----------------------------------------------------------------------------------

        $("#resultDadosJSON").load("./data/"+JSONdataSource+".json", function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                alert("External content loaded successfully!");
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);

            var arrayWordsToCompare = JSON.parse(responseTxt) // Tranforma em Objeto o texto no formato JSON
// -----------------------------------------------------------------------------------------------------------

                switch(JSONdataSource){

                    // Caso o JSON dos dados seja de todos os alunos (linha == aluno & coluna == palavra)
                    case "preTeste_todosAlunos":
                        var tempVar = TrataJSONtoArray(arrayWordsToCompare ,JSONdataSource)
                        cabecalhoDados = tempVar[0];
                        respostasDados = tempVar[1];
                    break;

                    // Caso o JSON dos dados seja de um aluno especifico (linha == palvra & coluna == sonda )
                    // --> ARTENCAO: O retorno do
                    case "sondas_aluno-A":
                        var tempVar = TrataJSONtoArray(arrayWordsToCompare ,JSONdataSource)
                        cabecalhoDados = tempVar[0];
                        respostasDados = tempVar[1];
                    break;

                    default:
                    arrayWordsToCompare = arrayWordsToCompare.data;

                } // END - switch(JSONdataSource)
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

            // console.log("Array Palavras Modelo: ", cabecalhoDados);            
            // console.log("Array Respostas do aluno: ", respostasDados);

            // Recebe a distancia entre a palavra modelo e a resposta de cada valor 
            distEntrePalavras = DefineParametrosAnalise(cabecalhoDados, respostasDados, tipoAnalise, outputType)

            var saidaResultadoAnalise = new DiferencaEntrePalavras(cabecalhoDados, respostasDados, distEntrePalavras);
            console.log(saidaResultadoAnalise);

            var resultadoSaida = saidaResultadoAnalise.saida();
            console.log(resultadoSaida);

            saidaProPanel = resultadoSaida.replace("\n", "<br />")

            $("#wordsDistancesTbl").append("<div id='TextoCSV'>")
            $("#TextoCSV").append(saidaProPanel)
 // ---------------------------------------------------------------------------------------------------------------           
            // FORMATA OD DADOS DOS ARRAYS CABECALHO E RESPOSTAS PARA O FORMATO DE SAIDA --------------------------
            // Avalia o primeiro indice do Array (cada aluno?)
            // var firstIndexSize = arrayWordsToCompare.length; // Tamanho do Array
            // var resultadoArray = Array(); // Gaurda todos os valores do resultado que sera retornado
            // var nomeAluno = "";
            // var palavraModeloAtual = ""; // Palavra modelo que esta sendo analisada dentro do laco
            // var distanciaCalculada; // A distancia Damerau-Levenshtein entre as duas strings

            // respostasDados.forEach(function(respostaAluno, indexCount){
                
            //     resultadoArray[indexCount] = Array();
                
            //     respostaAluno.forEach(function(palavraResp, indexCount2){
                    
            //         if(indexCount2 == 0){
            //             var nomeAluno = palavraResp;
            //             resultadoArray[indexCount][0] = nomeAluno;
            //         } else{

            //             palavraModeloAtual = cabecalhoDados[indexCount2];

            //             resultadoArray[indexCount][palavraModeloAtual] = Array();
            //             resultadoArray[indexCount][palavraModeloAtual].push(palavraModeloAtual);
            //             resultadoArray[indexCount][palavraModeloAtual].push(palavraResp);
            //                 // Faz o tipo de analise solicitado pelo usuario 
            //                 if(tipoAnalise == "comRepOp"){
            //                     distanciaCalculada = distance(palavraModeloAtual, palavraResp)
            //                 } else if(tipoAnalise == "semRepOp"){
            //                     distanciaCalculada = damerauLevenshteinDistance(palavraModeloAtual, palavraResp); 
            //                 }
            //             resultadoArray[indexCount][palavraModeloAtual].push(distanciaCalculada);                         

                    // -----------------------------------------------------------------------------------
                    // CRIACAO DOS OUTPUTS ---------------------------------------------------------

                    // $("#wordsDistancesTbl").append("<table id='tabelaHTML'>")
                    // $("#tabelaHTML").append("<tr>")
                    // $("#tabelaHTML tr:last").append("<td>" + nomeAluno +"</td>")                    
                    // $("#tabelaHTML tr:last").append("<td>" + palavraModeloAtual +"</td>")
                    // $("#tabelaHTML tr:last").append("<td>" + palavraResp +"</td>")
                    // $("#tabelaHTML tr:last").append("<td>" + distanciaCalculada +"</td>")

                    // CSV --   --   --   --   --   --   --   --   --   --   --   --   --   --   --   --
                    // $("#wordsDistancesTbl").append("<div id='TextoCSV'>")
                    // $("#TextoCSV").append(resultadoArray[indexCount][0] + ";")  // Nome do aluno
                    // // $("#TextoCSV").append(nomeAluno +";")                    
                    // $("#TextoCSV").append(palavraModeloAtual +";")
                    // $("#TextoCSV").append(palavraResp +";")
                    // $("#TextoCSV").append(distanciaCalculada +"<br />")
                    // -----------------------------------------------------------------------------------

            //         } // FIM - else{}

            //     }); // END - respostaAluno.forEach() 
            // }); // END - respostasDados.forEach() 


            // for (i = 1; i < firstIndexSize; i++){

            //     if(i == 1){
            //         $("#wordsDistancesTbl").append("<table id=''>")
            //     }
            //     $("table").append("<tr>")
                

            //     if(arrayWordsToCompare[i][0]){
            //         $("#wordsDistances").append("<b>" + arrayWordsToCompare[i][0] + "</b><br/>");
            //     }
                
                
            //     // --  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  --
            //     // Avalia o segundo indice do Array (cada palavra do aluno?)
            //     var secondIndexSize = arrayWordsToCompare.length;

            //     for (j = 1; j <= secondIndexSize; j++){
            //         $("#wordsDistances").append("<span id=item"+i+"> - " + arrayWordsToCompare[0][j]);
            //         $("#wordsDistances").append(" <==> " + arrayWordsToCompare[i][j] + "</span>");

            //         $("#wordsDistances").append(" :: " +  distance(arrayWordsToCompare[0][j], arrayWordsToCompare[i][j]) + "</span><br/>");

            //         //CRIA TABELA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //         if(j == 1){
            //             $("table tr:last").append("<td>" + arrayWordsToCompare[i][0] +"</td>")
            //         }
            //         $("table tr:last").append("<td>" + arrayWordsToCompare[0][j] +"</td>")
            //         $("table tr:last").append("<td>" + arrayWordsToCompare[i][j] +"</td>")
            //         $("table tr:last").append("<td>" + distance(arrayWordsToCompare[0][j], arrayWordsToCompare[i][j]) +"</td>")
                    
            //         //CRIA CSV - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //         $("#resultCSV").append(arrayWordsToCompare[i][0] +";")
            //         $("#resultCSV").append(arrayWordsToCompare[0][j] +";")
            //         $("#resultCSV").append(arrayWordsToCompare[i][j] +";")
            //         $("#resultCSV").append(distance(arrayWordsToCompare[0][j], arrayWordsToCompare[i][j]) +";<br />")               
            //     } // END - for (j = 1; j <= 21; j++){ // Avalia segundo indice do Array
            //     // --  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  --

            // } // END - for (i = 1; i <= 21; i++) // Avalia cada primeiro indice do Array

            // // Prepara a opcao de retorno Tabela HTML 
            // var WordDistanceCSV = $("#resultCSV").html(); // Joga todo o texto em HTML da tabela para uma varriavel           

            // // Prepara a opcao de retorno Tabela HTML 
            // var WordDistanceJSON = $("#resultDadosJSON").text(); // Joga todo o texto em HTML da tabela para uma varriavel

            // // Prepara a opcao de retorno Tabela HTML 
            // var WordDistanceTextList = $("#wordsDistances").html(); // Joga todo o texto em HTML da tabela para uma varriavel  
            // $("#wordsDistances").empty(); // Apaga a tabela montana em um span/div ou outro elemento da pagina
            // $("#wordsDistancesTbltTextarea").html(WordDistanceTextList); //Envia a tabela HTML para uma caixa d etexto na pagina

            // // Prepara a opcao de retorno Tabela HTML 
            // var WordDistanceHTML = $("#wordsDistancesTbl").html(); // Joga todo o texto em HTML da tabela para uma varriavel  
            // $("#wordsDistancesTbl").empty(); // Apaga a tabela montana em um span/div ou outro elemento da pagina
            // $("#resultHTMLTabela").html(WordDistanceHTML); //Envia a tabela HTML para uma caixa d etexto na pagina

            // Esconde o textarea com os resultados
            // $("#resultadosTextareas").hide();


            // // Prepara o tipo de saido para o panel
            // var saidaProPanel = "<h3>RESULTADO</h3>"
            // switch(outputType) {
            //     case "htmlTable":
            //         saidaProPanel = WordDistanceHTML;
            //         break;
            //     case "textList":
            //         saidaProPanel = WordDistanceTextList;
            //         break;
            //     case "json":
            //         saidaProPanel = WordDistanceJSON;
            //         break;
            //     case "csv":
            //         saidaProPanel = WordDistanceCSV;
            //         break;
            //     default:
            //         saidaProPanel;
            // }




            // Panel que exibe o resulto no formato escolhido (Usa um plugin Jquery chamdo jspanel - jspanel.de)
            $.jsPanel({
                position:    {my: "center-top", at: "center-top", offsetY: 15},
                theme:       "rebeccapurple",
                contentOverflow: 'scroll',
                contentSize: {width: 600, height: 350, overflow: 'scroll'},
                headerTitle: "RESULTADO",
                resize:      true,
                content:     saidaProPanel,
                callback:    function () {
                    this.content.css("padding", "15px");
                }
            });  // END - $.jsPanel()          

        }); // END - $("#resultDados").load()

    }); // END - $("#btnLoadJSON").click(function(){


// -------------------------------



}//]]> 
