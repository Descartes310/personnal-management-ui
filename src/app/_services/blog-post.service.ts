import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { Template } from '../_models/template.model';
import { BlogPost } from '../_models/blog-post.model';
import { Role } from '../_models/role.model';
import { User } from '../_models/user.model';
import { BlogComment } from '../_models/blog_comment.model';


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
      console.log(id);
        return this.http.post<BlogPost>(`${Routes.BLOGPOST}/${id}`, formData).toPromise();
    }

    findblog(id: number): Promise<BlogPost> {
        return this.http.get<BlogPost>(`${Routes.BLOGPOST}/${id}`).toPromise();
    }

    find(id: number): Promise<any> {
      return this.http.get<BlogPost>(`${Routes.BLOGPOST}/${id}`).toPromise();
  }

    blogCategories(): Promise<any> {
      return this.http.get<any>(Routes.BLOGCATEGORY).toPromise();
    }


  all_posts(): Promise<any> {
    return this.http.get<any>(Routes.BlogPost).toPromise();
  }

  allPostsWithCategorieId(categories_id:number): Promise<any> {
    return this.http.get<any>(`${Routes.BLOGCATEGORY}/${categories_id}`).toPromise();
  }
  //recuperation de toutes les categories
  all_blog_categories(): Promise<any> {
    return this.http.get<any>(Routes.BLOGCATEGORY).toPromise();
  }
  

  deleteBlogPost(blog_post_id:number){
    return this.http.delete<any>(`${Routes.BlogPost}/${blog_post_id}`).toPromise();
  }
  deleteBlogComment(blog_comment_id:number){
    return this.http.delete<any>(`${Routes.blogComment}/${blog_comment_id}`).toPromise();
  }
  findUser(id: number): Promise<any> {
    return this.http.get<any>(`${Routes.User}/${id}`).toPromise();
  }
  //recuperation de tous les users de la base de donnee
  allUser(){
    return this.http.get<any>(`${Routes.User}`).toPromise();
  }
  addComment(blogComment:BlogComment){
    return this.http.post<any>(`${Routes.blogComment}`,blogComment).toPromise();
  }
}
