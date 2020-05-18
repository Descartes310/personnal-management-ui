import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Template } from '../_models/template.model';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Template> {
        return this.http.post<Template>(Routes.Template, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Template> {
        return this.http.post<Template>(`${Routes.Template}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<Template> {
        return this.http.get<Template>(`${Routes.Template}/${id}`).toPromise();
    }

}