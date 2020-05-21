import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { Template } from '../_models/template.model';
import { BlogPost } from '../_models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<BlogPost> {
        return this.http.post<BlogPost>(Routes.BLOGPOST, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<BlogPost> {
        return this.http.post<BlogPost>(`${Routes.BLOGPOST}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<BlogPost> {
        return this.http.get<BlogPost>(`${Routes.BLOGPOST}/${id}`).toPromise();
    }

    blogCategories(): Promise<any> {
      return this.http.get<any>(Routes.BLOGCATEGORY).toPromise();
  }
}
