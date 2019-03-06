import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VeiculoscadastradosPage } from './veiculoscadastrados.page';
var routes = [
    {
        path: '',
        component: VeiculoscadastradosPage
    }
];
var VeiculoscadastradosPageModule = /** @class */ (function () {
    function VeiculoscadastradosPageModule() {
    }
    VeiculoscadastradosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VeiculoscadastradosPage]
        })
    ], VeiculoscadastradosPageModule);
    return VeiculoscadastradosPageModule;
}());
export { VeiculoscadastradosPageModule };
//# sourceMappingURL=veiculoscadastrados.module.js.map