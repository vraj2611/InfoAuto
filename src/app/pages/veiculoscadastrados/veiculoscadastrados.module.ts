import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VeiculoscadastradosPage } from './veiculoscadastrados.page';

const routes: Routes = [
  {
    path: '',
    component: VeiculoscadastradosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VeiculoscadastradosPage]
})
export class VeiculoscadastradosPageModule {}
