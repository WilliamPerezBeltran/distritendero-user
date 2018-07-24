import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioServicio} from "../../../services/usuario.servicio";
import { AlertController } from 'ionic-angular';
import {AppSettings} from "../../../app/app.settings";




/**
 * Generated class for the RecuperarContrasenaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-contrasena',
  templateUrl: 'recuperar-contrasena.html',
})
export class RecuperarContrasenaPage {
  datos={
    correo:'',
    referenciaApp:AppSettings.REFERENCIA_APP,
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, public usuarioServicio: UsuarioServicio) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarContrasenaPage');
  }



  validation(){
    if(this.datos.correo==''){
      return 'Debe ingresar el correo.';
    }
    //valida que el email contenga la forma xxxx@xxx.xxx
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(this.datos.correo) ){
      return 'La dirección de correo ' + this.datos.correo + ' es incorrecta. ';
    }
    return '';
  }

  recuperar(){


    var validationMessage=this.validation();
    if(validationMessage==''){
      this.usuarioServicio
        .resetPassword(this.datos)
        .then(response=>{
          // respuesta del servicio recuperar contraseña
          console.log(response);
          //si el usuario no existe
          if(response.error){
            let alert = this.alertController.create({
              title: 'Error',
              subTitle:response.error.message,
              buttons: ['Aceptar']
            });
            alert.present();

          } else if(response.data.status=='10001'){//status=10001 si los datos del login existen
            let alert = this.alertController.create({
              title: 'Bienvenido',
              subTitle: response.user.message,
              buttons: ['Aceptar']
            });
            alert.present();
            //Lo envia a DatosDeEnvioAddPage
            // this.navCtrl.push(DatosDeEnvioAddPage);
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


}

