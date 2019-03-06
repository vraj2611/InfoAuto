import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Veiculo } from '../models/veiculo';
var ApiSinespService = /** @class */ (function () {
    function ApiSinespService(http) {
        this.http = http;
        this.api_url = 'http://vilmarrangel-com-br.umbler.net';
    }
    ApiSinespService.prototype.consultarAPI = function (placa) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.api_url + "/placa?p=" + placa)
                .subscribe(function (data) { resolve(JSON.parse(data._body)); }, function (error) { reject(error); });
        });
    };
    ApiSinespService.prototype.consultarPlaca = function (placa) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, div, fabricante, modelo, versao;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consultarAPI(placa)];
                    case 1:
                        result = _a.sent();
                        if (result['codigoRetorno'] != 0) {
                            throw new Error(result['mensagemRetorno']);
                        }
                        div = result['modelo'].indexOf('/');
                        fabricante = result['modelo'].substr(0, div);
                        modelo = result['modelo'].substr(div + 1, result['modelo'].indexOf(' ') - div);
                        versao = result['modelo'].substr(div + 1, 99);
                        return [2 /*return*/, new Veiculo(placa.toLocaleUpperCase(), fabricante, modelo, versao, result['ano'], result['anoModelo'], 'N/A', result['cor'], result['situacao'])];
                }
            });
        });
    };
    ApiSinespService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Http])
    ], ApiSinespService);
    return ApiSinespService;
}());
export { ApiSinespService };
//# sourceMappingURL=api-sinesp.service.js.map