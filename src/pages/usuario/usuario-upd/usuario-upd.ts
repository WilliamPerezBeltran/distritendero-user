import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppSettings} from "../../../app/app.settings";
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {AlertController} from 'ionic-angular';
import {PerfilLstPage} from "../../perfil/perfil-lst/perfil-lst";
import {ContrasenaUpdPage} from "../contrasena-upd/contrasena-upd";


/**
 * Generated class for the UsuarioUpdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario-upd',
  templateUrl: 'usuario-upd.html',
})
export class UsuarioUpdPage {
  //datos para traer la informacion del usuario
  data = {
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token: JSON.parse(localStorage.getItem('token')),
    referenciaApp: AppSettings.REFERENCIA_APP,
    name: '',
    dia: '',
    email: '',
    mes: '',
    mobile: '',
    sex: '',
    anio: '',
    date: '',
    imgProfile: '',
  };

  constructor(public navController: NavController, public navParams: NavParams, public usuarioServicio: UsuarioServicio, public alertController: AlertController) {
    console.log('constructora');
    this.getUserProfile(this.data);
  }

  ionViewDidLoad() {

    /**
     * Trae los datos del usuario utilizando el token y la referenciaApp
     */


  }

  /**
   * trae los datos de la base de datos del servicio getUserProfile para posteriormente recargarlos en la pagina
   * el parametro data en este punto tien token y referenciaApp para traer la informacion
   * @param data
   */
  getUserProfile(data) {
    console.log('getUserProfile');

    this.usuarioServicio
      .getUserProfile(data)
      .then(response => {
        if (response.data.status == '10001') {
          console.log(this.data);
          console.log(response);
          this.data.name = response.data.usuario.name;
          this.data.dia = response.data.usuario.dia;
          this.data.anio = response.data.usuario.anio;
          this.data.email = response.data.usuario.email;
          this.data.mes = response.data.usuario.mes;
          this.data.mobile = response.data.usuario.mobile;
          this.data.sex = response.data.usuario.sex;
          this.data.imgProfile = response.data.usuario.imgProfile;
        }
      });
  }

  /**
   * Cambia el estado del boton de genero
   * @param genero
   */
  cambiarEstadoGenero(genero) {
    console.log('cambiarEstadoGenero');
    if (genero == 'M') {
      this.data.sex = 'F';
    } else {
      this.data.sex = 'M';
    }
  }

  /**
   * valida la fecha
   */
  validar() {
    if ((this.data.anio != '' && this.data.anio != undefined && this.data.anio != null  ) && ( this.data.mes != '' && this.data.mes != undefined && this.data.mes != null) && (this.data.dia != '' && this.data.dia != undefined && this.data.dia != null)) {
      this.data.date = this.data.anio + '-' + this.data.mes + '-' + this.data.dia;
      this.guardarDatos();
    }
    else if ((this.data.anio == '' || this.data.anio == undefined || this.data.anio == null ) && (this.data.mes == '' || this.data.mes == undefined || this.data.mes == null) && (this.data.dia == '' || this.data.dia == undefined || this.data.dia == null)) {
      this.data.date = '';
      this.guardarDatos();
    } else {
      let alert = this.alertController.create({
        title: '',
        subTitle: 'Para editar la fecha de nacimiento debe ser completa, o tambien puede continuar sin llenar la fecha de nacimiento',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  validation(){
    if(this.data.name==''){
      return 'Debe ingresar el nombre.';
    }
    if(this.data.dia==''){
      return 'Debe ingresar el dia.';
    }
    if(this.data.email==''){
      return 'Debe ingresar el email.';
    }
    if(this.data.mes==''){
      return 'Debe ingresar el mes.';
    }
    if(this.data.mobile==''){
      return 'Debe verificar mobile.';
    }


    //valida que el email contenga la forma xxxx@xxx.xxx
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(this.data.email) ){
      return 'La dirección de correo ' + this.data.email + ' es incorrecta. ';
    }
    return '';
  }


  /**
   * Envia los datos proporcionados por el usuario y los envia a la base de datos
   */
  guardarDatos() {



    var validationMessage=this.validation();
    if(validationMessage==''){

      /**
       * se concatena el anio, mes, dia para despues enviarlo a la base de datos como date
       * @type {string}
       */

      console.log('gurdarDatos');
      console.log('this.data');
      console.log(this.data);
      //envia los datos a la base de datos para actualizarlos
      this.usuarioServicio
        .updateProfile(this.data)
        .then(response => {
          console.log(response);
          if (response.data.status == '10001') {
            /**
             * Genera una alerta si es exitoso
             * @type {Alert}
             */
            let alert = this.alertController.create({
              title: 'Exito',
              subTitle: 'El usuario se actualizó correctamente',
              buttons: ['Aceptar']
            });
            alert.present();
            /**
             * lo lleva a la pagina PerfilLstPage
             */
            this.navController.pop();
          } else if (response.data.status == '10002') {
            /**
             * En el caso que el status sea 10002 es decir que hubo algun tipo de error
             * @type {Alert}
             */
            let alert = this.alertController.create({
              title: 'Error',
              subTitle: response.error.message,
              buttons: ['Aceptar']
            });
            alert.present();

          }
        });

    }else{
      //crea un alert de exito para verificar que el correo se ha guardado correctmante
      let alert = this.alertController.create({
        title: 'Error',
        subTitle: validationMessage,
        buttons: ['Aceptar']
      });
      alert.present();


    }





  }

  /**
   * Al hacer click a 'cambiar mi contrasena' lo lleva a la pagina ContrasenaUpdPage
   */
  goToCambiarContrasena() {
    console.log('goToCambiarContrasena');
    this.navController.push(ContrasenaUpdPage);

  }

  /**
   * Se utiliza para saber si tiene logo y la imagen
   * @param imgTienda
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
