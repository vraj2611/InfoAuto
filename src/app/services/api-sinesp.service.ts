import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class ApiSinespService {

  api_url = 'http://vilmarrangel-com-br.umbler.net';

  constructor(public http : Http) {}

  private consultarAPI(placa:String){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api_url}/placa?p=${placa}`)
        .subscribe(
          (data: any) => { resolve(JSON.parse(data._body)); },
          (error) => { reject(error); }
        );
    });
  }

  async consultarPlaca(placa:String){
    let result = await this.consultarAPI(placa);
    if( result['codigoRetorno'] != 0){
      throw new Error(result['mensagemRetorno']);
    }
    let div = result['modelo'].indexOf('/');
    let fabricante = result['modelo'].substr(0,div);
    let modelo = result['modelo'].substr(div+1,result['modelo'].indexOf(' ')-div)
    let versao = result['modelo'].substr(div+1,99);
    return new Veiculo(
      placa.toLocaleUpperCase(),
      fabricante,
      modelo,
      versao,
      result['ano'],
      result['anoModelo'],
      'N/A',
      result['cor'],
      result['situacao'],
      0,
      result['modelo']
    );
        /*{
      "codigoRetorno":"0",
      "mensagemRetorno":"Sem erros.",
      "codigoSituacao":"0",
      "situacao":"Sem restrição",
      "modelo":"FORD/FIESTA 1.6 FLEX",
      "marca":"FORD/FIESTA 1.6 FLEX",
      "cor":"Branca",
      "ano":"2013",
      "anoModelo":"2014",
      "placa":"LUT4034",
      "data":"04/03/2019 às 14:43:35",
      "uf":"RJ",
      "municipio":"CAMPOS DOS GOYTACAZES",
      "chassi":"70043",
      "dataAtualizacaoCaracteristicasVeiculo":"22/02/2019",
      "dataAtualizacaoRouboFurto":"03/03/2019",
      "dataAtualizacaoAlarme":"03/03/2019"
    */
  }

}
