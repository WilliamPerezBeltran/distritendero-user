import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsAddPage } from './items-add';

@NgModule({
  declarations: [
    ItemsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsAddPage),
  ],
})
export class ItemsAddPageModule {}
