import { Super } from './super.model';
import { User } from './user.model';
import { BlogComment } from './blog_comment.model';

export class BlogPost extends Super<BlogPost> {

    public name: string;
    public categorie_id: number;
    public user_id: number;
    public title: string;
    public slug: string;
    public content: string;
    public image: File;
    public views: number
    public user_post: User;
    public blog_comments: BlogComment[];


}