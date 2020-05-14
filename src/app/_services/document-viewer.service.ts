import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 

@Injectable({
  providedIn: 'root',
})
export class DocumentViewerService {

  constructor(
    private http: HttpClient,
  ) { }

  public uploadDocument(document: File): Promise<any> {

    const datas = new FormData();
    datas.append('document', document);

    const headers = {
        'Content/Type': 'application/pdf'
    };

    return this.http.post<any>(Routes.DOCUMENT, datas, { headers: headers }).toPromise();

  }

  public deleteDocument(document_id: number): Promise<any> {

    const uri = Routes.DOCUMENT + '/' + document_id;
    return this.http.delete<any>(uri).toPromise();
    
  }

  public getAllDocument(): Promise<any> {

    return this.http.get<any>(Routes.DOCUMENT).toPromise();
    
  }

}