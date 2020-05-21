import { Component, OnInit } from '@angular/core';
import { DisciplinaryTeamService} from 'src/app/_services/disciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { DisciplinaryTeam } from 'src/app/_models/disciplinary-team.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-disciplinary-team',
  templateUrl: './details-disciplinary-team.component.html',
  styleUrls: ['./details-disciplinary-team.component.scss']
})
export class DetailsDisciplinaryTeamComponent implements OnInit {

  //disciplinaryteam: Disciplinary
  constructor() { }

  ngOnInit() {
  }

}
