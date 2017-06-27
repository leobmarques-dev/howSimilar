function DiferencaEntrePalavras (cabecalho, respostas, diferencas, tipoSaida = "csv"){
	this.cabecalho = cabecalho;
	this.respostas = respostas;
	this.diferencas = diferencas;
	
	this.msg = function(){
		return "FUNCIONOU!!!!!!!!!";
	}

	this.saida = function(){

		var saidaResult;

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
                	// console.log(valorResp);

                	valorResp.forEach(function(valorCampo, index2){

                		saidaResult +=  valorResp[0] +";"+cabecalho[index2]+";"+valorCampo+";"+diferencas[index][index2]+"\n";
                		// console.log("["+index+"]["+index2+"] = "+valorResp[0] +";"+cabecalho[index2]+";"+valorCampo+";"+diferencas[index][index2]+"\n");

                		// console.log("DiferencaEntrePalavras() | ["+index+"]["+index2+"] = ", valorCampo)
                	})

                });	

                break;
            default:
                saidaResult;
        } // END - this.saida = function()

		return saidaResult	
	}
}