import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Setting } from '../_models/setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Setting> {
        return this.http.post<Setting>(Routes.Setting, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Setting> {
        return this.http.post<Setting>(`${Routes.Setting}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<Setting> {
        return this.http.get<Setting>(`${Routes.Setting}/${id}`).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.Setting).toPromise();
    }

    delete(id: number): Promise<Setting[]> {
        return this.http.delete<Setting[]>(`${Routes.Setting}/${id}`).toPromise();
    }

}