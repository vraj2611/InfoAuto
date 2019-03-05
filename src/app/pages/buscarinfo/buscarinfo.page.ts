import { Component, OnInit, Input } from '@angular/core';
import { ApiFipeService } from 'src/app/services/api-fipe.service';
import { ApiSinespService } from 'src/app/services/api-sinesp.service';
import { Veiculo } from 'src/app/models/veiculo';

@Component({
  selector: 'app-buscarinfo',
  templateUrl: './buscarinfo.page.html',
  styleUrls: ['./buscarinfo.page.scss'],
  providers: [ApiFipeService, ApiSinespService]
})
export class BuscarinfoPage implements OnInit {

  public lista_fabricantes: any;
  public lista_modelos: any;
  public lista_modeloanos: any;
  public veiculo: Veiculo;
  
  public buscar_placa: String;
  public buscar_fabricante: String;
  public buscar_modelo: String;
  public buscar_ano: String;
  public info_sinesp: String;

  constructor(
    public api_fipe: ApiFipeService,
    public api_sinesp: ApiSinespService) {
    this.lista_fabricantes = [];
    this.lista_modelos = [];
    this.lista_modeloanos = [];
    this.listarFabricantes();
    this.info_sinesp = 'Informe uma placa para buscar';

  }

  ngOnInit() { }

  testar(){
    alert(this.buscar_fabricante);
  }

  tratarPlaca(){
    this.buscar_placa = this.buscar_placa.toUpperCase();
    if (this.buscar_placa.length == 7) this.buscarModeloPorPlaca();
    if (this.buscar_placa.length < 7) this.info_sinesp = 'Informe uma placa para buscar';
  }

  async filtrarVersoesDoVeiculo(veiculo: Veiculo) {

    let fabr = this.selecionarFabricanteporNome(veiculo.fabricante);
    let versoes_fabr: any = await this.api_fipe.getModelosPorFabricante(fabr.id);
    let versoes_modelo: any = versoes_fabr.filter((versao) => {
      let teste_modelo: boolean;
      teste_modelo = versao['name'].toLowerCase().indexOf(veiculo.modelo.toLowerCase()) > -1;
      return teste_modelo;
    });
    return versoes_modelo;
  }

  async buscarModeloPorPlaca() {
    this.buscar_placa = this.buscar_placa.toUpperCase();
    let veiculo: Veiculo;
    try {
      this.info_sinesp = 'Buscando informação...';
      veiculo = await this.api_sinesp.consultarPlaca(this.buscar_placa);
      this.info_sinesp = `${veiculo.fabricante} ${veiculo.versao} ${veiculo.ano_mod} ${veiculo.cor}`.toUpperCase();
      this.lista_modelos = await this.filtrarVersoesDoVeiculo(veiculo);
      this.lista_modeloanos = [{id: veiculo.ano_mod, name: veiculo.ano_mod}];
    } catch (error) {
      this.info_sinesp = error;
    }
  }

  selecionarFabricanteporNome(nome) {
    for (const fabr of this.lista_fabricantes) {
      if (fabr['name'] == nome) {
        return { id: fabr['id'], nome: fabr['fipe_name'] };
      }
    }
    return null;
  }

  async listarFabricantes() {
    if (this.lista_fabricantes.length < 1) {
      this.lista_fabricantes = await this.api_fipe.getFabricantes();
    }
    if (this.lista_fabricantes.length < 1) alert('Nenhum Fabricante disponível');
  }


}
