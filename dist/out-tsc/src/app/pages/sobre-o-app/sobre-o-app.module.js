import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SobreOAppPage } from './sobre-o-app.page';
var routes = [
    {
        path: '',
        component: SobreOAppPage
    }
];
var SobreOAppPageModule = /** @class */ (function () {
    function SobreOAppPageModule() {
    }
    SobreOAppPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SobreOAppPage]
        })
    ], SobreOAppPageModule);
    return SobreOAppPageModule;
}());
export { SobreOAppPageModule };
//# sourceMappingURL=sobre-o-app.module.js.map