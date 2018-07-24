import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaisServicio} from "../../../services/pais.servicio";
import {UsuarioServicio} from "../../../services/usuario.servicio";
import {AppSettings} from "../../../app/app.settings";
//import {DatosDeEnvioLstPage} from "../../datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import { AlertController } from 'ionic-angular';
import {DatosDeEnvioAddPage} from "../../datos-de-envio/datos-de-envio-add/datos-de-envio-add";
import {DatosDeEnvioLstPage} from "../../datos-de-envio/datos-de-envio-lst/datos-de-envio-lst";
import { Events } from 'ionic-angular';
/**
 * Generated class for the UsuarioAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario-add',
  templateUrl: 'usuario-add.html',
})
export class UsuarioAddPage {

  paises : any;
  datos={
    rol:'2',
    referenciaApp:AppSettings.REFERENCIA_APP,
    name:'',
    mobile:'',
    email:'',
    password:'',
    repeatPassword:'',
    aceptarTerminos:false,
    pais:'52',//hago que carge colombia de primero


  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public paisServicio:PaisServicio, public usuarioServicio:UsuarioServicio,public  alertController:AlertController,public events: Events) {
  }

  /**
   * trae los paises del select al recargar la pagina
   */
  ionViewDidLoad() {
    this.paisServicio
      .getCountriesList()
      .then(response => {
        console.log('registrar, paises select');
        console.log(response);
          this.paises = response.data.paises;
      });
  }

  validation(){
    if(this.datos.name==''){
      return 'Debe ingresar el nombre.';
    }
    if(this.datos.mobile==''){
      return 'Debe ingresar el celular.';
    }
    if(this.datos.email==''){
      return 'Debe ingresar el email.';
    }
    if(this.datos.password==''){
      return 'Debe ingresar el password.';
    }
    if(this.datos.repeatPassword==''){
      return 'Debe verificar password.';
    }
    if(this.datos.aceptarTerminos==false){
      return 'Debe aceptar los terminos y condiciones.';
    }
    if(this.datos.password!=this.datos.repeatPassword){
      return 'Las claves deben coincidir.';
    }
    //valida que el email contenga la forma xxxx@xxx.xxx
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(this.datos.email) ){
      return 'La dirección de correo ' + this.datos.email + ' es incorrecta. ';
  }
    return '';
  }
  /**
   * guarda los datos del usuario(envia  los datos a la base de datos )
   */
  guardar(){
    console.log(this.datos);
    //llamo a la funcion validar para que me valide todos los campos
    var validationMessage=this.validation();
    //si es vacio es decir '', quiere decir que todos los campos estan bien y listos para llamar el servicio
    if(validationMessage==''){
      /**
       * se va al servicio y guarda los datos suministrados por el cliente
       */
      this.usuarioServicio
        .signup(this.datos)
        .then(response => {
          console.log(response);

          //si hay un correo repetido mostrará el mensaje de correo repetido
          if(response.data.status=='10003'){
            let alert = this.alertController.create({
              title: 'Error',
              subTitle:response.error.message,
              buttons: ['Aceptar']
            });
            alert.present();

            /**
             * para el else if si es existoso mostrar el status 10001 es decir que ha sido registrado exitosamente
             * y posterioemente lo envia a la pantalla DatosDeEnvioLstPage
             */

          }else if(response.data.status=='10001'){

            //crea las variables de sesion token y idUsuario  y las guarda
            localStorage.setItem('token', JSON.stringify(response.user.result.token));
            localStorage.setItem('idUsuario', JSON.stringify(response.user.result.idUser));

            //crea un alert de exito para verificar que el correo se ha guardado correctmante
            let alert = this.alertController.create({
              title: 'Exito',
              subTitle: response.user.message,
              buttons: ['Aceptar']
            });
            alert.present();

            this.events.publish('cambiarMenu');
            //lo envia a la pagina de DatosDeEnvioLstPage
            this.navCtrl.push(DatosDeEnvioLstPage);
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
