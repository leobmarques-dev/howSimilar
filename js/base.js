//<![CDATA[
window.onload=function(){

    console.log('JS Base Carregado...')

// ======================================================================================================
    // Prepara Layout basico da pagina
    $("#compare2Words").hide();
    $("#compare2WordsBox").click(function(){
        $("#compare2Words").show();
    });

    $("#btnCompare").click(function(){
        var word1 = $("#word1").val();
        var word2 = $("#word2").val();
        $("#msgs").html("Diferenca entre: " + word1 + " <==> " + word2 + " = " +distance(word1, word2));
    });
// ======================================================================================================
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
                console.log("External content loaded successfully!");
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);

            var arrayWordsToCompare = JSON.parse(responseTxt) // Tranforma em Objeto o texto no formato JSON
// -----------------------------------------------------------------------------------------------------------
                
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
                // | Indica como sera feito o laco de analise das respostas
                // Opcoes: unico = Cada valor de um array da resposta e unico
                //         recorrente = Cada valor de um array da resposta e uma recorrencia de um mesmo valor
                var dadoResposta = "unico"; // (defautlt) 
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

                switch(JSONdataSource){

                    // Caso o JSON dos dados seja de todos os alunos (linha == aluno & coluna == palavra)
                    case "preTeste_todosAlunos":
                        dadoResposta = "unico";
                    break;

                    // Caso o JSON dos dados seja de um aluno especifico (linha == palvra & coluna == sonda )
                    case "sondas_aluno-A":
                        dadoResposta = "recorrente";
                    break;

                } // END - switch(JSONdataSource)
                // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

            var tempVar = TrataJSONtoArray(arrayWordsToCompare, JSONdataSource) // Useu o dadoresposta defualt
            cabecalhoDados = tempVar[0];
            respostasDados = tempVar[1];

            // Recebe a distancia entre a palavra modelo e a resposta de cada valor 
            distEntrePalavras = DiferencaEntrePalavras(cabecalhoDados, respostasDados, tipoAnalise, dadoResposta)

            // Cria objeto que agrega os modelos, as respostas e 
            var saidaResultadoAnalise = new DefineParametrosAnalise(cabecalhoDados, respostasDados, distEntrePalavras, outputType);
            console.log(saidaResultadoAnalise);

            // Gera saida exibbivel do resultado 
            var resultadoSaida = saidaResultadoAnalise.saida();

            var saidaProPanel = resultadoSaida.replace("\n", "<br />")

            $("#wordsDistancesTbl").append("<div id='TextoCSV'>")
            $("#TextoCSV").append(saidaProPanel)
 // ---------------------------------------------------------------------------------------------------------------           
  

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
