function trataJSONtoArray (json, dataSource){

console.log("_________________________________")
// console.log("trataJSONtoArray() Recebeu: ", json);

// VARIAVEIS BASICAS
	var cabecalhosArray = Array();
	var valoresArray = Array();

	// CORRE POR CADA ELMENTO DO JSON (DADO BASE)
	for(var valorAtual of json){

		// Tratamento para quando os filhos do Array principal (json) ja sao arrays tambem
		// console.log(valorAtual);
		if($.isArray(valorAtual)){
			$.each(valorAtual, function(chave, valorCampo){
                        if(chave == 0){
                            cabecalhosArray.push(valorCampo);
                        } else{
                        	valoresArray[chave] = Array();
                            valoresArray[chave].push(valorCampo); 
                        }
                    });			
		} 

		// Tratamento para quando os filhos do Array principal (json) NAO sao arrays (Provavelmente objetos)
		else {
                        // Primeiro laco, corre por cada palavra (Formato Array)
                        objWordsToCompare.forEach(function(palavraModeloAtual, index, arr){

                                // Segundo laco, corre por cada tentativa (sonda) dentro da palavra atual do primeiro laco (Formato, Objeto)                      
                                for ( var key in palavraModeloAtual){
                                    if(palavraModeloAtual.hasOwnProperty(key)){
                                        // Separa a oalavra modelo como indice 0 do Array, para aquela palavra
                                        if(key == "Modelo"){
                                            console.log("Cabecalho Coluna Modelo: ", palavraModeloAtual.Modelo);
                                            palavrasModelo.push(palavraModeloAtual.Modelo);
                                        } else{
                                            respostasAluno[index].push(palavraModeloAtual[key])
                                        }                                    
                                    } // END - if(palavraModeloAtual.hasOwnProperty(key))
                                } // END - for ( var key in palavraModeloAtual)
                                console.log("Objeto das Respostas Convertido em Array: ", palavraModeloAtual);
                        
                    }); // END - objWordsToCompare.forEach()			
		}
	}

	console.log("Retorno trataJSONtoArray(): ", [cabecalhosArray, valoresArray]);
	return [cabecalhosArray, valoresArray];

} // END function 