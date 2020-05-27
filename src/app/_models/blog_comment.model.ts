import { Super } from './super.model';

export class BlogComment extends Super<BlogComment> {

    public comment: string;
    public user_id:number;
    public blog_post_id:number;

    
}