import { Super } from './super.model';

export class Message extends Super<Message> {

    public content: string;
    public file: string;
    public sender_id: number;
    public receiver_id: number;
    public viewed_at: Date;
    public discussion_id: number;
    public sender_delete: boolean;
    public receiver_delete: boolean;
    
}