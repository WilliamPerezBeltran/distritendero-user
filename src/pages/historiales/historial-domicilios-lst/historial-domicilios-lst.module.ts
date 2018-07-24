import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialDomiciliosLstPage } from './historial-domicilios-lst';

@NgModule({
  declarations: [
    HistorialDomiciliosLstPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialDomiciliosLstPage),
  ],
})
export class HistorialDomiciliosLstPageModule {}
