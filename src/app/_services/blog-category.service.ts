import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { BlogCategory } from '../_models/blog.category.model';

@Injectable({
  providedIn: 'root',
})
export class BlogCategoryService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<BlogCategory> {
        return this.http.post<BlogCategory>(Routes.BLOGCATEGORY, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<BlogCategory> {
        return this.http.post<BlogCategory>(`${Routes.BLOGCATEGORY}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.BLOGCATEGORY).toPromise();
    }

    find(id: number): Promise<BlogCategory> {
        return this.http.get<BlogCategory>(`${Routes.BLOGCATEGORY}/${id}`).toPromise();
    }

    delete(id: number): Promise<BlogCategory[]> {
        return this.http.delete<BlogCategory[]>(`${Routes.BLOGCATEGORY}/${id}`).toPromise();
    }

}