import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioAddPage } from './usuario-add';

@NgModule({
  declarations: [
    UsuarioAddPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioAddPage),
  ],
})
export class UsuarioAddPageModule {}
