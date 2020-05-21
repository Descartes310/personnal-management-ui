import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { ProSituation } from '../_models/pro_situation.model';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
*/
@Injectable({
  providedIn: 'root',
})
export class ProSituationService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @author Arléon Zemtsop
   * @email arleonzemtsop@gmail.com
  */
  add(formData: FormData): Promise<ProSituation> {
    return this.http.post<ProSituation>(Routes.PRO_SITUATION, formData).toPromise();
  }

  /**
   * @author Arléon Zemtsop
   * @email arleonzemtsop@gmail.com
  */
  update(formData: FormData, id: number): Promise<ProSituation> {
    return this.http.post<ProSituation>(`${Routes.PRO_SITUATION}/${id}`, formData).toPromise();
  }

  /**
   * @author Arléon Zemtsop
   * @email arleonzemtsop@gmail.com
  */
  find(id: number): Promise<ProSituation> {
    return this.http.get<ProSituation>(`${Routes.PRO_SITUATION}/${id}`).toPromise();
  }

  all(): Promise<any> {
    return this.http.get<any>(Routes.PRO_SITUATION).toPromise();
  }
  delete(id: number): Promise<ProSituation[]> {
    return this.http.delete<ProSituation[]>(`${Routes.PRO_SITUATION}/${id}`).toPromise();
  }

}