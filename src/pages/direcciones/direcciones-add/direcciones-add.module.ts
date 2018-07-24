import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DireccionesAddPage } from './direcciones-add';

@NgModule({
  declarations: [
    DireccionesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DireccionesAddPage),
  ],
})
export class DireccionesAddPageModule {}
