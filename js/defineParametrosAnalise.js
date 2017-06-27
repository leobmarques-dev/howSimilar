function DefineParametrosAnalise(cabecalho, respostaDados, tipoAnalise, formaSaida = "csv"){

	var resultDistancias = Array();
	
	$.each(respostaDados, function(chave, valorAtual){

		resultDistancias[chave] = Array();

		$.each(valorAtual, function(chave2, valorCampo){
			if(tipoAnalise == "comRepOp"){
				resultDistancias[chave].push(distance(cabecalho[chave2], respostaDados[chave][chave2]));
				// resultDistancias[chave].push(cabecalho[chave2] +"<==>"+ respostaDados[chave][chave2]); // Conrfimacao de que sao as mesmas palavras sendo analisadas
			} else if (tipoAnalise == "semRepOp") {
				resultDistancias[chave].push(damerauLevenshteinDistance(cabecalho[chave2], respostaDados[chave][chave2]));
				// resultDistancias[chave].push(cabecalho[chave2] +"<==>"+ respostaDados[chave][chave2]);  // Conrfimacao de que sao as mesmas palavras sendo analisadas
			}
		});

	});

	console.log("DefineParametrosAnalise() | Distancias entre as palavras: ", resultDistancias);

	return resultDistancias;	
}