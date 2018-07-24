import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NotificacionServicio} from "../../../services/notificacion.servicio";
import {AlertController} from 'ionic-angular';

/**
 * Generated class for the NotificacionesLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones-lst',
  templateUrl: 'notificaciones-lst.html',
})
export class NotificacionesLstPage {

  //Datos para enviar a servicio
  data = {
    token: JSON.parse(localStorage.getItem('token')),
  };

  notificaciones = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public notificacionServicio: NotificacionServicio, private alertController: AlertController) {
    this.traerNotificaciones(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesLstPage');
  }

  /**
   * Trae todos los pedidos segun el usuario en sesion
   * @param data
   */
  traerNotificaciones(data) {
console.log('traerNotificaciones');
console.log(data);
    this.notificacionServicio
      .getNotificaciones(data)
      .then(response => {
        console.log(response);
        console.log(response.data.notificaciones);
        this.notificaciones = response.data.notificaciones;
        if (this.notificaciones == undefined) {
          let alert = this.alertController.create({
            title: 'Notificaciones',
            subTitle: 'No hay notificaciones',
            buttons: ['Aceptar']
          });
          alert.present();
        }


        console.log(response);

      });
  }

  /**
   * Se utiliza para saber si la tienda tiene logo
   * @param imagen
   * @returns {boolean}
   */
  imagen(imagen) {
    if (imagen == undefined || imagen == '') {
      return false;
    } else {
      return true;
    }
  }
}
