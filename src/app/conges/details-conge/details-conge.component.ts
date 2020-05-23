/* /* import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/_services/role.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Conge } from 'src/app/_models/vacation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CongeService } from 'src/app/_services/vacation.service';

@Component({
  selector: 'app-details-conge',
  templateUrl: './details-conge.component.html',
  styleUrls: ['./details-conge.component.scss']
})
export class DetailsCongeComponent implements OnInit {

  permissions: any[] = [];
  permissions_tmp: any[] = [];

  conge: Conge = new Conge();


  constructor(
    private congeService: CongeService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    const conge_id = +this.route.snapshot.paramMap.get("id");
    this.congeService.find(conge_id).then(
      data => {
        this.conge = new Conge(data);
        /* this.permissions = this.conge.permissions;
        this.permissions_tmp = this.conge.permissions; 
      }
    ).catch(
      error => {
        this.translate.get('Conge.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/conges/all'])
      }
    )

  }

  search(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
  */