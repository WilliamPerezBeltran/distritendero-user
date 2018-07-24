import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsLstPage } from './items-lst';

@NgModule({
  declarations: [
    ItemsLstPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsLstPage),
  ],
})
export class ItemsLstPageModule {}
