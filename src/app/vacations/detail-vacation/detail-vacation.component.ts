import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/_services/vacation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Vacation } from 'src/app/_models/vacation.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as Route from '../../Routes'


@Component({
  selector: 'app-detail-vacation',
  templateUrl: './detail-vacation.component.html',
  styleUrls: ['./detail-vacation.component.scss']
})
export class DetailVacationComponent implements OnInit {

  vacations: any[] = [];
  vacations_tmp: any[] = [];

  vacation: Vacation = new Vacation();

  server = Route.ROOT;

  constructor(
    private vacationService: VacationService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const vacation_id = +this.route.snapshot.paramMap.get("id");
    this.vacationService.find(vacation_id).then(
      data => {
        this.vacation = new Vacation(data);
        console.log(this.vacation)
     /*     this.vacations = this.vacation.vacationss;
        this.vacations_tmp = this.vacation.vacationss;  */
      }
    ).catch(
      error => {
        this.translate.get('Vacation.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/vacations/all'])
      }
    )

  }

  search(event) {
    this.vacations = this.vacations_tmp;
    this.vacations = this.vacations_tmp.filter( vacation => vacation.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
