import { Component, OnInit } from '@angular/core';
import { DisciplinaryBoardService } from 'src/app/_services/disciplinaryBoard.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { DisciplinaryBoard } from 'src/app/_models/disciplinaryBoard.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-disciplinary',
  templateUrl: './details-disciplinary.component.html',
  styleUrls: ['./details-disciplinary.component.scss']
})
export class DetailsDisciplinaryComponent implements OnInit {

  disciplinaryBoard: DisciplinaryBoard = new DisciplinaryBoard();

  constructor(
    private disciplinaryBoardService: DisciplinaryBoardService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const disciplinaryBoardId = +this.route.snapshot.paramMap.get('id');
    this.disciplinaryBoardService.find(disciplinaryBoardId).then(
      data => {
        this.disciplinaryBoard = new DisciplinaryBoard(data);
      }
    ).catch(
      error => {
        this.translate.get('DisciplinaryBoard.' + error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/disciplinaryBoards/all']);
      }
    );
  }
}
