import { Injectable, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'
import { Message } from '../_models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {


    @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor(
      private http: HttpClient
    ) { }

    newDiscussion(value: any[]) {
        this.fire.emit(value);
    }

    getEmittedValue() {
        return this.fire;
    }

    getUsers(): Promise<any> {
        return this.http.get<any>(Routes.USERS).toPromise();
    }

    getDiscussion(id: number): Promise<any> {
        return this.http.get<any>(`${Routes.CHAT}/discussion/${id}`).toPromise();
    }

    getNewMessage(id: number): Promise<any> {
        return this.http.get<any>(`${Routes.CHAT}/discussion/${id}/newmessages`).toPromise();
    }

    deleteDiscussion(id: number): Promise<any> {
        return this.http.delete<any>(`${Routes.CHAT}/discussion/${id}`).toPromise();
    }

    deleteMessage(id: number): Promise<any> {
        return this.http.delete<any>(`${Routes.CHAT}/${id}`).toPromise();
    }

    getDiscussions(id: number): Promise<any> {
        return this.http.get<any>(`${Routes.CHAT}/discussions/${id}`).toPromise();
    }

    postMessage(data: FormData): Promise<any> {
        return this.http.post<any>(Routes.CHAT, data).toPromise();
    }

}