import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {AppSettings} from "../app/app.settings";

@Injectable()
export class PaisServicio {

  options: RequestOptions;

  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {

    // Creo las cabeceras para los Http requests.
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    });
  }

  /**
   * Trae los paises
   * @returns {Promise<any>}
   */
  getCountriesList(): Promise<any> {
    return this.http.get(AppSettings.API_ENDPOINT + 'paises')
      .toPromise()
      .then(response => response.json())
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
