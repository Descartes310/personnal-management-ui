import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { DisciplinaryBoards } from '../_models/disciplinary_boards.model';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaryBoardsService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<DisciplinaryBoards> {
        return this.http.post<DisciplinaryBoards>(Routes.DISCIPLINARY_BOARD, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<DisciplinaryBoards> {
        return this.http.post<DisciplinaryBoards>(`${Routes.DISCIPLINARY_BOARD}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.DISCIPLINARY_BOARD).toPromise();
    }

    find(id: number): Promise<DisciplinaryBoards> {
        return this.http.get<DisciplinaryBoards>(`${Routes.DISCIPLINARY_BOARD}/${id}`).toPromise();
    }

    delete(id: number): Promise<DisciplinaryBoards[]> {
        return this.http.delete<DisciplinaryBoards[]>(`${Routes.DISCIPLINARY_BOARD}/${id}`).toPromise();
    }

}