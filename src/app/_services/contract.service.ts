import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Contract } from '../_models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Contract> {
        return this.http.post<Contract>(Routes.CONTRACT, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Contract> {
        return this.http.post<Contract>(`${Routes.CONTRACT}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.CONTRACT).toPromise();
    }

    permissions(): Promise<any> {
        return this.http.get<any>(Routes.PERMISSION).toPromise();
    }

    find(id: number): Promise<Contract> {
        return this.http.get<Contract>(`${Routes.CONTRACT}/${id}`).toPromise();
    }

    delete(id: number): Promise<Contract[]> {
        return this.http.delete<Contract[]>(`${Routes.CONTRACT}/${id}`).toPromise();
    }

}