import * as tslib_1 from "tslib";
import { ApiFipeService } from 'src/app/services/api-fipe.service';
import { Component } from '@angular/core';
var Fabricante = /** @class */ (function () {
    function Fabricante(api_fipe) {
        this.api_fipe = api_fipe;
    }
    Fabricante.prototype.ngOnInit = function () { };
    Fabricante.prototype.getFabricantes = function () {
        return this.api_fipe.getFabricantes();
    };
    Fabricante = tslib_1.__decorate([
        Component({
            providers: [ApiFipeService]
        }),
        tslib_1.__metadata("design:paramtypes", [ApiFipeService])
    ], Fabricante);
    return Fabricante;
}());
export { Fabricante };
//# sourceMappingURL=fabricante.js.map