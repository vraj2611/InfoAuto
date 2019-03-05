import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFipeService {

  api_url = 'http://fipeapi.appspot.com/api/1/carros';

  constructor(public http: Http) { }

  getFabricantes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api_url}/marcas.json`)
        .subscribe(
          (data: any) => { resolve(JSON.parse(data._body)); },
          (error) => { reject(error); }
        );
    });
  }

  getModelosPorFabricante(id_fabricante){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api_url}/veiculos/${id_fabricante}.json`)
        .subscribe(
          (data: any) => { resolve(JSON.parse(data._body)); },
          (error) => { reject(error); }
        );
    });
  }

  getModelosAnosPorModelo(id_fabricante, id_modelo){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api_url}/veiculo/${id_fabricante}/${id_modelo}.json`)
        .subscribe(
          (data: any) => { resolve(JSON.parse(data._body)); },
          (error) => { reject(error); }
        );
    });
  }

  getValorPorModeloAno(id_fabricante, id_modelo, id_ano){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api_url}/veiculo/${id_fabricante}/${id_modelo}/${id_ano}.json`)
        .subscribe(
          (data: any) => { resolve(JSON.parse(data._body)); },
          (error) => { reject(error); }
        );
    });
  }

  getValorPorCodigoFIPE(id_fabricante, codigoFIPE){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.api_url}/veiculo/${id_fabricante}/${codigoFIPE}.json`)
        .subscribe(
          (data: any) => { resolve(JSON.parse(data._body)); },
          (error) => { reject(error); }
        );
    });
  }


}
