import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {GenericoServicio} from "../../services/generico.servicio"
import {TiendasLstPage} from "../tiendas/tiendas-lst/tiendas-lst";
import {AppSettings} from "../../app/app.settings"

/**
 * Generated class for the GeolocalizacionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geolocalizacion',
  templateUrl: 'geolocalizacion.html',
})
export class GeolocalizacionPage {

  animacion:any;
  datos={
    referenciaApp:AppSettings.REFERENCIA_APP,

  };

  /**
   * En el contructor se carga el plugin de georeferenciacion para obtener la latitud y longitud del usuairo
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {Geolocation} geolocation
   * @param {GenericoServicio} genericoServicio
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public genericoServicio: GenericoServicio) {
    this.getLocation();
  }

  /**
   * Al cargar la pagina se carga el gif traido de la base de datos
   */
  ionViewDidLoad() {
    this.genericoServicio
      .getGenericosAnimacion(this.datos)
      .then(response => {
        //si trae el gif sin ningun problema, de lo contrario muestra una imagen por default
        if(response.data.tiendas.gif){
          this.animacion=response.data.tiendas.gif;
        }else{
          this.animacion='https://serviciosonline.net/wp-content/uploads/2017/06/Ultimate-Member-500x383.png';
        }

        console.log(response);
        console.log(this.animacion);
      }, (err) => {
        console.log(err);
      });
  }

//todo: se coloca una imagen por default en caso que el gif falle  pero definitivamente hay que cambiarla (this.animation)
  /**
   * obtine la latitud y longitud del usuari para posteriormente guardarlo en variables de sesion
   */
  getLocation(){
      this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      //guardo la litud y la longitud en las variables de sesion
      localStorage.setItem('latitud',JSON.stringify(position.coords.latitude));
      localStorage.setItem('longitud',JSON.stringify(position.coords.longitude));
      this.navCtrl.setRoot(TiendasLstPage);
    }, (err) => {
      console.log(err);
    });

  }


}
