import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Role } from '../_models/role.model';
import { BlogPost } from '../_models/blog-posts.model';
import { User } from '../_models/user.model';
import { BlogComment } from '../_models/blog_comment.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }


  all_posts(): Promise<any> {
    return this.http.get<any>(Routes.BlogPost).toPromise();
  }

  allPostsWithCategorieId(categories_id:number): Promise<any> {
    return this.http.get<any>(`${Routes.BlogCategorie}/${categories_id}`).toPromise();
  }
  //recuperation de toutes les categories
  all_blog_categories(): Promise<any> {
    return this.http.get<any>(Routes.BlogCategorie).toPromise();
  }
  

  find(id: number): Promise<any> {
  return this.http.get<any>(`${Routes.BlogPost}/${id}`).toPromise();
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
