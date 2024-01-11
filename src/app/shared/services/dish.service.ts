import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseApiService, DefaultApiResponse} from "./base-api.service";
import {DishModel} from "../models/DishModel";

@Injectable({
  providedIn: 'root',
})
export class DishService extends BaseApiService {
  constructor(protected override http: HttpClient) {
    super(http)
  }

  getAll(): Observable<DefaultApiResponse<DishModel[]>> {
    return this.get('/Dish/ReadAll');
  }

}
