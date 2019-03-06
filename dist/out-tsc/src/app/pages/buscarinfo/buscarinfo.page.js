import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiFipeService } from 'src/app/services/api-fipe.service';
import { ApiSinespService } from 'src/app/services/api-sinesp.service';
import { Fabricante } from 'src/app/models/fabricante';
var BuscarinfoPage = /** @class */ (function () {
    function BuscarinfoPage(api_fipe, api_sinesp, fbr) {
        this.api_fipe = api_fipe;
        this.api_sinesp = api_sinesp;
        this.fbr = fbr;
        this.lista_fabricantes = [];
        this.lista_modelos = [];
        this.lista_modeloanos = [];
        this.listarFabricantes();
        this.info_sinesp = 'Informe uma placa para buscar';
        this.valor_fipe = '--';
        this.descricao_fipe = 'Valor FIPE';
    }
    BuscarinfoPage.prototype.ngOnInit = function () { };
    BuscarinfoPage.prototype.testar = function () {
        alert(this.buscar_fabricante + " _ " + this.buscar_modelo);
    };
    BuscarinfoPage.prototype.tratarPlaca = function () {
        this.buscar_placa = this.buscar_placa.toUpperCase();
        if (this.buscar_placa.length == 7)
            this.buscarModeloPorPlaca();
        if (this.buscar_placa.length < 7)
            this.info_sinesp = 'Informe uma placa para buscar';
    };
    BuscarinfoPage.prototype.filtrarVersoesDoVeiculo = function (veiculo) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fabr, versoes_fabr, versoes_modelo;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fabr = this.selecionarFabricanteporNome(veiculo.fabricante);
                        return [4 /*yield*/, this.api_fipe.getModelosPorFabricante(fabr.id)];
                    case 1:
                        versoes_fabr = _a.sent();
                        versoes_modelo = versoes_fabr.filter(function (versao) {
                            var teste_modelo;
                            teste_modelo = versao['name'].toLowerCase().indexOf(veiculo.modelo.toLowerCase()) > -1;
                            return teste_modelo;
                        });
                        return [2 /*return*/, versoes_modelo];
                }
            });
        });
    };
    BuscarinfoPage.prototype.filtarModelosPorFabricanteSelecionado = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.buscar_placa || this.buscar_placa.length == 0)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.api_fipe.getModelosPorFabricante(this.buscar_fabricante)];
                    case 1:
                        _a.lista_modelos = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BuscarinfoPage.prototype.filtarAnoPorModeloSelecionado = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api_fipe.getModelosAnosPorModelo(this.buscar_fabricante, this.buscar_modelo)];
                    case 1:
                        _a.lista_modeloanos = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BuscarinfoPage.prototype.buscarValorPorModelo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api_fipe.getValorPorModeloAno(this.buscar_fabricante, this.buscar_modelo, this.buscar_ano)];
                    case 1:
                        result = _a.sent();
                        this.descricao_fipe = "Valor FIPE (c\u00F3digo: " + result['fipe_codigo'] + ")";
                        this.valor_fipe = result['preco'];
                        return [2 /*return*/];
                }
            });
        });
    };
    BuscarinfoPage.prototype.buscarModeloPorPlaca = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var veiculo, _a, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.buscar_placa = this.buscar_placa.toUpperCase();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        this.info_sinesp = 'Buscando informação...';
                        return [4 /*yield*/, this.api_sinesp.consultarPlaca(this.buscar_placa)];
                    case 2:
                        veiculo = _b.sent();
                        this.info_sinesp = (veiculo.fabricante + " " + veiculo.versao + " " + veiculo.ano_mod + " " + veiculo.cor).toUpperCase();
                        _a = this;
                        return [4 /*yield*/, this.filtrarVersoesDoVeiculo(veiculo)];
                    case 3:
                        _a.lista_modelos = _b.sent();
                        this.lista_modeloanos = [{ id: veiculo.ano_mod + "-1", name: veiculo.ano_mod, selecionado: true }];
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        this.info_sinesp = error_1;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BuscarinfoPage.prototype.selecionarFabricanteporNome = function (nome) {
        for (var _i = 0, _a = this.lista_fabricantes; _i < _a.length; _i++) {
            var fabr = _a[_i];
            if (fabr['name'] == nome) {
                this.buscar_fabricante = fabr.id;
                this.lista_fabricantes = [{ id: fabr['id'], nome: fabr['fipe_name'] }];
                return { id: fabr['id'], nome: fabr['fipe_name'] };
            }
        }
        return null;
    };
    BuscarinfoPage.prototype.listarFabricantes = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.lista_fabricantes.length < 1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.fbr.getFabricantes()];
                    case 1:
                        _a.lista_fabricantes = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (this.lista_fabricantes.length < 1)
                            alert('Nenhum Fabricante disponível');
                        return [2 /*return*/];
                }
            });
        });
    };
    BuscarinfoPage = tslib_1.__decorate([
        Component({
            selector: 'app-buscarinfo',
            templateUrl: './buscarinfo.page.html',
            styleUrls: ['./buscarinfo.page.scss'],
            providers: [ApiFipeService, ApiSinespService]
        }),
        tslib_1.__metadata("design:paramtypes", [ApiFipeService,
            ApiSinespService,
            Fabricante])
    ], BuscarinfoPage);
    return BuscarinfoPage;
}());
export { BuscarinfoPage };
//# sourceMappingURL=buscarinfo.page.js.map