import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {ItemModel} from "../models/item.model";
import {AppSettings} from "../app/app.settings";

@Injectable()
export class GenericoServicio {

  options: RequestOptions;

  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {

    // Creo las cabeceras para los Http requests.
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    });

  }

  /**
   *trae imagenes para banner
   * @param data
   * @returns {Promise<any>}
   */
  getGenericosBanner (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'genericos/getBanner', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * trae imagenes para login
   * @param data
   * @returns {Promise<any>}
   */
  getGenericosAnimacion (data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'genericos/getAnimacion', this.requestParams(data), this.options)
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
