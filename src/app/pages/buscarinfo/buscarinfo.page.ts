import { Component, OnInit } from '@angular/core';
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

  public isPlacaOk: boolean;
  public buscar_placa: String;
  public buscar_fabricante: any;
  public buscar_modelo: any;
  public buscar_ano: any;
  public info_sinesp: String;
  public valor_fipe: String;
  public descricao_fipe: String;
  public codigo_fipe: String;

  constructor(
    public api_fipe: ApiFipeService,
    public api_sinesp: ApiSinespService
  ) {
    this.lista_fabricantes = [];
    this.lista_modelos = [];
    this.lista_modeloanos = [];
    this.listarFabricantes();
    this.buscar_placa = '';
    this.isPlacaOk = false;
    this.buscar_ano = {};
    this.info_sinesp = '';
    this.valor_fipe = '--';
    this.descricao_fipe = 'Valor FIPE';
  }

  ngOnInit() { }

  async listarFabricantes() {
    this.lista_fabricantes = await this.api_fipe.getFabricantes();
  }

  async posFabricanteSelecionado() {
    if (!this.isPlacaOk) {
      this.lista_modelos = await this.api_fipe.getModelosPorFabricante(this.buscar_fabricante);
    }
  }

  async posModeloSelecionado() {
    if (!this.isPlacaOk) {
      this.lista_modeloanos = await this.api_fipe.getModelosAnosPorModelo(this.buscar_fabricante, this.buscar_modelo);
    } else {
      for (let modano of this.lista_modelos) {
        if ( this.buscar_modelo == modano['id']){
          this.descricao_fipe = `Valor FIPE (código: ${modano['id']}`;
          this.valor_fipe = modano['preco'];
        } 
      }
    }
  }

  async posAnoSelecionado() {
    if (!this.isPlacaOk) {
      let result = await this.api_fipe.getValorPorModeloAno(this.buscar_fabricante, this.buscar_modelo, this.buscar_ano);
      this.codigo_fipe = result['fipe_codigo'];
      this.valor_fipe = result['preco'];
      this.descricao_fipe = `Valor FIPE (código: ${this.codigo_fipe})`;
    }
  }

  tratarPlaca() {
    this.buscar_placa = this.buscar_placa.toUpperCase();
    if (this.buscar_placa.length == 7) {
      this.isPlacaOk = true;
      this.buscarModeloPorPlaca();
    } else if (this.buscar_placa.length < 7) {
      this.isPlacaOk = false;
    }
  }

  async buscarModeloPorPlaca() {
    let veiculo: Veiculo;
    try {
      this.info_sinesp = 'Buscando informação...';
      this.buscar_fabricante = { nome: 'Carregando...' };
      veiculo = await this.api_sinesp.consultarPlaca(this.buscar_placa);
      this.info_sinesp = `${veiculo.fabricante} ${veiculo.versao} ${veiculo.ano_mod} ${veiculo.cor}`.toUpperCase();
      this.buscar_fabricante = this.selecionarFabricanteporNome(veiculo.fabricante);
      this.buscar_ano = { id: `${veiculo.ano_mod}-1`, nome: veiculo.ano_mod };
      this.lista_modelos = await this.filtrarVersoesDoVeiculo(veiculo);
    } catch (error) {
      this.info_sinesp = error;
      this.buscar_fabricante = {};
      this.buscar_ano = {};
    }
  }

  selecionarFabricanteporNome(nome) {
    for (let fabr of this.lista_fabricantes) {
      if (fabr['name'] == nome) {
        return { id: fabr['id'], nome: fabr['fipe_name'] };
      }
    }
    return null;
  }

  async filtrarVersoesDoVeiculo(veiculo: Veiculo) {
    let versoes_fabr: any = await this.api_fipe.getModelosPorFabricante(this.buscar_fabricante['id']);
    let versoes_modelo: any = versoes_fabr.filter((versao) => {
      let teste_modelo: boolean;
      teste_modelo = versao['name'].toLowerCase().indexOf(veiculo.modelo.toLowerCase()) > -1;
      return teste_modelo;
    });
    let versoes_modeloano = [];
    versoes_modelo.forEach(async (mod) => {
      let mod_anos: any = await this.api_fipe.getModelosAnosPorModelo(this.buscar_fabricante['id'], mod['id']);
      mod_anos.forEach(async (modano) => {
        if (modano['id'] == this.buscar_ano['id']) {
          let result = await this.api_fipe.getValorPorModeloAno(this.buscar_fabricante['id'], mod['id'], modano['id']);
          modano.id = result['fipe_codigo'];
          modano.name = modano['veiculo'];
          modano.preco = result['preco'];
          versoes_modeloano.push(modano);
        }
      });
    });
    return versoes_modeloano;
  }



}
