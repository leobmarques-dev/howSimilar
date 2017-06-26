//<![CDATA[
window.onload=function(){

    console.log('vamos ver...')

	$("#btnCompare").click(function(){
		var word1 = $("#word1").val();
		var word2 = $("#word2").val();
		$("#msgs").html("Diferenca entre: " + word1 + " <==> " + word2 + " = " +distance(word1, word2));
	});
	

    $("#btnLoadJSON").click(function(){
        $("#resultDados").load("./data/UFAL_CEDU-TCC_JulianaNeves2017-PreTeste.json", function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                alert("External content loaded successfully!");
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);

            var objWordsToCompare = JSON.parse(responseTxt) // Tranforma em Objeto o texto no formato JSON
            console.log(objWordsToCompare.data);

            
            // Avalia o primeiro indice do Array (cada aluno?)
            for (i = 1; i <= 21; i++){

                if(i == 1){
                    $("#wordsDistancesTbl").append("<table id=''>")
                }
                $("table").append("<tr>")
                

                $("#wordsDistances").append("<b>" + objWordsToCompare.data[i][0] + "</b><br/>");
                
                // Avalia o segundo indice do Array (cada palavra do aluno?)
                for (j = 1; j <= 21; j++){
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
                } // END - for (j = 1; j <= 21; j++){ // Avalia segundo indice do Array

            } // END - for (i = 1; i <= 21; i++) // Avalia cada primeiro indice do Array

            var WordDistanceHTML = $("wordsDistancesTbl").html();

        }); // END - $("#resultDados").load()
    }); // END - $("#btnLoadJSON").click(function(){


// -------------------------------



}//]]> 
