import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {GeolocalizacionPage} from "../pages/geolocalizacion/geolocalizacion";
import {AppSettings} from "./app.settings";
import {UsuarioServicio} from "../services/usuario.servicio";
import {NotificacionesLstPage} from "../pages/notificaciones/notificaciones-lst/notificaciones-lst";
import {TerminosCondicionesDetPage} from "../pages/terminos-condiciones/terminos-condiciones-det/terminos-condiciones-det";
import {TutorialLstPage} from "../pages/tutorial/tutorial-lst/tutorial-lst";
import {PerfilLstPage} from "../pages/perfil/perfil-lst/perfil-lst";
import {EstadoPedidosLstPage} from "../pages/estado-pedidos/estado-pedidos-lst/estado-pedidos-lst";




import {UsuarioAddPage} from "../pages/usuario/usuario-add/usuario-add";
import {LoginPage} from "../pages/login/login-lst/login";

declare var cordova:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GeolocalizacionPage;

  user = {
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    name: '',
    telefono: '',
    imgProfile: '',
  };

  //arreglo para cuando la persona esta logeada
  data = {
    //token:'09c7e3be9bd783b7861610e4ca91d773',
    token: JSON.parse(localStorage.getItem('token')),
    referenciaApp: AppSettings.REFERENCIA_APP,
  };

  paginas: Array<{ titulo: string, componente: any, icono: string }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public usuarioServicio: UsuarioServicio,
              public alertCtrl: AlertController,
              public events: Events) {

    //Este toquen es para mostrar las pestanas del menu. Si esta logeado muestra todas si no muestra tres pestanas
    let token = JSON.parse(localStorage.getItem('token'));
    //Obtiene la informacion del usuario es necesario enviarle el token pero en el servicio se lo envio por medio del array user.token
    this.getInfoUser();

    events.subscribe('cambiarMenu', () => {
      this.menu();
    });

    this.menu();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initPushwoosh();

    });

  }

  /**
   * trae toda la informacion del usuario de la base de datos para despues mostrarla en la vista
   */
  getInfoUser() {
    this.usuarioServicio
      .getUserProfile(this.data)
      .then(response => {
        console.log('app.component.ts getInfoUser');
        console.log(response);
        //cuando la persona esta logeada va asignar los datos traidos de la base de datos a la vista
        if (response.data.status == '10001') {
          //asigno las variables que me llegan de la base de datos a la vista
          this.user.name = response.data.usuario.name;
          this.user.telefono = response.data.usuario.mobile;
          this.user.imgProfile = response.data.usuario.imgProfile;

        }
        //En el caso que la persona no tenga foto le va poner una foto de default
        if (this.user.imgProfile == '' || this.user.imgProfile == 'undefined' || this.user.imgProfile == null) {
          this.user.imgProfile = '/assets/img/perfil/addperson.png';
        }
      });

  }

  goToPage(pagina) {
    if (pagina == 'cerrarSesion') {

      let prompt = this.alertCtrl.create({
        title: 'Atención',
        message: "Seguro desea cerrar sesión",

        buttons: [
          {
            text: 'Cancelar',
            handler: data => {

            }
          },
          {
            text: 'Aceptar',
            handler: data => {
              localStorage.clear();
              this.menu();
              this.nav.setRoot(GeolocalizacionPage);
            }
          }
        ]
      });
      prompt.present();



    } else {
      //this.nav.push(pagina);
      this.nav.setRoot(pagina);
    }


  }

  menu() {

    //Este toquen es para mostrar las pestanas del menu. Si esta logeado muestra todas si no muestra tres pestanas
    let token = JSON.parse(localStorage.getItem('token'));
    //Obtiene la informacion del usuario es necesario enviarle el token pero en el servicio se lo envio por medio del array user.token
    this.getInfoUser();

    if (token == '' || token == 'undefined' || token == null) {

      this.user.name = '';
      this.user.telefono = '';
      this.user.imgProfile = '';


      this.paginas = [
        {titulo: 'Tiendas', componente: GeolocalizacionPage, icono: 'md-home'},
        {titulo: 'Distritendero', componente: NotificacionesLstPage, icono: 'md-globe'},
        {titulo: 'Términos y condiciones ', componente: TerminosCondicionesDetPage, icono: 'md-book'},
        {titulo: 'Ayuda', componente: TutorialLstPage, icono: 'md-help-circle'},
      ];

    } else {
      this.paginas = [
        {titulo: 'Perfil', componente: PerfilLstPage, icono: 'contact'},
        {titulo: 'Notificaciones', componente: NotificacionesLstPage, icono: 'notifications-outline'},
        {titulo: 'Distritendero', componente: NotificacionesLstPage, icono: 'md-globe'},
        {titulo: 'Estado de mis pedidos', componente: EstadoPedidosLstPage, icono: 'pulse'},
        {titulo: 'Términos y condiciones ', componente: TerminosCondicionesDetPage, icono: 'md-book'},
        {titulo: 'Ayuda', componente: TutorialLstPage, icono: 'md-help-circle'},
        {titulo: 'Cerrar sesión', componente: 'cerrarSesion', icono: 'md-close-circle'},
      ];

    }
  }

  initPushwoosh() {
    var pushwoosh = cordova.require("pushwoosh-cordova-plugin.PushNotification");

    pushwoosh.registerDevice(
      function(status) {
        var pushToken = status.pushToken;
        console.log('pushwoosh registrado');
        console.log(pushToken);
      },
      function(status) {
        console.log('pushwoosh NO registrado!!!');
      }
    );

    pushwoosh.setTags({"ID Usuario":"2448-3"},
      function() {
        console.log('setTags success');

        pushwoosh.getTags(
          function(tags) {
            console.log('tags for the device: ' + JSON.stringify(tags));
          },
          function(error) {
            console.log('get tags error: ' + JSON.stringify(error));
          }
        );
      },
      function(error) {
        console.log('setTags failed');
      }
    );

    // Should be called before pushwoosh.onDeviceReady
    document.addEventListener('push-notification', function (event) {
      var notification = (event as any).notification;
      var message = (event as any).notification.message;
      console.log('pushwoosh notification');
      console.log(notification);
      console.log(message);
    });

    // Initialize Pushwoosh. This will trigger all pending push notifications on start.
    pushwoosh.onDeviceReady({
      appid: "888E2-3B4C8",
      projectid: "184236676042",
      //serviceName: "MPNS_SERVICE_NAME"
    });
  }
}
