import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioAddPage} from "../../usuario/usuario-add/usuario-add";
import {AppSettings} from "../../../app/app.settings";
import {UsuarioServicio} from "../../../services/usuario.servicio";
//import {DatosDeEnvioLstPage} from "../../datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import { AlertController } from 'ionic-angular';
import {DatosDeEnvioAddPage} from "../../datos-de-envio/datos-de-envio-add/datos-de-envio-add";
import {DatosDeEnvioLstPage} from "../../datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import { Events } from 'ionic-angular';
import {ContrasenaUpdPage} from "../../usuario/contrasena-upd/contrasena-upd";
import {RecuperarContrasenaPage} from "../../usuario/recuperar-contrasena/recuperar-contrasena";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  datos={
    rol:'2',
    referenciaApp:AppSettings.REFERENCIA_APP,
    email:'',
    password:'',

  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public usuarioServicio: UsuarioServicio,private alertController: AlertController,public events: Events) {
  }

  ionViewDidLoad() {
  }

  validation(){
    if(this.datos.email==''){
      return 'Debe ingresar el email.';
    }
    if(this.datos.password==''){
      return 'Debe ingresar el password.';
    }

    //valida que el email contenga la forma xxxx@xxx.xxx
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(this.datos.email) ){
      return 'La dirección de correo ' + this.datos.email + ' es incorrecta. ';
    }
    return '';
  }


  enviar(){
    //a la variable validationMessage le llega el mensaje de acuerdo a la validacion
    var validationMessage=this.validation();
    if(validationMessage==''){
      this.usuarioServicio
        .signin(this.datos)
        .then(response => {
          console.log(response);

          /**
           * si el usuario no existe
           */
          if(response.data.status=='10003'){
            let alert = this.alertController.create({
              title: 'Error',
              subTitle: 'Usuario o contraseña incorrectos',
              buttons: ['Aceptar']
            });
            alert.present();

          } else if(response.data.status=='10001'){//status=10001 si los datos del login existen
            localStorage.setItem('token', JSON.stringify(response.user.token));
            localStorage.setItem('idUsuario', JSON.stringify(response.user.id));
            this.events.publish('cambiarMenu');
            this.navCtrl.pop();
            //Lo envia a DatosDeEnvioLstPage
            this.navCtrl.push(DatosDeEnvioLstPage);
          }


        });

    }else{
      let alert = this.alertController.create({
        title: 'Error',
        subTitle: validationMessage,
        buttons: ['Aceptar']
      });
      alert.present();
    }






  }



  navegarARegistrar(){
    this.navCtrl.push(UsuarioAddPage);
  }

  olvidarContrasena(){
    this.navCtrl.push(RecuperarContrasenaPage);
  }

}
