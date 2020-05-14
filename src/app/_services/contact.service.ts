import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_models/contact.model';
import * as Routes from '../Routes'; 


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }


  add(formData: FormData): Promise<Contact> {
    return this.http.post<Contact>(Routes.ROLE, formData).toPromise();
}

  update(formData: FormData, id: number): Promise<Contact> {
    return this.http.post<Contact>(`${Routes.ROLE}/${id}`, formData).toPromise();
}
}
