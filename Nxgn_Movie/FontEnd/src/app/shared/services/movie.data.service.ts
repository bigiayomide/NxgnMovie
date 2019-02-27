import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { IResultVM, IMovie } from "../interfaces/interfaces";
import { ConfigService } from "../utils/config.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class MovieDataService {
  _baseUrl: string = "";

  constructor(private http: HttpClient, private configService: ConfigService) {
    this._baseUrl = configService.getApiURI();
  }

  GetAllMovies(): Observable<IResultVM> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .get(this._baseUrl + "Movie/", {
        headers: headers
      })
      .map((res: IResultVM) => res)
      .catch(this.handleError);
  }

  GetMovie(id: number): Observable<IResultVM> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .get(this._baseUrl + "Movie/" + id, {
        headers: headers
      })
      .map((res: IResultVM) => res)
      .catch(this.handleError);
  }

  DeleteMovie(id: number): Observable<IResultVM> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .delete(this._baseUrl + "Movie/" + id, {
        headers: headers
      })
      .map((res: IResultVM) => res)
      .catch(this.handleError);
  }

  UpdateMovie(event: IMovie): Observable<IResultVM> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .patch(this._baseUrl + "Movie/", event, {
        headers: headers
      })
      .map((res: IResultVM) => res)
      .catch(this.handleError);
  }

  CreateMovie(event: IMovie): Observable<IResultVM> {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(this._baseUrl + "Movie/", event, {
        headers: headers
      })
      .map((res: IResultVM) => res)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const applicationError = error.headers.get("Application-Error");
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
