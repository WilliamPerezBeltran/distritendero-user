import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {AppSettings} from "../app/app.settings";

@Injectable()
export class NotificacionServicio {

  options: RequestOptions;

  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {

    // Creo las cabeceras para los Http requests.
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})

      //'X-Auth': 'd08b633d9bd241f8baee0cb258370630',

    });

  }

  /**
   * Consulta los productos de una tienda.
   * @param data
   * @returns {Promise<any> }
   */
  getCountNotificaciones (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/getCountNotificaciones', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Eliminar Notificación.
   * @param data
   * @returns {Promise<any> }
   */
  eliminarNotificacion (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/eliminarNotificacion', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Notificaciones segun el id del pedido.
   * @param data
   * @returns {Promise<any> }
   */
  isNotificacionAvailable (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/isNotificacionAvailable', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Trae las notificaciones del usuario.
   * @param data
   * @returns {Promise<any> }
   */
  getNotificaciones (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/getNotificaciones', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Trae las notificaciones del usuario.
   * @param data
   * @returns {Promise<any> }
   */
  getFirstNotificacion (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'pedidos/getFirstNotificacion', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Convierte un objeto a URLSearchParams.
   * @param data
   * @returns {URLSearchParams}
   */
  private requestParams(data) {
    const params = new URLSearchParams();

    for(let key in data){
      params.set(key, data[key]);
    }

    return params.toString();
  }

  /**
   * Handles the http response errors.
   * @param error
   * @returns {Promise<any>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
