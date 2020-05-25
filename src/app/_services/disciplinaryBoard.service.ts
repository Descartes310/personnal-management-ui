import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { DisciplinaryBoard } from '../_models/disciplinaryBoard.model';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaryBoardService {

  constructor(
      private http: HttpClient,
    ) { }

    all(): Promise<any> {
        return this.http.get<any>(Routes.DISCIPLINARY_BOARD).toPromise();
    }

    find(id: number): Promise<DisciplinaryBoard> {
        return this.http.get<DisciplinaryBoard>(`${Routes.DISCIPLINARY_BOARD}/${id}`).toPromise();
    }

    delete(id: number): Promise<DisciplinaryBoardService[]> {
        return this.http.delete<DisciplinaryBoardService[]>(`${Routes.DISCIPLINARY_BOARD}/${id}`).toPromise();
    }
}
