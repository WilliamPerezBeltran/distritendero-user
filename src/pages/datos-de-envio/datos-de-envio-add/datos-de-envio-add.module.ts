import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosDeEnvioAddPage } from './datos-de-envio-add';

@NgModule({
  declarations: [
    DatosDeEnvioAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosDeEnvioAddPage),
  ],
})
export class DatosDeEnvioAddPageModule {}
