import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../app/app.settings";

@Injectable()
export class TiendaServicio {

  options: RequestOptions;

  /**
   * Constructor
   * @param {Http} http
   */
  constructor(private http: Http) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('X-Auth', 'd08b633d9bd241f8baee0cb258370630');
    //headers.append('X-Auth', '3eada14debfcc7e376be1bce994c74ac');
    //headers.append('X-Auth', 'be6a23f1e33a9ba84407fa15814c31da');

    this.options = new RequestOptions({headers : headers});
/*
    // Creo las cabeceras para los Http requests.
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    });
*/
  }

  /**
   * Consulta los productos de una tienda.
   * @param data
   * @returns {Promise<any>}
   */
  nearBy(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'tiendas/nearby', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  /**
   * Consulta los productos de una tienda.
   * @param data
   * @returns {Promise<any>}
   */
  getProvedores(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'tiendas/provedores', this.requestParams(data), this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Le da una calificacion a una tienda.
   * @param data
   * @returns {Promise<any>}
   */
  agregarValoracion(data): Promise<any> {
    return this.http
      .post(AppSettings.API_ENDPOINT + 'tiendas/valorar', this.requestParams(data), this.options)
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
