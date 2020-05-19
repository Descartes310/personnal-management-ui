import { Component, OnInit } from '@angular/core';
import { ProSituation } from 'src/app/_models/pro_situation.model';
import { ProSituationService } from 'src/app/_services/pro_situation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-pro-situation',
  templateUrl: './details-pro-situation.component.html',
  styleUrls: ['./details-pro-situation.component.scss']
})
export class DetailsProSituationComponent implements OnInit {
  
  pro_situation: ProSituation = new ProSituation();
  constructor(
    private proSituationService: ProSituationService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const proSituation_id = +this.route.snapshot.paramMap.get("id");
    this.proSituationService.find(proSituation_id).then(
      data => {
        this.pro_situation = new ProSituation(data);

      }
    ).catch(
      error => {
        this.translate.get('Role.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/pro_situations/all'])
      }
    )

  }

}
