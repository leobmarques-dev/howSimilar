function DefineParametrosAnalise (cabecalho, respostas, diferencas, tipoSaida = "csv"){
	this.cabecalho = cabecalho;
	this.respostas = respostas;
	this.diferencas = diferencas;

    // Corrige Array da versao JSON que tem "ditado:" como elemento 0
    if(cabecalho.length > diferencas.length){
        cabecalho.splice(0, 1);
    }

	this.msg = function(){
		return "FUNCIONOU!!!!!!!!!";
	}

	this.saida = function(){

		var saidaResult;

        switch(tipoSaida) {
            case "htmlTable":
                saidaResult = "htmlTable";
                break;
            case "textList":
                saidaResult = "textList";
                break;
            case "json":
                saidaResult = "json";
                break;
            case "csv":
                
                $.each(respostas, function(chave, valorAtual){

                    saidaResult += "Registro_"+chave+";"+cabecalho[chave]+";";

                    $.each(valorAtual, function(chave2, valorCampo){

                            saidaResult += valorCampo[chave2]+";";
                            saidaResult += diferencas[chave2]+"\n";

                    }); // END - $.each(valorAtual, function(chave2, valorCampo)

                }); // END - $.each(respostas, function(chave, valorAtual)
                break;
        } // END - this.saida = function()

		return saidaResult	
	}
}