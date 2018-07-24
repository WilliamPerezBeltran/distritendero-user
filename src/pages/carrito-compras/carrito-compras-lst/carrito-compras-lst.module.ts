import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoComprasLstPage } from './carrito-compras-lst';

@NgModule({
  declarations: [
    CarritoComprasLstPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoComprasLstPage),
  ],
})
export class CarritoComprasLstPageModule {}
