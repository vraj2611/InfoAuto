import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'buscarinfo', pathMatch: 'full'},
  { path: 'sobreoapp', loadChildren: './pages/sobre-o-app/sobre-o-app.module#SobreOAppPageModule' },
  { path: 'buscarinfo', loadChildren: './pages/buscarinfo/buscarinfo.module#BuscarinfoPageModule' },
  { path: 'veiculoscadastrados', loadChildren: './pages/veiculoscadastrados/veiculoscadastrados.module#VeiculoscadastradosPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
