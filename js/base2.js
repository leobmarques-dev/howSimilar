//<![CDATA[
window.onload=function(){

    console.log('vamos ver...')

	$("#btnCompare").click(function(){
		var word1 = $("#word1").val();
		var word2 = $("#word2").val();
		$("#msgs").html("Diferenca entre: " + word1 + " <==> " + word2 + " = " +distance(word1, word2));
	});
	

    $("#btnLoadJSON").click(function(){
        $("#resultDadosJSON").load("./data/UFAL_CEDU-TCC_JulianaNeves2017-PreTeste.json", function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                alert("External content loaded successfully!");
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);

            var objWordsToCompare = JSON.parse(responseTxt) // Tranforma em Objeto o texto no formato JSON
            console.log(objWordsToCompare.data);

            // Avalida tipo de retorno (return)
            var outputType = $("#outputType  option:selected").val();
            
            // Avalia o primeiro indice do Array (cada aluno?)
            var firstIndexSize = objWordsToCompare.data.length; // Tamanho do Array
            for (i = 1; i < firstIndexSize; i++){

                if(i == 1){
                    $("#wordsDistancesTbl").append("<table id=''>")
                }
                $("table").append("<tr>")
                

                if(objWordsToCompare.data[i][0]){
                    $("#wordsDistances").append("<b>" + objWordsToCompare.data[i][0] + "</b><br/>");
                }
                
                
                // --  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  --
                // Avalia o segundo indice do Array (cada palavra do aluno?)
                var secondIndexSize = objWordsToCompare.data.length;
                for (j = 1; j <= secondIndexSize; j++){
                    $("#wordsDistances").append("<span id=item"+i+"> - " + objWordsToCompare.data[0][j]);
                    $("#wordsDistances").append(" <==> " + objWordsToCompare.data[i][j] + "</span>");

                    $("#wordsDistances").append(" :: " +  distance(objWordsToCompare.data[0][j], objWordsToCompare.data[i][j]) + "</span><br/>");

                    //CRIA TABELA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    if(j == 1){
                        $("table tr:last").append("<td>" + objWordsToCompare.data[i][0] +"</td>")
                    }
                    $("table tr:last").append("<td>" + objWordsToCompare.data[0][j] +"</td>")
                    $("table tr:last").append("<td>" + objWordsToCompare.data[i][j] +"</td>")
                    $("table tr:last").append("<td>" + distance(objWordsToCompare.data[0][j], objWordsToCompare.data[i][j]) +"</td>")
                    
                    //CRIA CSV - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    $("#resultCSV").append(objWordsToCompare.data[i][0] +";")
                    $("#resultCSV").append(objWordsToCompare.data[0][j] +";")
                    $("#resultCSV").append(objWordsToCompare.data[i][j] +";")
                    $("#resultCSV").append(distance(objWordsToCompare.data[0][j], objWordsToCompare.data[i][j]) +";<br />")               
                } // END - for (j = 1; j <= 21; j++){ // Avalia segundo indice do Array
                // --  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  ----  --  --  --  --  --  --

            } // END - for (i = 1; i <= 21; i++) // Avalia cada primeiro indice do Array

            // Prepara a opcao de retorno Tabela HTML 
            var WordDistanceCSV = $("#resultCSV").html(); // Joga todo o texto em HTML da tabela para uma varriavel           

            // Prepara a opcao de retorno Tabela HTML 
            var WordDistanceJSON = $("#resultDadosJSON").text(); // Joga todo o texto em HTML da tabela para uma varriavel

            // Prepara a opcao de retorno Tabela HTML 
            var WordDistanceTextList = $("#wordsDistances").html(); // Joga todo o texto em HTML da tabela para uma varriavel  
            $("#wordsDistances").empty(); // Apaga a tabela montana em um span/div ou outro elemento da pagina
            $("#wordsDistancesTbltTextarea").html(WordDistanceTextList); //Envia a tabela HTML para uma caixa d etexto na pagina

            // Prepara a opcao de retorno Tabela HTML 
            var WordDistanceHTML = $("#wordsDistancesTbl").html(); // Joga todo o texto em HTML da tabela para uma varriavel  
            $("#wordsDistancesTbl").empty(); // Apaga a tabela montana em um span/div ou outro elemento da pagina
            $("#resultHTMLTabela").html(WordDistanceHTML); //Envia a tabela HTML para uma caixa d etexto na pagina

            // Esconde o textarea com os resultados
            $("#resultadosTextareas").hide();


            // Prepara o tipo de saido para o panel
            var saidaProPanel = "<h3>RESULTADO</h3>"
            switch(outputType) {
                case "htmlTable":
                    saidaProPanel = WordDistanceHTML;
                    break;
                case "textList":
                    saidaProPanel = WordDistanceTextList;
                    break;
                case "json":
                    saidaProPanel = WordDistanceJSON;
                    break;
                case "csv":
                    saidaProPanel = WordDistanceCSV;
                    break;
                default:
                    saidaProPanel;
            }




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
