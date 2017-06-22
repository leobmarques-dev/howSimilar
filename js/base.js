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

            
            // Avalia cada aluno (primeiro indice do Array)
            for (i = 1; i <= 21; i++){

                if(i == 1){
                    $("#wordsDistancesTbl").append("<table>")
                }
                $("table").append("<tr>")
                

                $("#wordsDistances").append("<b>" + objWordsToCompare.data[i][0] + "</b><br/>");
                
                // Avalia cada palavra do aluno (segundo indice do Array)
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
                }

            }
        }); // END - $("#resultDados").load()
    }); // END - $("#btnLoadJSON").click(function(){


// -------------------------------



function distance(source, target) {

/**
 * Calculates the Damerau-Levenshtein distance between two strings.
 * Source: https://gist.github.com/IceCreamYou/8396172
 */

    if (!source) return target ? target.length : 0;
    else if (!target) return source.length;

    var m = source.length, n = target.length, INF = m+n, score = new Array(m+2), sd = {};
    for (var i = 0; i < m+2; i++) score[i] = new Array(n+2);
    score[0][0] = INF;
    for (var i = 0; i <= m; i++) {
        score[i+1][1] = i;
        score[i+1][0] = INF;
        sd[source[i]] = 0;
    }
    for (var j = 0; j <= n; j++) {
        score[1][j+1] = j;
        score[0][j+1] = INF;
        sd[target[j]] = 0;
    }

    for (var i = 1; i <= m; i++) {
        var DB = 0;
        for (var j = 1; j <= n; j++) {
            var i1 = sd[target[j-1]],
                j1 = DB;
            if (source[i-1] === target[j-1]) {
                score[i+1][j+1] = score[i][j];
                DB = j;
            }
            else {
                score[i+1][j+1] = Math.min(score[i][j], Math.min(score[i+1][j], score[i][j+1])) + 1;
            }
            score[i+1][j+1] = Math.min(score[i+1][j+1], score[i1] ? score[i1][j1] + (i-i1-1) + 1 + (j-j1-1) : Infinity);
        }
        sd[source[i-1]] = i;
    }
    return score[m+1][n+1];

    console.log(source + ' <==> ' + target, score)
}

}//]]> 
