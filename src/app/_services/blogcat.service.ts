import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { BlogCat } from '../_models/blogcat.model';

@Injectable({
  providedIn: 'root'
})
export class BlogcatService {

  constructor(
    private http: HttpClient,
    ) { }

  add(formData: FormData): Promise<BlogCat> {
      return this.http.post<BlogCat>(Routes.BLOG_CATEGORY, formData).toPromise();
  }

  update(formData: FormData, id: number): Promise<BlogCat> {
    return this.http.post<BlogCat>(`${Routes.BLOG_CATEGORY}/${id}`, formData).toPromise();
  }

  find(id: number): Promise<BlogCat> {
    return this.http.get<BlogCat>(`${Routes.BLOG_CATEGORY}/${id}`).toPromise();
}
}
