import { Component, OnInit } from '@angular/core';
import { SanctionService } from 'src/app/_services/sanction.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Sanction } from 'src/app/_models/sanction.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details-sanction',
  templateUrl: './details-sanction.component.html',
  styleUrls: ['./details-sanction.component.scss']
})
export class DetailsSanctionComponent implements OnInit {


  sanction:Sanction = new Sanction();

  constructor(
    private sanctionService: SanctionService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const sanction_id = +this.route.snapshot.paramMap.get("id");
    this.sanctionService.find(sanction_id).then(
      data => {
        this.sanction = new Sanction(data);
      }
    ).catch(
      error => {
        this.translate.get('Sanction.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/sanction/all'])
      }
    )

  }

  
}

