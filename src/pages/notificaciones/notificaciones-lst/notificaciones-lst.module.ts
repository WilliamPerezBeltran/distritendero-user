import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificacionesLstPage } from './notificaciones-lst';

@NgModule({
  declarations: [
    NotificacionesLstPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificacionesLstPage),
  ],
})
export class NotificacionesLstPageModule {}
