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
  public buscar_fabricante: Number;
  public buscar_modelo: Number;
  public buscar_ano: String;
  public info_sinesp: String;
  public valor_fipe: String;
  public descricao_fipe: String;

  constructor(
    public api_fipe: ApiFipeService,
    public api_sinesp: ApiSinespService) {
    this.lista_fabricantes = [];
    this.lista_modelos = [];
    this.lista_modeloanos = [];
    this.listarFabricantes();
    this.info_sinesp = 'Informe uma placa para buscar';
    this.valor_fipe = '--';
    this.descricao_fipe = 'Valor FIPE';
  }

  ngOnInit() { }

  testar(){
    alert(this.buscar_fabricante + " _ " + this.buscar_modelo);
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

  async filtarModelosPorFabricanteSelecionado(){
    if ( !this.buscar_placa || this.buscar_placa.length == 0){
      this.lista_modelos = await this.api_fipe.getModelosPorFabricante(this.buscar_fabricante);
    }
  }

  async filtarAnoPorModeloSelecionado(){
    this.lista_modeloanos = await this.api_fipe.getModelosAnosPorModelo(this.buscar_fabricante, this.buscar_modelo);
  }

  async buscarValorPorModelo(){
    let result = await this.api_fipe.getValorPorModeloAno(this.buscar_fabricante, this.buscar_modelo, this.buscar_ano);
    this.descricao_fipe = `Valor FIPE (código: ${result['fipe_codigo']})`;
    this.valor_fipe = result['preco'];
  }

  async buscarModeloPorPlaca() {
    this.buscar_placa = this.buscar_placa.toUpperCase();
    let veiculo: Veiculo;
    try {
      this.info_sinesp = 'Buscando informação...';
      veiculo = await this.api_sinesp.consultarPlaca(this.buscar_placa);
      this.info_sinesp = `${veiculo.fabricante} ${veiculo.versao} ${veiculo.ano_mod} ${veiculo.cor}`.toUpperCase();
      this.lista_modelos = await this.filtrarVersoesDoVeiculo(veiculo);
      this.lista_modeloanos = [{id: `${veiculo.ano_mod}-1`, name: veiculo.ano_mod, selecionado: true}];
    } catch (error) {
      this.info_sinesp = error;
    }
  }

  selecionarFabricanteporNome(nome) {
    for (let fabr of this.lista_fabricantes) {
      if (fabr['name'] == nome) {
        this.buscar_fabricante = fabr.id;
        this.lista_fabricantes = [{ id: fabr['id'], nome: fabr['fipe_name'] }];
        return { id: fabr['id'], nome: fabr['fipe_name'] };
      }
    }
    return null;
  }

  async listarFabricantes() {
    if (this.lista_fabricantes.length < 1) {
      this.lista_fabricantes = await this.api_fipe.getFabricantes();
    }
    this.lista_fabricantes.forEach((fab)=>{
      fab.selecionado = false;
    });
    this.lista_fabricantes[0].selecionado = true;
    if (this.lista_fabricantes.length < 1) alert('Nenhum Fabricante disponível');
  }


}
