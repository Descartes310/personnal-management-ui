import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/_services/division.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Division } from 'src/app/_models/division.model';

@Component({
  selector: 'app-details-division',
  templateUrl: './details-division.component.html',
  styleUrls: ['./details-division.component.scss']
})
export class DetailsDivisionComponent implements OnInit {
  division: Division = new Division();
  constructor(
    private divisionService: DivisionService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,) { }

    async ngOnInit() {
      const division_id = +this.route.snapshot.paramMap.get("id");
      this.divisionService.find(division_id).then(
        data => {
          this.division = new Division(data);
          if (this.division.parent_id) {
            this.divisionService.find(this.division.parent_id).then(parent => {
              this.division.division = new Division(parent);
            }).catch(e => {
              this.division.division = null;
            });
          } else {
            this.division.division = null;
          }
        }
      ).catch(
        error => {
          this.translate.get('Role.'+error.error.code)
          .subscribe(val => this.notifService.danger(val));
          this.router.navigate(['/divisions/all'])
        }
      )

    }

    public checkIfParentExist() : string {

      return (this.division.division ? this.division.division.name : '' );
    }


}
