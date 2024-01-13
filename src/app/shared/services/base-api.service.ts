import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface DefaultApiResponse<T> {
  value: any,
  formatters: any[],
  contentTypes: any[],
  declaredType: any,
  statusCode: number
}

export abstract class BaseApiService {
  protected constructor(protected http: HttpClient) {}

  protected getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  protected postFile(
    url: string,
    body: any,
    options: any = null,
    apiUrl: string = environment.apiUrl
  ): Observable<any> {
    const headers: any = new HttpHeaders({})
    options = { ...{ headers }, ...options }
    return this.http.post<any>(apiUrl + url, body, options)
  }

  protected post(
    url: string,
    body: any,
    options: any = null,
    apiUrl: string = environment.apiUrl
  ): Observable<any> {
    const headers: any = this.getDefaultHeaders()
    options = { ...{ headers }, ...options }
    return this.http.post<any>(apiUrl + url, body, options)
  }

  protected put(
    url: string,
    body: any,
    options: any = null,
    apiUrl: string = environment.apiUrl
  ): Observable<any> {
    const headers: any = this.getDefaultHeaders()
    options = { ...{ headers }, ...options }
    return this.http.put<any>(apiUrl + url, body, options)
  }

  protected get(
    url: string,
    options: any = null,
    apiUrl: string = environment.apiUrl
  ): Observable<any> {
    const headers: any = this.getDefaultHeaders()
    options = { ...{ headers }, ...options }
    return this.http.get<any>(apiUrl + url, options)
  }

  delete(
    url: string,
    options: any = null,
    apiUrl: string = environment.apiUrl
  ): Observable<any> {
    const headers: any = this.getDefaultHeaders()
    options = { ...{ headers }, ...options }
    return this.http.delete<any>(apiUrl + url, options)
  }
}
