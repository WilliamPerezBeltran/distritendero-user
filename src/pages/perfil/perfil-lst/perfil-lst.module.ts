import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilLstPage } from './perfil-lst';

@NgModule({
  declarations: [
    PerfilLstPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilLstPage),
  ],
})
export class PerfilLstPageModule {}
