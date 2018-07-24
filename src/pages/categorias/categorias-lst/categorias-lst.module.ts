import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriasLstPage } from './categorias-lst';

@NgModule({
  declarations: [
    CategoriasLstPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriasLstPage),
  ],
})
export class CategoriasLstPageModule {}
