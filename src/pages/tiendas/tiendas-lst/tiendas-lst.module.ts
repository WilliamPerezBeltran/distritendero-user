import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendasLstPage } from './tiendas-lst';

@NgModule({
  declarations: [
    TiendasLstPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendasLstPage),
  ],
})
export class TiendasLstPageModule {}
