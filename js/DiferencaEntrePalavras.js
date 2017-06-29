function DiferencaEntrePalavras(cabecalho, respostaDados, tipoAnaliseParam, formaDadoResposta){

	var resultDistancias = Array(); // Array que recebera todas as distancias (Os indices dos valores deve bater com os das respostas e dos cabecalhos)
	var numRespondentes = respostaDados.length; // Numero de respondentes (usuario, alunos, etc)
	var tamRespostaInd = respostaDados[1].length; // Numero de respostas de cada respondente (palavras)
	var tamCabecalho = cabecalho.length;
	var cabecalhoArray = Array(); // Converte o cabecalho em array caso nao seja
	console.log("Tamanho do Array de Resposta Individual: ",tamRespostaInd);
	console.log("Numero de Respostas: ",numRespondentes);
	console.log("Tamanho Cabecalho: ",tamCabecalho);
	

	switch(formaDadoResposta){
		case "recorrente":
			console.log(" - - - - - TIPO ANALISE: ",formaDadoResposta);
			for (var i = 0; i < numRespondentes; i++ ) {

				resultDistancias[i] = Array(); // Cria sub Array para receber os resultados do respondente

				for (var j = 0; j < tamRespostaInd; j++ ) {

					resultDistancias[i][j] = distance(cabecalho[i], respostaDados[i][j]);
					console.log(cabecalho[i] +"<==>"+ respostaDados[i][j] +" = "+ resultDistancias[i][j]); // Confirmacao de que sao as mesmas palavras sendo analisadas

				} // END - for (var j = 0; j< numRespondentes; j++ )

			} // END - for (var i = 0; i< numRespondentes; i++ )
			console.log("DefineParametrosAnalise() | Cabecalho Tratado: ", cabecalho);
		break;


		case "unico":
			console.log(" - - - - - TIPO ANALISE: ",formaDadoResposta);

			for (var i = 0; i < numRespondentes; i++ ) {

				resultDistancias[i] = Array(); // Cria sub Array para receber os resultados do respondente

				for (var j = 0; j < tamRespostaInd ; j++ ) {

					resultDistancias[i][j] = distance(cabecalho[j], respostaDados[i][j]);
					console.log(cabecalho[j] +"<==>"+ respostaDados[i][j] +" = "+ resultDistancias[i][j]); // Confirmacao de que sao as mesmas palavras sendo analisadas

				} // END - for (var j = 0; j< numRespondentes; j++ )

			} // END - for (var i = 0; i< numRespondentes; i++ )
			console.log("DefineParametrosAnalise() | Cabecalho Tratado: ", cabecalho);
		break;		

	} // END - switch(formaDadoResposta)

	console.log("DefineParametrosAnalise() | Respostas : ", respostaDados);
	console.log("DefineParametrosAnalise() | Distancias entre as palavras: ", resultDistancias);

	return resultDistancias;	
}