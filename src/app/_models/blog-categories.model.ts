import { Super } from './super.model';
import { BlogPost } from './blog-posts.model';
import { User } from './user.model';

export class BlogCategorie extends Super<BlogCategorie> {

    public description: string;
    public title:string;
    public blog_posts:BlogPost[];
    public user:User;


    
}