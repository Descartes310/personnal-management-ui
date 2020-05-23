
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_models/contact.model';
<<<<<<< HEAD
import * as Routes from '../Routes'; 
=======
import * as Routes from '../Routes';
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d


@Injectable({
  providedIn: 'root'
})
export class ContactService {

<<<<<<< HEAD
  constructor(private http:HttpClient) { }
=======
  constructor(private http: HttpClient) { }
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d


  add(formData: FormData): Promise<Contact> {
    return this.http.post<Contact>(Routes.CONTACT, formData).toPromise();
<<<<<<< HEAD
}

  update(formData: FormData, id: number): Promise<Contact> {
    return this.http.put<Contact>(`${Routes.CONTACT}/${id}`, formData).toPromise();
}
  find(id: number): Promise<Contact> {
  return this.http.get<Contact>(`${Routes.CONTACT}/${id}`).toPromise();
}
=======
  }

  update(formData: FormData, id: number): Promise<Contact> {
    return this.http.put<Contact>(`${Routes.CONTACT}/${id}`, formData).toPromise();
  }
  find(id: number): Promise<Contact> {
    return this.http.get<Contact>(`${Routes.CONTACT}/${id}`).toPromise();
  }

  all(): Promise<any> {
    return this.http.get<any>(Routes.CONTACT).toPromise();
  }
  delete(id: number) {
    return this.http.delete<Contact>(`${Routes.CONTACT}/${id}`).toPromise();
  }

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}
