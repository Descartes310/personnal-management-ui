import { Super } from './super.model';

export class BlogPost extends Super<BlogPost> {
    public user_id: number;
    public blog_category_id:number;
    public title: string;
    public content: string;
    public image: File;
}
