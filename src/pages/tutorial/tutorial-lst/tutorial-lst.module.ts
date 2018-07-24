import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialLstPage } from './tutorial-lst';

@NgModule({
  declarations: [
    TutorialLstPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialLstPage),
  ],
})
export class TutorialLstPageModule {}
