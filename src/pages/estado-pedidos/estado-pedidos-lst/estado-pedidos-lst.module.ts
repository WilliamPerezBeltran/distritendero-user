import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadoPedidosLstPage } from './estado-pedidos-lst';

@NgModule({
  declarations: [
    EstadoPedidosLstPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadoPedidosLstPage),
  ],
})
export class EstadoPedidosLstPageModule {}
