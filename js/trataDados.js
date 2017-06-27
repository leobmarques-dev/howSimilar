function TrataJSONtoArray (json, dataSource){
	// dEPENDE DO jQUERY, POIS USA A FUNCAO $.each

console.log("_________________________________")
console.log("trataJSONtoArray() | Objeto JSON (raw): ", json)

// VARIAVEIS BASICAS
	var cabecalhosArray = Array();
	var valoresArray = Array();

	// CORRE POR CADA ELMENTO DO ARRAY PAI CONTIDO NO JSON (DADO BASE) [TEM QUE SER ser um array!!]
	$.each(json, function(chave, valorAtual){

		valoresArray[chave] = Array();

		// Tratamento para quando os filhos do Array principal (json) ja sao arrays tambem
		if($.isArray(valorAtual)){
			
			// Corre os valores dentro do Array contido na intancia do Array pai
			$.each(valorAtual, function(chave2, valorCampo){
                if(chave == 0){
                    cabecalhosArray.push(valorCampo);
                } else {
                    valoresArray[chave].push(valorCampo);
                    // console.log("trataJSONtoArray() | ["+chave+"]["+chave2+"]: ", valorCampo);
                }
            });	

		} // end - if($.isArray(valorAtual))

		// Tratamento para quando os filhos do Array principal (json) NAO sao arrays (Provavelmente objetos)
		else {

				// CORRE POR CADA ELMENTO DO ARRAY PAI CONTIDO NO JSON (DADO BASE) [TEM QUE SER ser um array!!]
				$.each(json, function(chave, valorAtual){

					valoresArray[chave] = Array();
					cabecalhosArray[chave] = Array();

					// Segundo laco, corre por cada tentativa (sonda) dentro da palavra atual do primeiro laco (Formato, Objeto)                      
		            for ( var key in valorAtual){

		                if(valorAtual.hasOwnProperty(key)){
		                    // Separa a oalavra modelo como indice 0 do Array, para aquela palavra
		                    if(key == "Modelo"){
		                        cabecalhosArray[chave].push(valorAtual.Modelo);
		                    } else{
		                        valoresArray[chave].push(valorAtual[key])
		                        // console.log("trataJSONtoArray() | ["+chave+"]["+key+"]: ", valorAtual[key]);
		                    }

		                } // END - if(palavraModeloAtual.hasOwnProperty(key))

		            } // END - for ( var key in palavraModeloAtual)					

				});// END - $.each(json, function(chave, valorAtual)

		} // END - else{}

	}); // END - $.each(json, function(chave, valorAtual)

	return [cabecalhosArray, valoresArray];

} // END function 