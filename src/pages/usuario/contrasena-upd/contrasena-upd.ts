import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsuarioServicio} from "../../../services/usuario.servicio";
import { AlertController } from 'ionic-angular';
import {PerfilLstPage} from "../../perfil/perfil-lst/perfil-lst";

/**
 * Generated class for the ContrasenaUpdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contrasena-upd',
  templateUrl: 'contrasena-upd.html',
})
export class ContrasenaUpdPage {
  data={
    claveActual:'',
    nuevaClave:'',
    verificarNuevaClave:'',
    token:JSON.parse(localStorage.getItem('token')),
    //token:'b706135c3e3f68dadefc09ebac0cc420',
  }
//todo:validar contrasena que sean iguales
  constructor(public navController: NavController, public navParams: NavParams ,public usuarioServicio: UsuarioServicio, public  alertController:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContrasenaUpdPage');
  }


  validation(){
    if(this.data.claveActual==''){
      return 'Debe ingresar la clave actual.';
    }
    if(this.data.nuevaClave==''){
      return 'Debe ingresar la nueva clave.';
    }
    if(this.data.verificarNuevaClave==''){
      return 'Debe verificar la nueva clave.';
    }

    if(this.data.nuevaClave!=this.data.verificarNuevaClave){
      return 'La nueva clave no coincide.';
    }


    return '';
  }





  /**
   * Guarda la contrasena nueva si la contrasena conside con el token va generar un alert de exito
   * si no va generar un alert de error
   *
   */

  guardarContrasena(){



    var validationMessage=this.validation();
    if(validationMessage==''){

      this.usuarioServicio
        .changePassword(this.data)
        .then(response => {
          console.log(response);
          if(response.data.status=='10001'){

            let alert = this.alertController.create({
              title: 'Exito',
              subTitle: response.user.message,
              buttons: ['Aceptar']
            });
            alert.present();
            /**
             * lo envia a la pagina  PerfilLstPage
             */
            this.navController.pop();
          }else if(response.data.status=='10004'){
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


}
