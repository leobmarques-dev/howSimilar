function DiferencaEntrePalavras (cabecalho, respostas, diferencas, tipoSaida = "csv"){
	this.cabecalho = cabecalho;
	this.respostas = respostas;
	this.diferencas = diferencas;

	this.saida = function(cabecalho, respostas, diferencas, tipoSaida){

		var saidaResult = "AINDA NADA";

        switch(tipoSaida) {
            case "htmlTable":
                saidaResult = WordDistanceHTML;
                break;
            case "textList":
                saidaResult = WordDistanceTextList;
                break;
            case "json":
                saidaResult = WordDistanceJSON;
                break;
            case "csv":
                
                respostas.forEach(function(valorResp, index){

                	valorResp.forEach(function(valorCampo, index2){
                		console.log("["+index+"]["+index2+"] = "+ valorCampo)
                	})

                });	

                break;
            default:
                saidaResult;
        }

		return saidaResult	
	}
}