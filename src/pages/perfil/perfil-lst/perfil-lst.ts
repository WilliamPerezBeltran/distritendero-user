import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioUpdPage} from "../../usuario/usuario-upd/usuario-upd";
import {DireccionesLstPage} from "../../direcciones/direcciones-lst/direcciones-lst";
import {HistorialDomiciliosLstPage} from "../../historiales/historial-domicilios-lst/historial-domicilios-lst";
import {GeolocalizacionPage} from "../../geolocalizacion/geolocalizacion";
import {MyApp} from "../../../app/app.component";
import { Events } from 'ionic-angular';
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {AppSettings} from "../../../app/app.settings"


/**
 * Generated class for the PerfilLstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-lst',
  templateUrl: 'perfil-lst.html',
})
export class PerfilLstPage {
  user={
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    name:'',
    telefono:'',
    imgProfile:'',
  };
  //arreglo para cuando la persona esta logeada
  data={
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token:JSON.parse(localStorage.getItem('token')),
    referenciaApp:AppSettings.REFERENCIA_APP,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController,public events: Events,public usuarioServicio: UsuarioServicio) {

    //Obtiene la informacion del usuario es necesario enviarle el token pero en el servicio se lo envio por medio del array user.token
    this.getInfoUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilLstPage');
  }

  goToUsuarioUpdPage(){
    this.navCtrl.push(UsuarioUpdPage);
  }

  /**
   * Navega a direcciones favoritas
   */
  navegarDireccionesFavoritas(){
    this.navCtrl.push(DireccionesLstPage);
  }

  /**
   * Navega a historial de domicilios
   */
  navegarHistorialDomicilios(){
    this.navCtrl.push(HistorialDomiciliosLstPage);
  }
  cerrarSesion(){
// Si no encuentra pedido muestra alerta
    let alert = this.alertController.create({
      title: 'Cerrar Sesión',
      subTitle: '¿Esta seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            localStorage.clear();
            this.events.publish('cambiarMenu');
            this.navCtrl.setRoot(MyApp);
            console.log('Aceptar');
          }
        }
      ]
    });
    alert.present();
  }


  /**
   * trae toda la informacion del usuario de la base de datos para despues mostrarla en la vista
   */
  getInfoUser(){
    //Este toquen es para mostrar las pestanas del menu. Si esta logeado muestra todas si no muestra tres pestanas
    let token=JSON.parse(localStorage.getItem('token'));

    this.usuarioServicio
      .getUserProfile(this.data)
      .then(response => {
        console.log('app.component.ts getInfoUser');
        console.log(response);
        //cuando la persona esta logeada va asignar los datos traidos de la base de datos a la vista
        if(response.data.status=='10001'){
          //asigno las variables que me llegan de la base de datos a la vista
          this.user.name=response.data.usuario.name;
          this.user.telefono=response.data.usuario.mobile;
          this.user.imgProfile=response.data.usuario.imgProfile;

        }
        //En el caso que la persona no tenga foto le va poner una foto de default
        if(this.user.imgProfile=='' || this.user.imgProfile=='undefined'|| this.user.imgProfile==null){
          this.user.imgProfile='/assets/img/perfil/addperson.png';
        }
      });

  }

  /**
   * Se utiliza para saber si tiene logo y la imagen
   * @param imgTienda
   * @returns {boolean}
   */
  imagen(imagen){
    if(imagen == undefined || imagen == ''){
      return false;
    } else {
      return true;
    }
  }

}
