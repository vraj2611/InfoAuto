import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BuscarinfoPage } from './buscarinfo.page';
var routes = [
    {
        path: '',
        component: BuscarinfoPage
    }
];
var BuscarinfoPageModule = /** @class */ (function () {
    function BuscarinfoPageModule() {
    }
    BuscarinfoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BuscarinfoPage]
        })
    ], BuscarinfoPageModule);
    return BuscarinfoPageModule;
}());
export { BuscarinfoPageModule };
//# sourceMappingURL=buscarinfo.module.js.map