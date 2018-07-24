import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductosLstPage } from './productos-lst';

@NgModule({
  declarations: [
    ProductosLstPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductosLstPage),
  ],
})
export class ProductosLstPageModule {}
