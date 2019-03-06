import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
var ApiFipeService = /** @class */ (function () {
    function ApiFipeService(http) {
        this.http = http;
        this.api_url = 'http://fipeapi.appspot.com/api/1/carros';
    }
    ApiFipeService.prototype.getFabricantes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.api_url + "/marcas.json")
                .subscribe(function (data) { resolve(JSON.parse(data._body)); }, function (error) { reject(error); });
        });
    };
    ApiFipeService.prototype.getModelosPorFabricante = function (id_fabricante) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.api_url + "/veiculos/" + id_fabricante + ".json")
                .subscribe(function (data) { resolve(JSON.parse(data._body)); }, function (error) { reject(error); });
        });
    };
    ApiFipeService.prototype.getModelosAnosPorModelo = function (id_fabricante, id_modelo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.api_url + "/veiculo/" + id_fabricante + "/" + id_modelo + ".json")
                .subscribe(function (data) { resolve(JSON.parse(data._body)); }, function (error) { reject(error); });
        });
    };
    ApiFipeService.prototype.getValorPorModeloAno = function (id_fabricante, id_modelo, id_ano) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.api_url + "/veiculo/" + id_fabricante + "/" + id_modelo + "/" + id_ano + ".json")
                .subscribe(function (data) { resolve(JSON.parse(data._body)); }, function (error) { reject(error); });
        });
    };
    ApiFipeService.prototype.getValorPorCodigoFIPE = function (id_fabricante, codigoFIPE) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.api_url + "/veiculo/" + id_fabricante + "/" + codigoFIPE + ".json")
                .subscribe(function (data) { resolve(JSON.parse(data._body)); }, function (error) { reject(error); });
        });
    };
    ApiFipeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Http])
    ], ApiFipeService);
    return ApiFipeService;
}());
export { ApiFipeService };
//# sourceMappingURL=api-fipe.service.js.map