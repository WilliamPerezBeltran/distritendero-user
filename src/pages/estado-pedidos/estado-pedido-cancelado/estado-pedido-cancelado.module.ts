import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadoPedidoCanceladoPage } from './estado-pedido-cancelado';

@NgModule({
  declarations: [
    EstadoPedidoCanceladoPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadoPedidoCanceladoPage),
  ],
})
export class EstadoPedidoCanceladoPageModule {}
