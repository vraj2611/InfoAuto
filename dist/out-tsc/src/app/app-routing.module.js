import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'buscarinfo', pathMatch: 'full' },
    { path: 'sobreoapp', loadChildren: './pages/sobre-o-app/sobre-o-app.module#SobreOAppPageModule' },
    { path: 'buscarinfo', loadChildren: './pages/buscarinfo/buscarinfo.module#BuscarinfoPageModule' },
    { path: 'veiculoscadastrados', loadChildren: './pages/veiculoscadastrados/veiculoscadastrados.module#VeiculoscadastradosPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map