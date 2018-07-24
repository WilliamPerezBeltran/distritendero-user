import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeolocalizacionPage } from './geolocalizacion';

@NgModule({
  declarations: [
    GeolocalizacionPage,
  ],
  imports: [
    IonicPageModule.forChild(GeolocalizacionPage),
  ],
})
export class GeolocalizacionPageModule {}
