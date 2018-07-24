import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DireccionesLstPage } from './direcciones-lst';

@NgModule({
  declarations: [
    DireccionesLstPage,
  ],
  imports: [
    IonicPageModule.forChild(DireccionesLstPage),
  ],
})
export class DireccionesLstPageModule {}
