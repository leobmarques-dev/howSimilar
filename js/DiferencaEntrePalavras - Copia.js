function DiferencaEntrePalavras(cabecalho, respostaDados, tipoAnalise, formaDadoResposta){

	var resultDistancias = Array();
	var tamRespostaInd = respostaDados[1].length;
	console.log("Tamanho do Array de Resposta Individual: ",tamRespostaInd);

	// FIX: trocar os condicionais que definem o tipo de analise no 
	//      laco por uma var com o nome as funcoes de analise embutidas
	if(tipoAnalise == "comRepOp"){
		var tipoAnalise = new funcAnlzDist.func_distance();
	} else if(tipoAnalise == "semRepOp") {
		var tipoAnalise = new funcAnlzDist.func_DLdistance();
	}
	
	console.log(tipoAnalise);
	
	$.each(respostaDados, function(chave, valorAtual){

		resultDistancias[chave] = Array();

		if($.isArray(valorAtual)){

			$.each(valorAtual, function(chave2, valorCampo){

					switch(formaDadoResposta){
						case "unico":

								resultDistancias[chave].push(distance(cabecalho[chave2], valorCampo));
								console.log(cabecalho[chave2] +"<==>"+ valorCampo +" = "+ resultDistancias[chave][chave2]); // Confirmacao de que sao as mesmas palavras sendo analisadas
				
						break;

						case "recorrente":
								var retemModelo = chave2;
								for (var i = 0; i< tamRespostaInd; i++ ) {
								resultDistancias[chave].push(distance(cabecalho[chave2], respostaDados[chave][chave2]));
								console.log(cabecalho[chave2] +"<==>"+ respostaDados[chave][chave2] +" = "+ resultDistancias[chave][chave2]); // Confirmacao de que sao as mesmas palavras sendo analisadas
								}
						break;					
					} // END - switch(formaDadoResposta)

			}); // END - $.each(valorAtual, function(chave2, valorCampo))

		} // END - if($.isArray(valorAtual))		

	}); // END - $.each(respostaDados, function(chave, valorAtual)

	// console.log("DefineParametrosAnalise() | Distancias entre as palavras: ", resultDistancias);

	return resultDistancias;	
}


var funcAnlzDist = {

	func_distance: function (source, target) {

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
	}, // END - distance(source, target)

	func_DLdistance: function (s, t) {
	/**
	 * Determine the Damerau-Levenshtein distance between s and t.
	 * Source: https://github.com/mailcheck/mailcheck/wiki/String-Distance-Algorithms
	 */    
	  // 
	  if (!s || !t) {
	    return 99;
	  }
	  var m = s.length;
	  var n = t.length;      
	  var charDictionary = new Object();
	  
	  /* For all i and j, d[i][j] holds the Damerau-Levenshtein distance
	   * between the first i characters of s and the first j characters of t.
	   * Note that the array has (m+1)x(n+1) values.
	   */
	  var d = new Array();
	  for (var i = 0; i <= m; i++) {
	    d[i] = new Array();
	    d[i][0] = i;
	  }
	  for (var j = 0; j <= n; j++) {
	    d[0][j] = j;
	  }
	  
	  // Populate a dictionary with the alphabet of the two strings
	  for (var i = 0; i < m; i++) {
	    charDictionary[s.charAt(i)] = 0;
	  }
	  for (var j = 0; j < n; j++) {
	    charDictionary[t.charAt(j)] = 0;
	  }
	  
	  // Determine substring distances
	  for (var i = 1; i <= m; i++) {
	    var db = 0;
	    for (var j = 1; j <= n; j++) {
	      var i1 = charDictionary[t.charAt(j-1)];
	      var j1 = db;
	      var cost = 0;
	      
	      if (s.charAt(i-1) == t.charAt(j-1)) { // Subtract one to start at strings' index zero instead of index one
	        db = j;
	      } else {
	        cost = 1;
	      }
	      d[i][j] = Math.min(d[i][j-1] + 1,                 // insertion
	                         Math.min(d[i-1][j] + 1,        // deletion
	                                  d[i-1][j-1] + cost)); // substitution
	      if(i1 > 0 && j1 > 0) {
	        d[i][j] = Math.min(d[i][j], d[i1-1][j1-1] + (i-i1-1) + (j-j1-1) + 1); //transposition
	      }
	    }
	    charDictionary[s.charAt(i-1)] = i;
	  }
	        
	  // Return the strings' distance
	  return d[m][n];
	} // END - damerauLevenshteinDistance(s, t)
};