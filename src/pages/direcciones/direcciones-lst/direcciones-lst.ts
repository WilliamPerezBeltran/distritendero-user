import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UsuarioServicio} from "../../../services/usuario.servicio"
import {AppSettings} from "../../../app/app.settings";
import {AlertController} from 'ionic-angular';
import {DatosDeEnvioLstPage} from "../../datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import {DatosDeEnvioUpdPage} from "../../datos-de-envio/datos-de-envio-upd/datos-de-envio-upd";


/**
 * Generated class for the DireccionesLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direcciones-lst',
  templateUrl: 'direcciones-lst.html',
})
export class DireccionesLstPage {

  data = {
    referenciaApp: AppSettings.REFERENCIA_APP,
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token: JSON.parse(localStorage.getItem('token')),
  };

  objetoDelete = {
    id: '',
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token: JSON.parse(localStorage.getItem('token')),
  };

  infoDirecciones: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioServicio: UsuarioServicio, public alertController: AlertController) {
    this.obtenerDireccionesFavoritas(this.data);

  }

  ionViewDidLoad() {

  }

  obtenerDireccionesFavoritas(data) {

    this.usuarioServicio
      .getDireccionesFavoritas(data)
      .then(response => {
        console.log(response);
        this.infoDirecciones = response.data.places;
        console.log(this.infoDirecciones);
        if(this.infoDirecciones == '' || this.infoDirecciones == undefined){

          let alert = this.alertController.create({
            title: 'No hay direcciones favoritas',
            buttons: ['Aceptar']
          });
          alert.present();



        }
      });

  }


  delete(idDireccion) {

    let alertDelete = this.alertController.create({
      title: 'Advertencia',
      message: "Esta seguro de querer eleminar la dirección?",

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'aceptar',
          handler: data => {
            this.aceptar(idDireccion);
          }
        }
      ]
    });
    alertDelete.present();
  }

  aceptar(idDireccion) {
    this.objetoDelete.id = idDireccion;
    this.deleteDireccion(this.objetoDelete);
    this.obtenerDireccionesFavoritas(this.data);
  }

  deleteDireccion(idDireccion) {
    this.usuarioServicio
      .removeDireccionFavorito(idDireccion)
      .then(response => {
        console.log(response);



      });
  }

  seleccionarDireccion(direccionFavorita) {
    console.log(direccionFavorita);

    let pagina = this.navParams.get('pagina');

    if(DatosDeEnvioLstPage == pagina){

      this.navCtrl.push(DatosDeEnvioLstPage, {
        direccionFavorita: direccionFavorita
      });

    } else if (DatosDeEnvioUpdPage == pagina) {

      this.navCtrl.push(DatosDeEnvioUpdPage, {
        direccionFavorita: direccionFavorita
      });

    }


  }

}
